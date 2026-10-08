import type { InputField } from '@/engine/contracts/trace';
import type { NarrationSet } from '@/engine/narrate';
import type { CodeListing } from '@/lib/content/code';
import type { Checkpoint, Language } from '@/lib/content/schema';
import type { PreparedRun } from './prepare';

/** Everything the interactive lesson needs, as plain serialisable data from the server. */
export type LessonData = {
  problemId: string;
  contentVersion: number;
  goal: string;
  approaches: {
    id: string;
    name: string;
    summary: string;
    adapterId: string;
    timeComplexity: string;
    auxiliarySpaceComplexity: string;
    languages: Language[];
  }[];
  examples: { id: string; label: string; input: unknown; display?: unknown; explanation: string }[];
  narration: Record<string, NarrationSet>;
  checkpoints: Checkpoint[];
  code: Record<string, Partial<Record<Language, CodeListing>>>;
  inputFields: Record<string, readonly InputField[]>;
  initialRun: PreparedRun;
};
