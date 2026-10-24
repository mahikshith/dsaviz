# kirankrish109/interview-question-data-science--master (reference only)

Pass 1, 2026-10-25. Method: REA (Edge launch) loaded the repo root page; contents read from a shallow clone at `C:\Users\mahik\Desktop\inbox-repos\interview-question-data-science--master` (data only). The 30 PDFs were converted to plain text with pdftotext for question headings only. Nothing was run. Star count not captured.

## Licence
**No LICENSE file in the repo.** The PDFs are headed "INEURON.AI" and "30 days of Interview Preparation", so they look like a third-party course handout re-uploaded; copyright is the original authors'. **Reference only, topics only.** We copy no question wording, answer text, diagram or code.

## Structure
- Flat repo, 30 PDFs (about 57 MB), no folders, no README, no code. File names are "Day N" with inconsistent spelling and capitalisation; days 1-28 and 30 are labelled, and one undated "Data Science Interview Preparation.pdf" is likely day 29.
- Each PDF has roughly 9-45 numbered questions (about 360 in total), each followed by a prose answer with some diagrams. Text is extractable (not scanned images).
- Mix of fundamentals (days 1-12) and a long tail of "what is model or paper X" items (days 21-29).

## Topic list by day (topics only)
| Days | Topic |
|---|---|
| 1 | AI vs DS vs ML vs DL, supervised / unsupervised / reinforcement, ML architecture, linear regression, OLS, L1/L2 regularisation, R-squared, MSE, support vector regression |
| 2 | Logistic vs linear regression, decision trees (entropy, information gain, Gini, pruning), random forest, bias-variance, ensembles, SVM, Naive Bayes, confusion matrix and rates, F1 / precision / recall, grid / random / Bayesian search, whitening |
| 3 | Heteroscedasticity, multicollinearity, market-basket and association analysis, KNN, sklearn pipelines, PCA, t-SNE, VIF and weight of evidence, outliers, encoding, Type 1/2 error, distributions, MAE, long vs wide data, normalisation vs standardisation |
| 4 | Up/down-sampling, statistical tests, central limit theorem, correlation, perceptron, activation functions, gradient descent variants, backprop, weight init, optimisers, autoencoders, CNN, pooling / padding / filters, learning rate |
| 5 | Epochs, batch size, dropout, hyperparameter tuning in DL, activation and loss, vanishing gradient, transfer learning, VGG16, ResNet, ImageNet, DarkNet, YOLO |
| 6 | NLP basics (tokenisation, stemming, lemmatisation, bag of words, TF-IDF, Word2vec, Doc2vec); time-series basics, stationarity |
| 7 | Making data stationary, ACF / PACF, trend, ADF test, AIC / BIC, time-series components, forecasting techniques, moving average, exponential smoothing |
| 8 | TensorFlow, tensors, TensorBoard, Keras, pooling layer, CNN vs RNN |
| 9 | ML definitions: labelled sets, supervised and unsupervised tasks, online and out-of-core learning, parameters vs hyperparameters, cross-validation |
| 10 | Recommender systems, SAS / R / Python, ML process stages, interpolation, p-value, missing values, test vs validation set, curse of dimensionality, augmentation, stratified CV |
| 11 | Tensors, RNN, ResNet, transfer learning, hyperparameters, black-box models, gates, Sobel filter, Boltzmann machine, weight initialisation |
| 12 | Confusion matrix and metrics, bias-variance, data wrangling, normalisation, feature selection vs extraction, polarity / subjectivity, ARIMA |
| 13 | AR, MA, ARMA, ARIMA, SARIMA, VAR family, simple exponential smoothing |
| 14 | AlexNet, VGGNet, ResNet, Haar cascade, transfer learning, R-CNN family, GoogLeNet / Inception, LeNet-5 |
| 15 | Autoencoder, text similarity, dropout, forward propagation, text mining, information extraction, generation, summarisation, topic modelling, HMM |
| 16 | Statistics learning, ANOVA / ANCOVA / MANOVA / MANCOVA, KNN, t-test, Z-test, chi-square, correlation vs covariance |
| 17 | ERM, PAC learning, ELMo, pragmatic analysis, syntactic parsing, ULMFiT, BERT, XLNet, transformer, summarisation |
| 18 | Levenshtein distance, Soundex, constituency parse, LDA, LSA, PLSA, EM algorithm, text classification, word-sense disambiguation |
| 19 | LSI, named-entity recognition, perplexity, language models, word embeddings, fastText, GloVe, Gensim, encoder-decoder, Context2Vec |
| 20-29 | Long tail: GANs, U-Net, Pix2Pix, meta-learning, active learning, object-detection families, CNN architecture zoo (SqueezeNet, ZFNet, SENet, FPN), dialogue and translation models, many research-paper explainers |
| 30 | Experience-style interview prompts: current project, data size and types, team, cluster and big-data stack, logging, validation and enrichment, deployment, retraining cadence, monitoring, roles, challenges, expectations |

## Question categories (our grouping of the roughly 360 items, shares approximate)
| Category | Share | Notes |
|---|---|---|
| Classical ML (regression, trees, SVM, KNN, ensembles, metrics) | ~20% | evergreen, high interview value |
| Statistics and hypothesis tests | ~8% | CLT, p-value, t / Z / chi-square, ANOVA family, error types |
| Data prep and feature work | ~8% | missing values, outliers, scaling, encoding, PCA |
| Time series | ~8% | stationarity, ACF / PACF, ARIMA family, smoothing |
| Deep learning basics | ~15% | activations, backprop, optimisers, CNN / RNN, regularisation |
| CNN architectures and vision | ~12% | named models, detection, transfer learning |
| NLP | ~15% | tokenising to transformers, embeddings, topic models |
| Paper and model name-drops | ~10% | low reuse value; skip |
| Behavioural and project experience | ~4% | day 30 only |

## Beginner-friendly items (topics)
Supervised vs unsupervised, train / validation / test split, cross-validation, bias-variance, over- and underfitting, linear and logistic regression, decision trees, confusion matrix with precision and recall, missing values and outliers, normalisation vs standardisation, central limit theorem, p-value, tokenising and TF-IDF, gradient descent, learning rate, epochs vs batch size.

## What this suggests for a future DS/ML interview section
- Section order that matches how the repo builds: basics and terms, then linear / logistic regression and metrics, trees and ensembles, data prep and statistics, time series, neural nets, vision, NLP.
- Our own visual angle (no copying): gradient descent on a loss surface, a decision split choosing by impurity, a confusion matrix whose threshold slider moves precision and recall, a moving-average smoother on a noisy series, TF-IDF weights on tiny sentences, train vs validation curves showing overfitting.
- Gaps in this source for us to fill: no code practice, no worked numbers, no SQL or pandas round, no ML system design, nothing on gradient boosting, clustering depth, A/B testing, or modern LLM topics.
- Skip: the day 20-29 paper explainers, the day 30 behavioural text, named-model trivia with low interview value.

## Take and skip
Take: topic list and order only. Skip: all question wording, answers, figures, branding.
