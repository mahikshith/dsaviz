// About-this-lesson content for the ML foundations track. Our own writing; facts checked against the sources listed per lesson.
const AI_ABOUT_ML = {
  gradient: {
    what: 'Linear regression draws the best straight line through a cloud of dots. Gradient descent finds that line by trial. It makes a guess, measures the error, and nudges the line to lower the error.',
    analogy: 'Imagine walking down a foggy hill. You cannot see the bottom. You feel which way slopes down and take a small step.',
    uses: ['Predicting house prices from size', 'Training almost every neural network, including chatbots', 'Forecasting sales from past months of data'],
    before: ['Averages', 'Straight lines (y = w x + b)'],
    words: [
      ['weight', 'A number the model can change. Here it is the slope of the line.'],
      ['bias', 'The second number that moves the whole line up or down.'],
      ['loss', 'One number that says how wrong the model is. Lower is better.'],
      ['gradient', 'The direction that makes the loss grow fastest. We step the opposite way.'],
      ['learning rate', 'How big each step is. Too small is slow. Too big can overshoot.']
    ],
    math: {
      lines: ['\\hat{y} = w x + b', 'L = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2', 'w \\leftarrow w - \\eta \\, \\frac{\\partial L}{\\partial w}'],
      symbols: [
        ['\\hat{y}', 'the guess the line makes for one point'],
        ['x', 'the input, such as the size of a flat'],
        ['y', 'the true answer, such as the real price'],
        ['w', 'the weight, which is the slope of the line'],
        ['b', 'the bias, which moves the line up or down'],
        ['L', 'the loss: the average of the squared gaps'],
        ['n', 'how many points there are'],
        ['\\eta', 'the learning rate, the size of each step'],
        ['\\frac{\\partial L}{\\partial w}', 'how fast the loss changes when w changes a little']
      ],
      example: [
        'Take one point to keep it small: x = 2 and y = 5. Start with w = 1 and b = 0.',
        'The guess is 1 × 2 + 0 = 2. The error is 2 − 5 = −3, so the loss is 9.',
        'The slope of the loss for w is 2 × error × x. That is 2 × (−3) × 2 = −12.',
        'Pick a learning rate of 0.05. The new w is 1 − 0.05 × (−12) = 1.6.',
        'The new guess is 1.6 × 2 = 3.2. The error is −1.8, so the loss falls from 9 to 3.24.'
      ]
    },
    steps: [
      'Start with any line, for example a flat one.',
      'Measure the gap between the line and every dot. Square each gap and average them. That is the loss.',
      'Find the gradient: how the loss changes when you nudge the slope or the bias.',
      'Move each number a small step against its gradient. The step size is the learning rate.',
      'Repeat until the loss stops falling. The line now fits the dots.'
    ],
    use: ['You have a loss you can measure and a slope you can find.', 'The model has many numbers to tune, so no neat formula exists.'],
    avoid: ['A tiny line fit, where a direct formula gives the exact answer at once.', 'The loss has no slope, such as counting mistakes directly.'],
    mistakes: [
      'Setting the learning rate too high. The loss grows instead of shrinking. Lower the rate.',
      'Stopping after a few steps because the line looks fine. Watch the loss curve until it flattens.',
      'Mixing inputs of very different sizes. Scale them first so the steps behave.'
    ],
    cheat: ['loss = how wrong', 'gradient = uphill direction', 'step = go the other way', 'learning rate = step size', 'repeat until loss is flat'],
    next: ['logistic', 'backprop', 'regular'],
    sources: ['Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2nd ed., 2009, ch. 3 (least squares)', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 4.3 and 5.9 (gradient-based optimisation)', 'scikit-learn documentation, SGDRegressor and LinearRegression user guide']
  },
  knn: {
    what: 'k-nearest neighbours labels a new item by looking at the k closest items you already know. The closest ones vote, and the most common label wins.',
    analogy: 'You move to a new street and want to know if it is quiet. You ask the three nearest neighbours and go with what most of them say.',
    uses: ['Suggesting films that people with similar ratings enjoyed', 'Reading handwritten digits by comparing to labelled examples', 'Spotting unusual bank activity that looks unlike its neighbours'],
    before: ['Distance between two points'],
    words: [
      ['neighbour', 'One of the known examples that sits close to the new item.'],
      ['k', 'How many neighbours get a vote.'],
      ['distance', 'How far apart two items are. Here it is a straight line between dots.'],
      ['label', 'The answer attached to an example, such as like or dislike.'],
      ['majority vote', 'The label that more than half of the neighbours share.']
    ],
    math: {
      lines: ['d(a, b) = \\sqrt{(a_1 - b_1)^2 + (a_2 - b_2)^2}'],
      symbols: [
        ['d(a, b)', 'the distance between item a and item b'],
        ['a_1, a_2', 'the two measurements of item a, such as action and romance'],
        ['b_1, b_2', 'the two measurements of item b'],
        ['\\sqrt{\\;}', 'square root: the number that gives the inside when multiplied by itself']
      ],
      example: [
        'A new film sits at (3, 4). Four rated films sit at A (3, 5), B (4, 5), C (1, 4) and D (6, 8).',
        'Distances to the new film are: A 1, B 1.41 (√2), C 2, D 5.',
        'Say A is disliked, and B, C and D are liked, with D far away. With k = 1 the nearest, A, decides: dislike.',
        'With k = 3 the neighbours are A, B and C. That is one dislike and two likes, so the vote says like.',
        'The answer changed when k changed. That is why you choose k with care.'
      ]
    },
    steps: [
      'Place every known item as a dot, using its measurements.',
      'Measure the distance from the new item to every known item.',
      'Sort by distance and keep the k closest.',
      'Count the labels among those k. The most common label wins.'
    ],
    use: ['You have a small data set and want a simple first try.', 'Items with similar measurements really do share labels.'],
    avoid: ['Huge data sets, because every question scans all the examples.', 'Many columns, where all distances start to look alike.'],
    mistakes: [
      'Using k = 1. One odd example then decides everything. Try a larger, odd k.',
      'Mixing measurements of different sizes, such as metres and grams. Scale them first.',
      'Choosing an even k, which can tie. Use an odd k for two labels.'
    ],
    cheat: ['closest k vote', 'small k = jumpy', 'big k = blurry', 'scale your columns', 'odd k avoids ties'],
    next: ['kmeans', 'crossval', 'embeddings'],
    sources: ['Cover and Hart, Nearest neighbor pattern classification, IEEE Trans. Information Theory, 1967', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 13', 'scikit-learn documentation, Nearest Neighbors user guide']
  },
  tree: {
    what: 'A decision tree is a chain of yes-or-no questions. Each question splits the examples into two groups. The best question makes each group as pure as possible.',
    analogy: 'It is like the game of twenty questions. Each answer rules out many options until one answer is left.',
    uses: ['Deciding whether a loan is likely to be repaid', 'Helping doctors sort patients by risk from simple test results', 'Choosing whether a day is good for playing outside'],
    before: ['Counting and fractions'],
    words: [
      ['split', 'One yes-or-no question on one column, such as is it hot.'],
      ['impurity', 'How mixed a group is. A group of all one label has zero impurity.'],
      ['Gini impurity', 'One way to score mixing: 1 minus the sum of squared label shares.'],
      ['leaf', 'The end of a branch. It gives the final answer.'],
      ['depth', 'How many questions in a row you may ask.']
    ],
    math: {
      lines: ['G = 1 - \\sum_{c} p_c^{\\,2}', 'G_{\\text{split}} = \\frac{n_L}{n} G_L + \\frac{n_R}{n} G_R'],
      symbols: [
        ['G', 'the Gini impurity of one group; 0 means pure'],
        ['p_c', 'the share of the group that has label c'],
        ['\\sum_c', 'add up the value for every label c'],
        ['n_L, n_R', 'how many examples go left and right'],
        ['n', 'the total number of examples'],
        ['G_L, G_R', 'the impurity of the left group and the right group']
      ],
      example: [
        'Ten days: 6 played, 4 did not. The shares are 0.6 and 0.4.',
        'Gini of all ten: 1 − 0.36 − 0.16 = 0.48.',
        'Try a cut. Left has 5 days (4 played, 1 not): 1 − 0.64 − 0.04 = 0.32.',
        'Right has 5 days (2 played, 3 not): 1 − 0.16 − 0.36 = 0.48.',
        'Weighted: 0.5 × 0.32 + 0.5 × 0.48 = 0.40. The cut drops the score from 0.48 to 0.40, so it helps.'
      ]
    },
    steps: [
      'Look at every possible cut on every column.',
      'Score each cut by how pure the two groups become. Keep the best one.',
      'Repeat inside each new group, asking a new question.',
      'Stop at a depth limit or when a group is too small or already pure.'
    ],
    use: ['You want an answer you can read and explain.', 'Your columns mix numbers and categories.'],
    avoid: ['When one deep tree memorises the data. Limit its depth or use many trees.', 'When the true pattern is a smooth curve.'],
    mistakes: [
      'Letting the tree grow until every leaf has one example. It memorises. Limit depth.',
      'Trusting one tree. A small change in data can change it a lot.',
      'Thinking the first question is the only one that matters. Later questions add detail.'
    ],
    cheat: ['ask the best question', 'purer groups = better cut', 'repeat in each group', 'limit depth', 'leaf = final answer'],
    next: ['gboost', 'overfit', 'crossval'],
    sources: ['Breiman, Friedman, Olshen, Stone, Classification and Regression Trees, 1984', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 9.2', 'scikit-learn documentation, Decision Trees user guide (Gini and entropy)']
  },
  overfit: {
    what: 'A model can memorise its training examples and still fail on new ones. That is overfitting. To catch it, hide some data and test on it.',
    analogy: 'A student memorises last year\'s exam answers. They score full marks on that paper and fail a new paper.',
    uses: ['Checking that a spam filter works on mail it has never seen', 'Choosing how complex a price-prediction model should be', 'Proving a medical model works on patients outside its training group'],
    before: ['gradient'],
    words: [
      ['training data', 'The examples the model learns from.'],
      ['test data', 'Examples kept hidden until the end, used to check the model.'],
      ['overfitting', 'Fitting the training data too closely, including its random noise.'],
      ['underfitting', 'A model so simple that it misses the real pattern.'],
      ['generalise', 'Work well on data the model has not seen.']
    ],
    math: {
      lines: ['\\text{error} = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2'],
      symbols: [
        ['\\hat{y}_i', 'the guess for example number i'],
        ['y_i', 'the true answer for example number i'],
        ['n', 'how many examples we measure on'],
        ['\\sum', 'add up the value for every example']
      ],
      example: [
        'A very bendy curve fits 3 training points exactly. Each gap is 0, so train error is 0.',
        'Now test on 2 new points. The curve guesses 2 and 5, and the truths are 3 and 3.',
        'The gaps are 1 and 2. Squared they are 1 and 4.',
        'Test error is (1 + 4) / 2 = 2.5.',
        'Train error 0 and test error 2.5 is the sign of overfitting.'
      ]
    },
    steps: [
      'Split your data. Keep some aside as test data and never train on it.',
      'Fit simple models first, such as a straight line. Both errors are high.',
      'Add more bends. Training error keeps falling.',
      'Watch test error. It falls, then climbs again when the curve starts chasing noise.',
      'Pick the model where test error is lowest.'
    ],
    use: ['Always, whenever you build any model.', 'When choosing between a simple and a complex model.'],
    avoid: ['Testing on the same data you trained on. That score tells you nothing.', 'Peeking at the test data again and again while you tune.'],
    mistakes: [
      'Reporting training error as the result. Report error on data the model never saw.',
      'Tuning on the test set many times. The test data then leaks into your choices. Keep a separate check set.',
      'Using a split of only a few points. The score then jumps around. See cross-validation.'
    ],
    cheat: ['train error always falls', 'test error is the truth', 'U-shaped test curve', 'simple = misses', 'too bendy = memorises'],
    next: ['biasvar', 'crossval', 'regular'],
    sources: ['Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 7 (model assessment)', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 1.1 (polynomial curve fitting)', 'scikit-learn documentation, Cross-validation and Underfitting vs Overfitting examples']
  },
  backprop: {
    what: 'A neuron adds up its inputs times weights, then squashes the total. Backpropagation finds how much each weight caused the error, so every weight can be fixed together.',
    analogy: 'A cake tastes wrong. You walk back through the recipe steps and work out how much each ingredient added to the problem.',
    uses: ['Training image recognisers on photos', 'Training the language models behind chatbots', 'Training speech-to-text systems'],
    before: ['gradient', 'Slopes (derivatives)'],
    words: [
      ['neuron', 'A small unit that weights its inputs, adds them, and squashes the total.'],
      ['activation', 'The squashing step. This lesson uses tanh, which maps any number into -1 to 1.'],
      ['forward pass', 'Pushing the inputs through the network to get an output.'],
      ['backward pass', 'Walking back from the error to find each weight\'s share of blame.'],
      ['chain rule', 'A rule for combining slopes of steps that feed each other.']
    ],
    math: {
      lines: ['a = w x', 'y = \\tanh(a)', 'L = (y - t)^2', '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial a} \\cdot \\frac{\\partial a}{\\partial w}'],
      symbols: [
        ['x', 'the input to the neuron'],
        ['w', 'the weight on that input'],
        ['a', 'the total before squashing'],
        ['y', 'the neuron output after squashing'],
        ['t', 'the target, the output we want'],
        ['L', 'the loss: how far the output is from the target, squared'],
        ['\\frac{\\partial L}{\\partial w}', 'how much the loss changes when w changes a little']
      ],
      example: [
        'One neuron: x = 1, w = 0.5, target t = 1. Then a = 0.5 and y = tanh(0.5) ≈ 0.462.',
        'The loss is (0.462 − 1)² ≈ 0.289.',
        'Chain rule pieces: ∂L/∂y = 2 × (0.462 − 1) ≈ −1.076. ∂y/∂a = 1 − y² ≈ 0.786. ∂a/∂w = x = 1.',
        'Multiply them: ∂L/∂w ≈ −1.076 × 0.786 × 1 ≈ −0.846.',
        'With learning rate 0.5, new w = 0.5 − 0.5 × (−0.846) ≈ 0.923. The new output is about 0.727 and the loss drops to about 0.074.'
      ]
    },
    steps: [
      'Forward pass: push the inputs through every neuron to get an output.',
      'Measure the loss: how far the output is from the target.',
      'Backward pass: starting at the loss, use the chain rule to find each weight\'s gradient.',
      'Update: move every weight a small step against its gradient.',
      'Repeat many times. The loss shrinks.'
    ],
    use: ['You train a network with many layers.', 'Every step of the network has a slope you can calculate.'],
    avoid: ['Models with steps that have no slope, such as hard yes-or-no cuts.', 'Tiny problems where a simple formula already works.'],
    mistakes: [
      'Starting all weights at the same value. Every neuron then learns the same thing. Start with small random values.',
      'Using a learning rate that is too big. The loss jumps around. Lower it.',
      'Thinking backprop is the learning. It only finds the gradients. The update step does the learning.'
    ],
    cheat: ['forward: get output', 'loss: how wrong', 'backward: who is to blame', 'update: nudge weights', 'repeat'],
    next: ['embeddings', 'regular', 'gboost'],
    sources: ['Rumelhart, Hinton, Williams, Learning representations by back-propagating errors, Nature, 1986', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 6.5', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 5.3']
  },
  embeddings: {
    what: 'An embedding turns a word into a list of numbers, like an arrow. Words with similar meaning get arrows that point the same way. Cosine similarity measures that match.',
    analogy: 'Think of words as places on a map. Cat and dog are on the same street. Cat and car are in different towns.',
    uses: ['Search that finds results by meaning, not exact words', 'Recommending songs or products similar to ones you liked', 'Giving chatbots a way to look up relevant notes'],
    before: ['Vectors as lists of numbers'],
    words: [
      ['embedding', 'A list of numbers that stands for a word or item.'],
      ['vector', 'An ordered list of numbers. You can draw it as an arrow.'],
      ['dot product', 'Multiply matching numbers of two vectors, then add the results.'],
      ['cosine similarity', 'A score from -1 to 1 for how closely two arrows point the same way.'],
      ['length', 'How long the arrow is.']
    ],
    math: {
      lines: ['\\cos(a, b) = \\frac{a \\cdot b}{\\lVert a \\rVert \\, \\lVert b \\rVert}'],
      symbols: [
        ['a, b', 'the two arrows (lists of numbers) we compare'],
        ['a \\cdot b', 'dot product: multiply matching numbers, then add them up'],
        ['\\lVert a \\rVert', 'the length of arrow a'],
        ['\\cos(a, b)', 'the score: 1 same way, 0 at right angles, -1 opposite']
      ],
      example: [
        'Say cat = (3, 1), dog = (2, 1) and car = (−1, 3).',
        'Cat and dog: dot product = 3 × 2 + 1 × 1 = 7. Lengths are √10 and √5.',
        'Score = 7 / (√10 × √5) = 7 / 7.07 ≈ 0.99. Nearly the same direction.',
        'Cat and car: dot product = 3 × (−1) + 1 × 3 = 0.',
        'Score = 0, so the arrows are at a right angle. The words are unrelated.'
      ]
    },
    steps: [
      'Give every word its own list of numbers.',
      'Train so that words used in similar places end up with similar lists.',
      'To compare two words, compute their cosine similarity.',
      'To search, score every word against your word and keep the highest scores.'
    ],
    use: ['You need to find things that mean the same.', 'You want to feed words or items to a model as numbers.'],
    avoid: ['When exact matches matter, such as order numbers.', 'When you need to explain each number. The numbers have no plain meaning on their own.'],
    mistakes: [
      'Comparing by length, not by direction. Cosine looks at direction only.',
      'Reading a high score as proof of the same meaning. Opposites like hot and cold can score high.',
      'Mixing arrows from two different models. Their numbers do not line up.'
    ],
    cheat: ['word = arrow of numbers', 'same direction = similar', 'cosine near 1 = close', 'cosine 0 = unrelated', 'ignore arrow length'],
    next: ['knn', 'pca', 'backprop'],
    sources: ['Mikolov, Chen, Corrado, Dean, Efficient Estimation of Word Representations in Vector Space, 2013 (arXiv 1301.3781)', 'Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft, ch. on vector semantics', 'scikit-learn documentation, cosine_similarity']
  },
  logistic: {
    what: 'Logistic regression answers yes-or-no questions with a chance between 0 and 1. It takes a weighted sum, then squashes it with the sigmoid curve.',
    analogy: 'A dimmer switch that never goes fully off or fully on. Far to the left it is nearly off, and far to the right nearly on.',
    uses: ['Predicting whether a student passes from hours studied', 'Flagging whether an email is spam', 'Estimating whether a patient has a disease from test results'],
    before: ['gradient'],
    words: [
      ['sigmoid', 'An S-shaped curve that turns any number into a value from 0 to 1.'],
      ['probability', 'A number from 0 to 1 for how likely something is.'],
      ['threshold', 'The cut-off chance, such as 0.5, above which you answer yes.'],
      ['log loss', 'A score that punishes confident wrong answers very hard.'],
      ['decision boundary', 'The place where the chance equals the threshold.']
    ],
    math: {
      lines: ['z = w x + b', 'p = \\frac{1}{1 + e^{-z}}', 'L = -\\ln p \\;\\; (\\text{if the answer is yes})'],
      symbols: [
        ['x', 'the input, such as hours studied'],
        ['w', 'the weight: how steep the curve is'],
        ['b', 'the bias: slides the curve left or right'],
        ['z', 'the weighted sum before squashing'],
        ['p', 'the chance of yes, from 0 to 1'],
        ['e', 'a fixed number, about 2.718, used by the sigmoid'],
        ['\\ln', 'natural log: the power you raise e to'],
        ['L', 'log loss for one example']
      ],
      example: [
        'Let w = 1 and b = −4. A student studied x = 5 hours.',
        'z = 1 × 5 − 4 = 1. Then p = 1 / (1 + e^−1) ≈ 0.731.',
        'A student with x = 2 hours: z = −2, so p ≈ 0.119.',
        'At the 0.5 threshold, 5 hours says pass and 2 hours says fail.',
        'If the student really passed, the log loss is −ln(0.731) ≈ 0.313.'
      ]
    },
    steps: [
      'Compute the weighted sum z from the inputs.',
      'Squash z with the sigmoid to get a chance p.',
      'Compare p with the real answer using log loss.',
      'Use gradient descent to adjust w and b so the log loss falls.',
      'To decide, pick a threshold. At 0.5 the boundary sits where z is 0.'
    ],
    use: ['You need a yes-or-no answer with a chance.', 'You want a simple model you can explain.'],
    avoid: ['When the boundary between groups is very curvy.', 'When you need a number, not a yes-or-no. Use plain regression.'],
    mistakes: [
      'Calling it regression and expecting a number. It outputs a chance.',
      'Treating 0.5 as always right. Move the threshold when one mistake costs more.',
      'Using squared error as the loss. Log loss trains this model better.'
    ],
    cheat: ['weighted sum, then sigmoid', 'output is a chance', 'threshold decides yes or no', 'train with log loss', 'steeper w = sharper switch'],
    next: ['confusion', 'regular', 'nbayes'],
    sources: ['Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 4.4', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 4.3.2', 'scikit-learn documentation, Logistic regression user guide']
  },
  confusion: {
    what: 'A confusion matrix counts four kinds of outcomes for a yes-or-no model. Precision and recall turn those counts into two clear questions about its mistakes.',
    analogy: 'A fisherman casts a net for tuna. Precision asks how much of the catch is tuna. Recall asks how many of the tuna he caught.',
    uses: ['Judging a spam filter', 'Judging a medical test for a rare disease', 'Judging a fraud detector at a bank'],
    before: ['logistic'],
    words: [
      ['true positive', 'The model said yes and it was right. Spam caught.'],
      ['false positive', 'The model said yes but it was wrong. Good mail flagged.'],
      ['false negative', 'The model said no but it was wrong. Spam missed.'],
      ['precision', 'Of everything flagged, the share that was right.'],
      ['recall', 'Of everything that was really there, the share we caught.']
    ],
    math: {
      lines: ['\\text{precision} = \\frac{TP}{TP + FP}', '\\text{recall} = \\frac{TP}{TP + FN}', '\\text{accuracy} = \\frac{TP + TN}{TP + FP + FN + TN}'],
      symbols: [
        ['TP', 'true positives: spam correctly flagged'],
        ['FP', 'false positives: good mail wrongly flagged'],
        ['FN', 'false negatives: spam that slipped through'],
        ['TN', 'true negatives: good mail correctly left alone']
      ],
      example: [
        'Twenty emails, 9 are spam. The filter flags 8 emails. 7 of them are spam.',
        'So TP = 7 and FP = 1. FN = 9 − 7 = 2. TN = 20 − 7 − 1 − 2 = 10.',
        'Precision = 7 / (7 + 1) = 7/8 = 0.875.',
        'Recall = 7 / (7 + 2) = 7/9 ≈ 0.778.',
        'Accuracy = (7 + 10) / 20 = 0.85.'
      ]
    },
    steps: [
      'Pick a threshold. Every score at or above it is flagged.',
      'Count the four outcomes: TP, FP, FN and TN.',
      'Work out precision: how trustworthy are the flags.',
      'Work out recall: how much of the target did we catch.',
      'Move the threshold and watch the two trade against each other.'
    ],
    use: ['One kind of mistake costs more than the other.', 'One label is rare, so accuracy misleads.'],
    avoid: ['Using accuracy alone on lopsided data.', 'Comparing models at different thresholds without saying so.'],
    mistakes: [
      'Trusting accuracy when 99 of 100 cases are normal. A model that always says no scores 99 percent. Check recall.',
      'Mixing up precision and recall. Precision looks at the flags. Recall looks at the real cases.',
      'Forgetting the threshold. Raising it lifts precision and lowers recall.'
    ],
    cheat: ['precision = right flags / all flags', 'recall = caught / all real', 'raise threshold: precision up, recall down', 'accuracy can lie', 'count TP FP FN TN first'],
    next: ['logistic', 'nbayes', 'crossval'],
    sources: ['Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 9.2.5 and 12', 'Manning, Raghavan, Schütze, Introduction to Information Retrieval, 2008, ch. 8.3', 'scikit-learn documentation, Model evaluation: precision, recall and F-measures']
  },
  kmeans: {
    what: 'k-means sorts points into k groups without any labels. It puts k centres on the map. Then it moves them until each sits in the middle of its group.',
    analogy: 'Pick k spots for ice-cream vans. Every home walks to its nearest van. Then each van moves to the middle of its customers.',
    uses: ['Grouping shop customers by how often and how much they buy', 'Reducing the colours of a photo to a few', 'Sorting news stories into topics'],
    before: ['knn', 'Averages'],
    words: [
      ['cluster', 'A group of points that sit close together.'],
      ['centre', 'The middle point of a cluster, found by averaging its points.'],
      ['assign', 'Give each point to its nearest centre.'],
      ['unsupervised', 'Learning with no answers given. The model finds the groups itself.'],
      ['elbow', 'The bend in the score curve that hints at a good k.']
    ],
    math: {
      lines: ['\\mu_j = \\frac{1}{|C_j|} \\sum_{x \\in C_j} x', 'J = \\sum_{j=1}^{k} \\sum_{x \\in C_j} \\lVert x - \\mu_j \\rVert^2'],
      symbols: [
        ['C_j', 'the set of points assigned to group j'],
        ['\\mu_j', 'the centre of group j: the average of its points'],
        ['|C_j|', 'how many points are in group j'],
        ['x', 'one point'],
        ['k', 'the number of groups'],
        ['J', 'the score: the sum of squared distances to each point\'s centre. Lower is tighter.']
      ],
      example: [
        'Five points on a line: 1, 2, 9, 10, 12. Start the centres at 1 and 10.',
        'Assign: 1 and 2 go to the first centre. 9, 10 and 12 go to the second.',
        'Update: the first centre becomes (1 + 2) / 2 = 1.5. The second becomes (9 + 10 + 12) / 3 ≈ 10.33.',
        'Assign again: nobody changes group, so we stop.',
        'Score J = 0.25 + 0.25 + 1.78 + 0.11 + 2.78 ≈ 5.17.'
      ]
    },
    steps: [
      'Drop k centres at random spots, or on k of the points.',
      'Assign every point to its nearest centre.',
      'Move each centre to the average of its points.',
      'Repeat assign and move until no point changes group.',
      'Score the result, and try other values of k.'
    ],
    use: ['You have no labels and want to find groups.', 'Groups are round blobs of similar size.'],
    avoid: ['Odd shapes such as rings or long streaks.', 'Data with a few huge outliers that drag the centres.'],
    mistakes: [
      'Picking k with no check. Plot the score for several k and look for the elbow.',
      'Trusting one run. A bad start can give a poor result. Run it several times.',
      'Forgetting to scale columns. A column with big numbers dominates the distance.'
    ],
    cheat: ['assign to nearest centre', 'move centre to the average', 'repeat until stable', 'score always drops as k grows', 'look for the elbow'],
    next: ['pca', 'knn', 'embeddings'],
    sources: ['Lloyd, Least squares quantization in PCM, IEEE Trans. Information Theory, 1982 (written 1957)', 'Arthur and Vassilvitskii, k-means++: the advantages of careful seeding, 2007', 'scikit-learn documentation, Clustering user guide (k-means)']
  },
  pca: {
    what: 'PCA squeezes many columns into a few. It finds the direction where the data spreads out most. Each point is then described by where it lands on that direction.',
    analogy: 'A shadow of a long stick is longest when the light hits it from the side. PCA finds the angle that makes the shadow longest.',
    uses: ['Shrinking hundreds of measurements to two so you can plot them', 'Speeding up other models by removing near-duplicate columns', 'Removing noise from images'],
    before: ['Averages', 'Variance (how spread out numbers are)'],
    words: [
      ['variance', 'The average squared distance of values from their average. It measures spread.'],
      ['principal component', 'A direction in the data that keeps a lot of the spread.'],
      ['projection', 'Dropping a point straight onto a line, like a shadow.'],
      ['centre the data', 'Subtract each column\'s average so the cloud sits around zero.'],
      ['dimension', 'One column, or one direction of measurement.']
    ],
    math: {
      lines: ['z = u \\cdot x', '\\text{kept} = \\frac{\\operatorname{Var}(z)}{\\text{total variance}}'],
      symbols: [
        ['x', 'one data point, after centring'],
        ['u', 'the direction we project onto, an arrow of length 1'],
        ['z', 'where the point lands along that direction'],
        ['\\operatorname{Var}(z)', 'the spread of all the landing spots'],
        ['\\cdot', 'dot product: multiply matching numbers, then add']
      ],
      example: [
        'Four centred points: (−3, −2), (−1, −1), (1, 1), (3, 2). Total variance is 5 + 2.5 = 7.5.',
        'Project onto the x axis, u = (1, 0). The spots are −3, −1, 1, 3. Their variance is 5.',
        'That keeps 5 / 7.5 ≈ 67 percent of the spread.',
        'Try u = (2, 1) / √5. The spots are −3.58, −1.34, 1.34, 3.58. Their variance is 7.3.',
        'This keeps 7.3 / 7.5 ≈ 97 percent. The tilted axis is a far better choice.'
      ]
    },
    steps: [
      'Centre the data so its average sits at zero.',
      'Draw a line through the middle at some angle.',
      'Drop every point straight onto the line and measure the spread of the landing spots.',
      'Turn the line to the angle with the most spread. That is the first component.',
      'The next component is at a right angle to it. Keep only as many as you need.'
    ],
    use: ['You have many columns that move together.', 'You want a simple picture of high-dimensional data.'],
    avoid: ['When the useful signal lies in a small-spread direction.', 'When you must keep each original column\'s meaning.'],
    mistakes: [
      'Skipping the centring step. The first direction then points at the average, not the spread.',
      'Not scaling columns. A column in big units takes over the result.',
      'Thinking more spread always means more useful. Spread is not the same as importance for your goal.'
    ],
    cheat: ['centre first', 'find the widest-spread direction', 'project points onto it', 'next one is at a right angle', 'keep the top few'],
    next: ['kmeans', 'embeddings', 'regular'],
    sources: ['Pearson, On lines and planes of closest fit to systems of points in space, 1901', 'Hotelling, Analysis of a complex of statistical variables into principal components, 1933', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 14.5', 'scikit-learn documentation, Decomposing signals: PCA']
  },
  biasvar: {
    what: 'Error on new data has three parts: bias, variance and noise. A stiff model misses the pattern. A flexible one wobbles with each new sample.',
    analogy: 'Two archers. One always hits the same spot left of the target. The other hits all around it. Both miss for different reasons.',
    uses: ['Deciding how complex a model should be', 'Knowing whether to collect more data or simplify the model', 'Explaining why a model works in training but not later'],
    before: ['overfit'],
    words: [
      ['bias', 'The habit of missing in the same direction. Stiff models have high bias.'],
      ['variance', 'How much the model changes when trained on a different sample.'],
      ['noise', 'Random error in the data that no model can remove.'],
      ['degree', 'How many bends a curve may make.'],
      ['sample', 'One set of training examples drawn from the real pattern.']
    ],
    math: {
      lines: ['\\text{expected error} = \\text{bias}^2 + \\text{variance} + \\sigma^2'],
      symbols: [
        ['\\text{bias}^2', 'the squared gap between the average guess and the truth'],
        ['\\text{variance}', 'the average squared gap of each guess from the average guess'],
        ['\\sigma^2', 'the noise: spread in the data that cannot be removed']
      ],
      example: [
        'The true value at one spot is 10. Train on 3 samples. The three guesses are 7, 9 and 11.',
        'The average guess is 9. Bias = 9 − 10 = −1, so bias² = 1.',
        'Variance = ((7−9)² + (9−9)² + (11−9)²) / 3 = 8/3 ≈ 2.67.',
        'Say the noise σ² is 0.5.',
        'Expected error = 1 + 2.67 + 0.5 ≈ 4.17.'
      ]
    },
    steps: [
      'Know the true pattern. Real data is a noisy sample from it.',
      'Fit a curve of your chosen degree to one sample.',
      'Draw a fresh sample and fit again. Do this many times.',
      'Average the fits. Bias is how far the average sits from the truth.',
      'Variance is how far the fits scatter around their average. The sum is lowest in the middle.'
    ],
    use: ['You need to decide how flexible a model should be.', 'You must choose between more data and a simpler model.'],
    avoid: ['Treating the split as exact for every loss type. It is clean for squared error.', 'Expecting to measure bias on real data. The true pattern is unknown there.'],
    mistakes: [
      'Thinking more flexible is always better. Variance grows and the total can rise.',
      'Thinking a simple model is always safer. It may carry large bias.',
      'Forgetting noise. Some error stays even in a perfect model.'
    ],
    cheat: ['error = bias² + variance + noise', 'stiff = high bias', 'flexible = high variance', 'best model sits between', 'more data lowers variance'],
    next: ['regular', 'crossval', 'gboost'],
    sources: ['Geman, Bienenstock, Doursat, Neural networks and the bias/variance dilemma, Neural Computation, 1992', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 7.3', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 3.2']
  },
  gboost: {
    what: 'Gradient boosting builds a strong model from many small trees. Each new tree learns the mistakes the model has so far. Its answer is added in small steps.',
    analogy: 'A team proofreads an essay. Each person fixes only the errors that earlier readers left behind.',
    uses: ['Predicting house prices from tables of data', 'Ranking search results', 'Spotting fraud in bank transactions'],
    before: ['tree', 'gradient'],
    words: [
      ['residual', 'What is left over: the true value minus the model\'s guess.'],
      ['weak learner', 'A small, simple model, here a short tree.'],
      ['boosting', 'Adding models one after another, each fixing the last one\'s errors.'],
      ['learning rate', 'A number below 1 that shrinks each tree\'s contribution.'],
      ['held-out error', 'Error on data not used for training.']
    ],
    math: {
      lines: ['F_m(x) = F_{m-1}(x) + \\nu \\, h_m(x)', 'r_i = y_i - F_{m-1}(x_i)'],
      symbols: [
        ['F_m', 'the model after m trees'],
        ['h_m', 'the new small tree, fitted to the residuals'],
        ['\\nu', 'the learning rate, a small number such as 0.1 or 0.5'],
        ['r_i', 'the residual of example i: what the model still gets wrong'],
        ['y_i', 'the true value for example i'],
        ['x_i', 'the inputs of example i']
      ],
      example: [
        'Three prices: 10, 12 and 20. Start with the average guess 14 for all.',
        'Residuals: −4, −2 and 6. Squared errors: 16, 4 and 36, average 18.67.',
        'A small tree learns them: −3 for the first two homes and 6 for the third.',
        'With ν = 0.5, the new guesses are 12.5, 12.5 and 17. For example, 14 + 0.5 × 6 = 17.',
        'New residuals: −2.5, −0.5 and 3. Squared errors average (6.25 + 0.25 + 9) / 3 ≈ 5.17.'
      ]
    },
    steps: [
      'Start with a simple guess, such as the average.',
      'Find the residuals: how wrong the guess is for every example.',
      'Fit a small tree to predict those residuals.',
      'Add the tree to the model, scaled down by the learning rate.',
      'Repeat. Stop when held-out error stops improving.'
    ],
    use: ['You have table data with mixed columns.', 'You want strong accuracy and can tune a few settings.'],
    avoid: ['Tiny data sets, where it can overfit.', 'Raw images, sound or text, where neural networks do better.'],
    mistakes: [
      'Adding too many trees. Training error keeps falling while held-out error rises. Stop early.',
      'Setting the learning rate too high. Use a small rate and more trees.',
      'Growing deep trees. Keep each tree short so it stays a weak learner.'
    ],
    cheat: ['fit trees to residuals', 'add each in small steps', 'small learning rate + more trees', 'watch held-out error', 'stop early'],
    next: ['regular', 'crossval', 'biasvar'],
    sources: ['Friedman, Greedy function approximation: a gradient boosting machine, Annals of Statistics, 2001', 'Chen and Guestrin, XGBoost: a scalable tree boosting system, KDD, 2016', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 10', 'scikit-learn documentation, Gradient boosting user guide']
  },
  regular: {
    what: 'Regularization puts a price on big weights. The model must balance fitting the data against paying that price. This keeps it from fitting noise.',
    analogy: 'Imagine a shopper with a budget. Spending on a big weight costs money, so they only buy the weights that earn their keep.',
    uses: ['Keeping a model with many columns from overfitting', 'Picking out the few columns that matter (with L1)', 'Making linear models stable when columns overlap'],
    before: ['overfit', 'gradient'],
    words: [
      ['weight', 'A number the model learns for each input column.'],
      ['penalty', 'An extra cost added to the loss for big weights.'],
      ['L2 (ridge)', 'A penalty on the squares of the weights. It shrinks all weights.'],
      ['L1 (lasso)', 'A penalty on the absolute sizes of weights. It can set some to exactly zero.'],
      ['lambda', 'The knob for how strong the penalty is.']
    ],
    math: {
      lines: ['L_2 = \\text{error} + \\lambda (w_1^2 + w_2^2)', 'L_1 = \\text{error} + \\lambda (|w_1| + |w_2|)'],
      symbols: [
        ['\\text{error}', 'how badly the model fits the data'],
        ['\\lambda', 'the penalty strength. Zero means no penalty.'],
        ['w_1, w_2', 'the two weights of the model'],
        ['|w|', 'absolute value: the size of w with the sign dropped']
      ],
      example: [
        'Take one weight with best fit a = 3. Loss = (w − 3)² + penalty. Set λ = 1.',
        'L2: (w − 3)² + w². The lowest point is w = 3 / (1 + 1) = 1.5. The weight shrinks, but stays above zero.',
        'L1: (w − 3)² + |w|. The lowest point is w = 3 − 1/2 = 2.5.',
        'Now take a weak weight with best fit a = 0.4. L2 gives 0.4 / 2 = 0.2.',
        'L1 would give 0.4 − 0.5, which is below zero, so L1 sets it to exactly 0.'
      ]
    },
    steps: [
      'Fit the model to the data and note the error.',
      'Add a penalty for large weights to the loss.',
      'L2 charges the squares, so it shrinks every weight a little.',
      'L1 charges the sizes, so it pushes weak weights all the way to zero.',
      'Choose lambda with cross-validation.'
    ],
    use: ['You have many columns and not much data.', 'You want to drop weak columns (L1).'],
    avoid: ['Large lambda on a model that already underfits.', 'Unscaled columns, because the penalty treats all weights alike.'],
    mistakes: [
      'Not scaling columns first. The penalty hits columns with small units too hard.',
      'Penalising the bias term. Usually only the weights are penalised.',
      'Picking lambda by training error. It always says zero. Use held-out data.'
    ],
    cheat: ['price on big weights', 'L2 shrinks all', 'L1 zeroes some', 'lambda 0 = no penalty', 'tune lambda with cross-validation'],
    next: ['crossval', 'biasvar', 'gboost'],
    sources: ['Hoerl and Kennard, Ridge regression: biased estimation for nonorthogonal problems, Technometrics, 1970', 'Tibshirani, Regression shrinkage and selection via the lasso, JRSS B, 1996', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 3.4', 'scikit-learn documentation, Ridge and Lasso user guide']
  },
  crossval: {
    what: 'Cross-validation gives an honest score when you have little data. You split the data into k slices. You test on each slice in turn and train on the rest.',
    analogy: 'A class of five students swaps papers. Each student marks one paper they did not write, so everyone is judged fairly.',
    uses: ['Comparing two models on a small data set', 'Choosing settings such as the penalty strength', 'Reporting how well a model will do on new data'],
    before: ['overfit'],
    words: [
      ['fold', 'One slice of the data, held back for testing in one round.'],
      ['k', 'How many folds there are.'],
      ['validation score', 'The score on the held-back fold.'],
      ['hyperparameter', 'A setting you choose before training, such as curve degree.'],
      ['leakage', 'When test information sneaks into training and inflates the score.']
    ],
    math: {
      lines: ['\\text{CV score} = \\frac{1}{k} \\sum_{j=1}^{k} s_j'],
      symbols: [
        ['k', 'the number of folds'],
        ['s_j', 'the score on fold j, from a model trained on the other folds'],
        ['\\sum_{j=1}^{k}', 'add the score of every fold from 1 to k']
      ],
      example: [
        'You have 100 points and choose k = 5. Each fold holds 20 points.',
        'Round 1 trains on 80 points and tests on fold 1. Repeat for every fold.',
        'Say the five scores are 0.82, 0.79, 0.85, 0.80 and 0.84.',
        'Their sum is 4.10.',
        'The cross-validation score is 4.10 / 5 = 0.82.'
      ]
    },
    steps: [
      'Shuffle the data and cut it into k equal folds.',
      'Hold out fold 1. Train on the other folds and score on fold 1.',
      'Repeat so that every fold is the test fold once.',
      'Average the k scores.',
      'Do this for each model or setting, and pick the best average.'
    ],
    use: ['Your data set is small.', 'You must choose between several models or settings.'],
    avoid: ['Huge data, where one simple split is enough and faster.', 'Data in time order, unless the folds respect the order.'],
    mistakes: [
      'Scaling or picking columns on all the data before splitting. That leaks. Do it inside each round.',
      'Using the final cross-validation score after heavy tuning as the true score. Keep a last test set.',
      'Shuffling time-ordered data. The future then leaks into the past.'
    ],
    cheat: ['k folds, k rounds', 'each fold tests once', 'average the scores', 'pick the best average', 'no peeking before the split'],
    next: ['regular', 'biasvar', 'gboost'],
    sources: ['Stone, Cross-validatory choice and assessment of statistical predictions, JRSS B, 1974', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 7.10', 'scikit-learn documentation, Cross-validation: evaluating estimator performance']
  },
  nbayes: {
    what: 'Naive Bayes decides if an email is spam by multiplying one chance per word. It treats words as independent, which is naive, yet it works well.',
    analogy: 'A detective collects clues. Each clue alone nudges the guess. The detective multiplies the nudges as if no clue affected another.',
    uses: ['Filtering spam email', 'Sorting news stories by topic', 'Guessing if a review is happy or unhappy'],
    before: ['confusion', 'Probability basics'],
    words: [
      ['prior', 'How likely spam is before you read the email.'],
      ['likelihood', 'How likely a word is, given the email is spam or normal.'],
      ['posterior', 'The updated chance of spam after seeing the words.'],
      ['independent', 'One word tells you nothing about another. Not really true, but handy.'],
      ['smoothing', 'Adding a small count to every word so none has a zero chance.']
    ],
    math: {
      lines: ['P(\\text{spam} \\mid \\text{words}) = \\frac{P(\\text{spam}) \\prod_i P(w_i \\mid \\text{spam})}{P(\\text{spam}) \\prod_i P(w_i \\mid \\text{spam}) + P(\\text{normal}) \\prod_i P(w_i \\mid \\text{normal})}'],
      symbols: [
        ['P(\\text{spam})', 'the prior chance of spam'],
        ['P(w_i \\mid \\text{spam})', 'the chance of word i appearing in a spam email'],
        ['\\prod_i', 'multiply the value for every word i'],
        ['\\mid', 'the word "given", as in chance of this given that']
      ],
      example: [
        'Of 6 spam emails, "free" appears in 5 and "meeting" in 1. Of 6 normal emails, 1 and 4. Prior is 0.5 each.',
        'A new email has "free" and "meeting". Spam score: 0.5 × 5/6 × 1/6 ≈ 0.0694.',
        'Normal score: 0.5 × 1/6 × 4/6 ≈ 0.0556.',
        'Scale to add to 100 percent: 0.0694 / (0.0694 + 0.0556) = 5/9.',
        'The email is about 55.6 percent likely to be spam.'
      ]
    },
    steps: [
      'Count how often each word appears in spam and in normal mail.',
      'Turn counts into chances. Add smoothing so no chance is zero.',
      'For a new email, multiply the chances of its words, once for spam and once for normal.',
      'Scale the two results so they add to 100 percent.',
      'Call it spam if the spam share is above your threshold.'
    ],
    use: ['You have text and little time or data.', 'You want a fast baseline to beat.'],
    avoid: ['When word combinations matter a lot, like "not good".', 'When you need well-calibrated chances. They tend to be too extreme.'],
    mistakes: [
      'Skipping smoothing. One unseen word makes the whole product zero.',
      'Multiplying many tiny chances directly. They underflow to zero. Add logs instead.',
      'Reading the percent as exact. Treat it as a ranking score.'
    ],
    cheat: ['chance per word', 'multiply them all', 'compare spam to normal', 'smoothing avoids zeros', 'use logs in real code'],
    next: ['logistic', 'confusion', 'embeddings'],
    sources: ['Manning, Raghavan, Schütze, Introduction to Information Retrieval, 2008, ch. 13', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 4.2', 'scikit-learn documentation, Naive Bayes user guide']
  },
  svm: {
    what: 'A support vector machine splits two groups with a line. Of all lines that work, it picks the one with the widest empty street between the groups.',
    analogy: 'Two villages sit on either side of a field. You build the road down the middle so it stays as far as possible from both.',
    uses: ['Telling apart types of text, such as sports and politics', 'Recognising handwritten digits', 'Classifying gene data in biology'],
    before: ['logistic', 'Distance from a point to a line'],
    words: [
      ['margin', 'The width of the empty street between the two groups.'],
      ['support vector', 'A point that touches the edge of the street. Only these points matter.'],
      ['hyperplane', 'The dividing line, or flat sheet when there are more than two columns.'],
      ['soft margin', 'A street that lets a few points cross, so overlapping data still works.'],
      ['kernel', 'A trick that lets a straight divider act like a curved one.']
    ],
    math: {
      lines: ['w \\cdot x + b = 0', '\\text{margin width} = \\frac{2}{\\lVert w \\rVert}'],
      symbols: [
        ['x', 'a point, written as a list of numbers'],
        ['w', 'the list of weights that sets the tilt of the line'],
        ['b', 'the bias that slides the line'],
        ['\\lVert w \\rVert', 'the length of w'],
        ['\\cdot', 'dot product: multiply matching numbers, then add']
      ],
      example: [
        'Let w = (3, 4) and b = −5. The line is 3x + 4y − 5 = 0.',
        'The length of w is √(9 + 16) = 5.',
        'A point at (2, 1) gives 3 × 2 + 4 × 1 − 5 = 5. Its distance from the line is 5 / 5 = 1.',
        'Say the closest points have value exactly 1 or −1. Each then sits 1 / 5 = 0.2 from the line.',
        'The street is 2 / 5 = 0.4 wide. A smaller w would make a wider street.'
      ]
    },
    steps: [
      'Start with two groups of labelled points.',
      'Many lines can split them. Each one has a street of some width.',
      'Pick the line whose street is widest. The points on its edges are the support vectors.',
      'For overlapping data, allow a few points inside the street. This is the soft margin.',
      'For curved boundaries, use a kernel.'
    ],
    use: ['Medium-sized data with clear gaps between groups.', 'Many columns but fewer examples.'],
    avoid: ['Very large data sets, where training gets slow.', 'When you need chances, not only a yes-or-no side.'],
    mistakes: [
      'Not scaling columns. The street then depends on units.',
      'Setting the soft margin too loose or too tight. Tune it with cross-validation.',
      'Thinking all points matter. Only the points on the street edge set the line.'
    ],
    cheat: ['widest street wins', 'support vectors set the line', 'width = 2 / length of w', 'soft margin for overlap', 'kernel for curves'],
    next: ['logistic', 'regular', 'crossval'],
    sources: ['Cortes and Vapnik, Support-vector networks, Machine Learning, 1995', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 12.2', 'scikit-learn documentation, Support Vector Machines user guide']
  }
};
if (typeof module !== 'undefined') module.exports = { AI_ABOUT_ML };
