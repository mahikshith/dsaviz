/** Playback semantics from the reducer alone: stepping, seeking, gating and reloading. */
import { describe, expect, it } from 'vitest';
import { ADAPTERS } from '@/engine/registry/all';
import { prepareRun } from '@/features/player/prepare';
import { initialPlayerState, playerReducer, type PlayerAction, type PlayerState } from '@/features/player/reducer';

const adapter = ADAPTERS['sorted-target-pair-v1'];
const input = { prices: [2, 4, 7, 11, 15], target: 18 };
const checkpoints = [{ id: 'cp', approachId: 'a', exampleId: 'e', frameId: '4-compare-sum' }];
const run = prepareRun(adapter, input, { approachId: 'a', exampleId: 'e', checkpoints });
const plain = prepareRun(adapter, { prices: [1, 3, 5, 9], target: 7 }, { approachId: 'a', exampleId: 'other' });

const apply = (s: PlayerState, ...actions: PlayerAction[]) => actions.reduce(playerReducer, s);
const fresh = () => initialPlayerState(run);

describe('player reducer', () => {
  it('attaches the checkpoint to the right frame only', () => {
    expect(run.frames.filter((f) => f.checkpointId).map((f) => f.id)).toEqual(['4-compare-sum']);
  });

  it('next then previous restores the same frame', () => {
    const s0 = apply(fresh(), { type: 'next' }, { type: 'next' });
    const s1 = apply(s0, { type: 'next' }, { type: 'prev' });
    expect(s1.cursor).toBe(s0.cursor);
    expect(s1.run.frames[s1.cursor]).toBe(s0.run.frames[s0.cursor]);
    expect(s1.run.views[s1.cursor]).toEqual(s0.run.views[s0.cursor]);
  });

  it('previous at the first frame stays put', () => {
    expect(apply(fresh(), { type: 'prev' }).cursor).toBe(0);
  });

  it('seek clamps, snaps and pauses', () => {
    const playing = apply(fresh(), { type: 'play' });
    expect(playing.playing).toBe(true);
    const s = apply(playing, { type: 'seek', index: 99 });
    expect(s.cursor).toBe(run.frames.length - 1);
    expect(s.playing).toBe(false);
    expect(apply(s, { type: 'seek', index: -5 }).cursor).toBe(0);
    expect(apply(s, { type: 'seek', index: 2.7 }).cursor).toBe(2);
  });

  it('records the previous cursor so a long jump can skip animation', () => {
    const s = apply(fresh(), { type: 'seek', index: 6 });
    expect(Math.abs(s.cursor - s.previous)).toBeGreaterThan(1);
    const t = apply(s, { type: 'next' });
    expect(t.cursor - t.previous).toBe(1);
  });

  it('a checkpoint stops next and autoplay until it is answered or skipped', () => {
    let s = apply(fresh(), { type: 'seek', index: 4 });
    s = apply(s, { type: 'next' });
    expect(s.cursor).toBe(4);
    expect(s.gate).toBe('cp');
    s = apply(s, { type: 'play' });
    expect(s.playing).toBe(false);
    expect(s.gate).toBe('cp');
    s = apply(s, { type: 'clear-checkpoint', id: 'cp' }, { type: 'next' });
    expect(s.cursor).toBe(5);
    expect(s.gate).toBeNull();
  });

  it('autoplay ticks advance, stop at a checkpoint, and stop at the end', () => {
    let s = apply(fresh(), { type: 'play' });
    for (let i = 0; i < 10; i++) s = apply(s, { type: 'tick' });
    expect(s.cursor).toBe(4);
    expect(s.playing).toBe(false);
    expect(s.gate).toBe('cp');
    s = apply(s, { type: 'clear-checkpoint', id: 'cp' }, { type: 'play' });
    for (let i = 0; i < 20; i++) s = apply(s, { type: 'tick' });
    expect(s.cursor).toBe(run.frames.length - 1);
    expect(s.playing).toBe(false);
    expect(apply(s, { type: 'play' }).playing).toBe(false);
  });

  it('a tick while paused does nothing (no stray scheduler can advance)', () => {
    const s = fresh();
    expect(apply(s, { type: 'tick' })).toBe(s);
  });

  it('autoplay steps are marked as automatic so they are not announced one by one', () => {
    const s = apply(fresh(), { type: 'play' }, { type: 'tick' });
    expect(s.source).toBe('auto');
    expect(apply(s, { type: 'next' }).source).toBe('manual');
  });

  it('changing speed, view mode or code language keeps the cursor', () => {
    const s = apply(fresh(), { type: 'seek', index: 3 }, { type: 'speed', speed: 'fast' }, { type: 'language', language: 'typescript' }, { type: 'mode', mode: 'formal' });
    expect(s.cursor).toBe(3);
    expect([s.speed, s.language, s.mode]).toEqual(['fast', 'typescript', 'formal']);
  });

  it('loading a new run resets the cursor, stops playback and gives a new run id', () => {
    const s = apply(fresh(), { type: 'seek', index: 3 }, { type: 'play' });
    const t = apply(s, { type: 'load', run: plain });
    expect(t.cursor).toBe(0);
    expect(t.playing).toBe(false);
    expect(t.runId).toBe(s.runId + 1);
    expect(t.run).toBe(plain);
  });

  it('rapid loads always end on the last run with a clean cursor', () => {
    let s = fresh();
    for (let i = 0; i < 20; i++) s = apply(s, { type: 'load', run: i % 2 ? run : plain }, { type: 'next' });
    expect(s.run).toBe(run);
    expect(s.cursor).toBe(1);
    expect(s.runId).toBe(21);
  });
});
