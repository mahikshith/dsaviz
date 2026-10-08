'use client';

import { PlayerProvider } from '@/features/player/PlayerProvider';
import { Stage } from '@/features/player/Stage';
import type { LessonData } from '@/features/player/types';

/** A compact, fully working walkthrough for previews. It never autoplays. */
export function LessonPreview({ lesson }: { lesson: LessonData }) {
  return (
    <PlayerProvider lesson={lesson}>
      <Stage compact headingLevel="h2" />
    </PlayerProvider>
  );
}
