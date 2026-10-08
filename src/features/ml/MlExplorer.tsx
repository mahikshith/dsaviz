'use client';

import { useEffect, useState } from 'react';
import { DocsLayout, Panel, SideNav } from '@/components/docs/DocsLayout';
import type { MlAlgorithm, MlGroup } from './types';
import { supervisedAlgorithms } from './supervised';
import { moreAlgorithms } from './unsupervised';
import styles from './ml.module.css';

const GROUPS: MlGroup[] = ['Foundations', 'Supervised learning', 'Ensembles', 'Unsupervised learning', 'Neural networks'];
const ALL: MlAlgorithm[] = [...supervisedAlgorithms, ...moreAlgorithms];

/** One algorithm at a time, chosen in the side panel and kept in ?algo= so it can be shared. */
export function MlExplorer() {
  const [id, setId] = useState(ALL[0]?.id ?? '');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('algo');
    if (q && ALL.some((a) => a.id === q)) setId(q);
  }, []);
  const pick = (next: string) => {
    setId(next);
    const url = new URL(window.location.href);
    url.searchParams.set('algo', next);
    window.history.replaceState(window.history.state, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const algo = ALL.find((a) => a.id === id);
  const groups = GROUPS.map((g) => ({
    title: g,
    items: ALL.filter((a) => a.group === g).map((a) => ({ id: a.id, label: a.name })),
  })).filter((g) => g.items.length > 0);

  return (
    <DocsLayout
      title="Machine learning"
      lede="Watch each algorithm learn, one step at a time. Change the settings and see what breaks."
      sideLabel="Algorithms"
      side={<SideNav groups={groups} current={id} onSelect={pick} />}
    >
      {algo ? (
        <Panel>
          <div className={styles.head}>
            <span className={styles.group}>{algo.group}</span>
            <h2>{algo.name}</h2>
            <p className={styles.summary}>{algo.summary}</p>
          </div>
          <div className={styles.body}>
            <div className={styles.visual}>
              {/* Keyed so switching algorithms starts each one fresh. */}
              <algo.Visual key={algo.id} />
            </div>
            <div className={styles.explain}>
              <div>
                <h3>How it works</h3>
                <ol>
                  {algo.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
              {algo.formula ? <pre className={styles.formula}>{algo.formula}</pre> : null}
              {algo.notes?.length ? (
                <div>
                  <h3>Good to know</h3>
                  <ul>
                    {algo.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Panel>
      ) : (
        <Panel title="Visualizations are on their way">
          <p className={styles.summary}>No algorithms are published yet.</p>
        </Panel>
      )}
    </DocsLayout>
  );
}
