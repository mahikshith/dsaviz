import type { Metadata } from 'next';
import { GitLab } from '@/features/git/GitLab';

export const metadata: Metadata = {
  title: 'Git',
  description:
    'A live Git simulator for beginners: watch files move from the working directory to the staging area, commits, branches and a remote as you type real commands.',
};

export default function GitPage() {
  return <GitLab />;
}
