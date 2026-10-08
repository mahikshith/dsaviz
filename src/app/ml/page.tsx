import type { Metadata } from 'next';
import { MlExplorer } from '@/features/ml/MlExplorer';

export const metadata: Metadata = {
  title: 'Machine learning',
  description: 'Interactive, step-by-step visualizations of machine learning algorithms, from gradient descent to gradient boosting.',
};

export default function MlPage() {
  return <MlExplorer />;
}
