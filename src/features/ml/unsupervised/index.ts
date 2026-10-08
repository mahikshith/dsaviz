import type { MlAlgorithm } from '../types';
import { gradientBoosting } from './boosting';
import { dbscanAlgorithm } from './dbscan';
import { kMeans } from './kmeans';
import { pcaAlgorithm } from './pca';
import { perceptronAlgorithm } from './perceptron';
import { randomForestAlgorithm } from './randomForest';

/** Ensembles, unsupervised learning and neural networks, in teaching order. Filled in by the visualizations in this folder. */
export const moreAlgorithms: MlAlgorithm[] = [
  randomForestAlgorithm,
  gradientBoosting,
  kMeans,
  dbscanAlgorithm,
  pcaAlgorithm,
  perceptronAlgorithm,
];
