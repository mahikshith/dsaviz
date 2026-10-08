import type { MlAlgorithm } from '../types';
import { decisionTree } from './DecisionTreeVisual';
import { gradientDescent } from './GradientDescentVisual';
import { knn } from './KnnVisual';
import { linearRegression } from './LinearRegressionVisual';
import { logisticRegression } from './LogisticRegressionVisual';
import { svm } from './SvmVisual';

/** Foundations and supervised learning, in teaching order. */
export const supervisedAlgorithms: MlAlgorithm[] = [gradientDescent, linearRegression, logisticRegression, knn, decisionTree, svm];
