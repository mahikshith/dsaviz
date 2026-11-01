// About-this-lesson content for the ML foundations track. Our own writing; facts checked against the sources listed per lesson.
const AI_ABOUT_ML = {
  graphs: {
    what: 'A graph puts two numbers on a page at once. Each pair is one point. A straight line follows the rule y = w × x + b, where w sets the tilt and b sets the start.',
    analogy: 'A map has a street number and a floor number. Together they point to one apartment. A graph does the same with x and y.',
    uses: ['Reading how a plant grows day by day', 'Seeing whether two things move together, such as study time and test score', 'Describing a rule that predicts one number from another'],
    before: ['Reading numbers on a ruler or a clock'],
    words: [
      ['x', 'The number along the bottom of the graph. Here it is the day.'],
      ['y', 'The number up the side of the graph. Here it is the height of the plant.'],
      ['point', 'One pair of numbers, written (x, y). It marks one reading on the graph.'],
      ['w', 'The tilt of the line. It says how much y rises for each step in x.'],
      ['b', 'The start of the line. It is the value of y when x is 0.']
    ],
    math: {
      lines: ['y = w x + b'],
      symbols: [
        ['x', 'the input, the number along the bottom'],
        ['y', 'the output, the number up the side'],
        ['w', 'the tilt of the line, called its slope (the next lesson explains it)'],
        ['b', 'where the line starts when x is 0']
      ],
      example: [
        'A plant is 3 cm tall on day 0 and grows 2 cm each day. So w = 2 and b = 3.',
        'On day 4 the rule gives y = 2 × 4 + 3 = 11. The plant is 11 cm tall.',
        'On day 6 the rule gives y = 2 × 6 + 3 = 15. We can predict a day nobody measured.'
      ]
    },
    steps: [
      'Choose what x and y mean, such as the day and the height.',
      'Mark each reading as a point: go across by x, then up by y.',
      'If the points line up, draw a straight line through them.',
      'Write the line as y = w × x + b by finding its start and its tilt.',
      'Use the rule to predict y for a new x.'
    ],
    use: ['Two numbers are linked and you want to see how.', 'The change in y looks about the same for every step in x.'],
    avoid: ['The points curve or bunch up. One straight line will describe them badly.'],
    mistakes: [
      'Mixing up the two directions. The x number goes across first, then y goes up.',
      'Reading the first tick as 0 when it is not. Check the numbers on the axes.',
      'Trusting a line far outside the data. The rule may stop holding there.'
    ],
    cheat: ['x goes across, y goes up', 'a point is (x, y)', 'y = w × x + b', 'w is the tilt', 'b is the start'],
    next: ['slope', 'gradient'],
    sources: ['Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 2 and 5', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 5.1.4 (linear regression)']
  },
  slope: {
    what: 'Slope tells how steep a line is. It is the rise, how far the line goes up, divided by the run. The run is how far it goes across. A straight line has the same slope everywhere.',
    analogy: 'Think of a ramp. A steep ramp gains height fast for each step forward. A gentle ramp gains height slowly.',
    uses: ['Finding how fast a price, a speed or a score is changing', 'Reading the number w in the rule y = w × x + b', 'Telling a computer that learns which way to change a number'],
    before: ['graphs'],
    words: [
      ['slope', 'How steep a line is: the rise divided by the run.'],
      ['rise', 'How far you go up between two points on the line. Going down gives a negative rise.'],
      ['run', 'How far you go across between the same two points.'],
      ['negative slope', 'A slope below zero. The line goes down as you move right.']
    ],
    math: {
      lines: ['m = \\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}'],
      symbols: [
        ['m', 'the slope of the line'],
        ['(x_1, y_1)', 'the first point'],
        ['(x_2, y_2)', 'the second point'],
        ['y_2 - y_1', 'the rise: how much y changes'],
        ['x_2 - x_1', 'the run: how much x changes']
      ],
      example: [
        'Take the line y = 1.5 × x + 1. Pick the points (2, 4) and (6, 10).',
        'The run is 6 − 2 = 4. The rise is 10 − 4 = 6.',
        'The slope is 6 ÷ 4 = 1.5. Any other two points on the line give 1.5 again.'
      ]
    },
    steps: [
      'Pick two points on the line.',
      'Find the run: the difference in x.',
      'Find the rise: the difference in y.',
      'Divide the rise by the run.',
      'Read the sign: up means positive, down means negative, flat means 0.'
    ],
    use: ['You want one number for how fast y changes with x.', 'The line is straight, so any two points give the same answer.'],
    avoid: ['The shape is a curve. Its slope changes from place to place, so you need the derivative.'],
    mistakes: [
      'Dividing run by rise. The rise goes on top.',
      'Subtracting the points in different orders. Use the same order for the top and the bottom.',
      'Forgetting the sign. A line that falls has a negative slope.'
    ],
    cheat: ['slope = rise ÷ run', 'up is positive', 'down is negative', 'flat is zero', 'w in y = w × x + b is the slope'],
    next: ['derivative'],
    sources: ['Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 5.1', 'Strang, Calculus, 3rd ed., 2017, ch. 1 (slope and straight lines)']
  },
  derivative: {
    what: 'A curve is steeper in some places than others. The derivative is the slope of the curve at one point. Zoom in far enough and the curve looks like a straight line, and that line has the slope.',
    analogy: 'A car speedometer shows how fast you go at this moment. The derivative does the same for a curve: the rate right here.',
    uses: ['Finding the speed of something from its position over time', 'Finding the lowest point of an error number, where the slope is 0', 'Showing how a small change to a setting changes a computer\'s mistake'],
    before: ['slope'],
    words: [
      ['derivative', 'The slope of a curve at one point. It says how fast y changes when x changes a little.'],
      ['tangent', 'The straight line that touches a curve at one point and has the same slope there.'],
      ['curve', 'A line that bends, so its slope is different in different places.'],
      ['zoom', 'Looking at a smaller and smaller piece of the curve, made bigger.']
    ],
    math: {
      lines: ['m_h = \\frac{f(x + h) - f(x)}{h}', '\\frac{df}{dx} = \\lim_{h \\to 0} m_h'],
      symbols: [
        ['f(x)', 'the height of the curve at x'],
        ['h', 'a small step to the right of x'],
        ['m_h', 'the slope of the line through the point at x and the point at x + h'],
        ['\\lim_{h \\to 0}', 'the value m_h settles toward as h gets smaller and smaller'],
        ['\\frac{df}{dx}', 'the derivative of f at x']
      ],
      example: [
        'Take the curve f(x) = x × x ÷ 4 and the point x = 4. There f(4) = 4.',
        'With h = 3, the point is (7, 12.25). The slope is (12.25 − 4) ÷ 3 = 2.75.',
        'With h = 0.1, f(4.1) = 4.2025. The slope is (4.2025 − 4) ÷ 0.1 = 2.025.',
        'The values settle toward 2. The derivative at x = 4 is 2, and the rule is x ÷ 2.'
      ]
    },
    steps: [
      'Pick the point on the curve where you want the slope.',
      'Pick a second point a small step h away and find the slope of the line through both.',
      'Make h smaller and watch the slope settle toward one number.',
      'That number is the derivative at the point.',
      'The line with that slope that touches the curve is the tangent.'
    ],
    use: ['You want to know how fast something changes at one moment.', 'You are searching for a lowest or highest point, where the slope is 0.'],
    avoid: ['The shape has a sharp corner. There the slope jumps, so there is no single slope.'],
    mistakes: [
      'Using a big step h and calling the result the derivative. It is only a rough guess.',
      'Mixing up the slope of the curve with the height of the curve.',
      'Thinking a slope of 0 always means the lowest point. It may also be a top or a flat stretch.'
    ],
    cheat: ['derivative = slope at one point', 'zoom in until it looks straight', 'tangent = the touching line', 'slope 0 = flat spot', 'for x × x ÷ 4 the derivative is x ÷ 2'],
    next: ['chainrule', 'gradarrow'],
    sources: ['Strang, Calculus, 3rd ed., 2017, ch. 2 (the derivative)', 'Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 5.1', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 4.3']
  },
  chainrule: {
    what: 'Often one number feeds a step, and its answer feeds a second step. A small change at the start passes through both steps. The slope of the chain is the first slope times the second slope.',
    analogy: 'Think of three gears in a row. The middle gear spins 2 times as fast as the first. The last gear spins 2.5 times as fast as the middle one. So the last gear spins 5 times as fast as the first.',
    uses: ['Finding how the last number in a long calculation reacts to the first', 'Teaching a neural network, a learning program made of many steps in a chain', 'Checking how a small error early on grows by the end'],
    before: ['derivative'],
    words: [
      ['chain rule', 'The slope of a chain of steps is the product of the slopes of the steps.'],
      ['nudge', 'A small change to a number, such as adding 0.1.'],
      ['slope', 'How many times bigger the output nudge is than the input nudge.'],
      ['product', 'The answer you get when you multiply numbers.']
    ],
    math: {
      lines: ['\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}'],
      symbols: [
        ['x', 'the first number, the input of step A'],
        ['u', 'the middle number, the output of step A and the input of step B'],
        ['y', 'the last number, the output of step B'],
        ['\\frac{du}{dx}', 'the slope of step A'],
        ['\\frac{dy}{du}', 'the slope of step B'],
        ['\\frac{dy}{dx}', 'the slope of the whole chain']
      ],
      example: [
        'Step A is u = 2 × x + 1 and step B is y = u × u ÷ 4. Start with x = 2.',
        'Then u = 5 and y = 6.25. The slope of A is 2. The slope of B at u = 5 is 5 ÷ 2 = 2.5.',
        'The slope of the chain is 2 × 2.5 = 5.',
        'Check by nudging x to 2.1. Then u = 5.2 and y = 6.76. The change is 0.51, close to 5 × 0.1 = 0.5.'
      ]
    },
    steps: [
      'Write the process as steps, each feeding the next.',
      'Find the slope of each step at the value it receives.',
      'Multiply the slopes.',
      'The product says how much a small change at the start changes the end.'
    ],
    use: ['A result depends on a chain of two or more steps.', 'You need how the end responds to the start without redoing the whole calculation.'],
    avoid: ['The steps are not smooth, so some step has no slope at that point.'],
    mistakes: [
      'Adding the slopes instead of multiplying them.',
      'Finding the slope of step B at x instead of at u. Use the value that step B really receives.',
      'Trusting the estimate for a big nudge. The slopes change as the numbers move.'
    ],
    cheat: ['one change passes through every step', 'multiply the slopes', 'each slope uses its own input', 'works best for small nudges'],
    next: ['gradarrow', 'backprop'],
    sources: ['Strang, Calculus, 3rd ed., 2017, ch. 2.5 (the chain rule)', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 6.5.2', 'Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 5.2']
  },
  gradarrow: {
    what: 'A model often has many knobs. The loss has one slope for each knob. The gradient collects those slopes into one arrow that points uphill. Step the opposite way and the loss falls. The next lesson uses this to fit a line.',
    analogy: 'Stand on a foggy hillside. You feel how the ground tilts to the left and how it tilts forward. Put the two tilts together and you know the steepest way up.',
    uses: ['Telling a model how to change many weights at once', 'Finding the fastest way down a landscape with more than one direction', 'Setting up gradient descent, the way most models learn'],
    before: ['derivative', 'chainrule'],
    words: [
      ['knob', 'A number the model can change, like a knob on a radio. Here the two knobs are a and b.'],
      ['loss', 'One number that says how wrong the model is. Lower is better.'],
      ['gradient', 'The list of slopes of the loss, one for each knob. As an arrow, it points uphill.'],
      ['step size', 'A small number that says how far to move each time. It is also called the learning rate.'],
      ['gradient descent', 'Repeat: find the gradient, step the opposite way, and look again.']
    ],
    math: {
      lines: ['\\nabla L = \\left( \\frac{\\partial L}{\\partial a}, \\frac{\\partial L}{\\partial b} \\right)', '(a, b) \\leftarrow (a, b) - \\eta \\, \\nabla L'],
      symbols: [
        ['L', 'the loss'],
        ['a, b', 'the two knobs'],
        ['\\frac{\\partial L}{\\partial a}', 'the slope of the loss when only a changes'],
        ['\\frac{\\partial L}{\\partial b}', 'the slope of the loss when only b changes'],
        ['\\nabla L', 'the gradient: both slopes as one arrow'],
        ['\\eta', 'the step size'],
        ['\\leftarrow', 'replace the numbers on the left with the values on the right']
      ],
      example: [
        'Take the loss L = (a − 6)² + (b − 4)². Its lowest point is at (6, 4).',
        'At a = 3 and b = 7, L = 9 + 9 = 18.',
        'The slope along a is 2 × (3 − 6) = −6. The slope along b is 2 × (7 − 4) = 6. The gradient is (−6, 6).',
        'Use a step size of 0.3. The new knobs are (3 − 0.3 × (−6), 7 − 0.3 × 6) = (4.8, 5.2).',
        'The new loss is 1.44 + 1.44 = 2.88. It fell from 18.'
      ]
    },
    steps: [
      'Find the slope of the loss for each knob, keeping the others still.',
      'Collect the slopes in a list. That list is the gradient.',
      'Draw it as an arrow. It points uphill.',
      'Move the knobs a small step the opposite way.',
      'Repeat until the loss stops falling.'
    ],
    use: ['The model has two or more numbers to tune.', 'You can measure the loss and find its slopes.'],
    avoid: ['The step size is large and the landscape is steep. The steps may overshoot.'],
    mistakes: [
      'Stepping along the gradient instead of against it. That raises the loss.',
      'Using one slope and ignoring the others. The arrow needs every knob.',
      'Setting the step size too big. The knobs jump past the lowest point and zigzag.'
    ],
    cheat: ['one slope per knob', 'gradient = all the slopes as one arrow', 'it points uphill', 'go the opposite way', 'step size scales each move'],
    next: ['gradient'],
    sources: ['Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 4.3 (gradient-based optimisation)', 'Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 5.2 and 7.1', 'Strang, Calculus, 3rd ed., 2017, ch. 13 (partial derivatives and the gradient)']
  },
  vectors: {
    what: 'A vector is a short list of numbers. You can draw it as an arrow. The dot product multiplies matching places and adds them. It is large when two arrows point the same way. It is 0 at a right angle. It is negative when they face away.',
    analogy: 'Two people walk across a field. If they head the same way, their efforts add up. If they pull opposite ways, they cancel. The dot product scores that.',
    uses: ['Giving each word a list of numbers that a computer can compare', 'Adding up inputs times weights inside a neuron', 'Recommending items whose number lists match what you like'],
    before: ['graphs'],
    words: [
      ['vector', 'A list of numbers. Drawn as an arrow, each number tells how far to go along one direction.'],
      ['length', 'How long the arrow is. Multiply each number by itself, add the results, then take the square root.'],
      ['dot product', 'Multiply the matching places of two vectors, then add. The answer is one number.'],
      ['neuron', 'A tiny part of a learning program. It multiplies each input by a weight, which says how much it counts, and adds the results.'],
      ['embedding', 'A vector of numbers that stands for a word or an item.']
    ],
    math: {
      lines: ['\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2', '\\lVert \\vec{a} \\rVert = \\sqrt{a_1^2 + a_2^2}', '\\vec{a} \\cdot \\vec{b} = \\lVert \\vec{a} \\rVert \\, \\lVert \\vec{b} \\rVert \\cos\\theta'],
      symbols: [
        ['\\vec{a}, \\vec{b}', 'two vectors'],
        ['a_1, a_2', 'the first and second numbers of a'],
        ['\\cdot', 'the dot product'],
        ['\\lVert \\vec{a} \\rVert', 'the length of a'],
        ['\\theta', 'the angle between the two arrows'],
        ['\\cos\\theta', 'a number that is 1 at 0 degrees, 0 at 90 degrees and −1 at 180 degrees']
      ],
      example: [
        'Take a = [3, 2] and b = [1, 3].',
        'The dot product is 3 × 1 + 2 × 3 = 3 + 6 = 9.',
        'The length of a is √(9 + 4) = √13, about 3.61.',
        'Now take a neuron with inputs [3, 2] and weights [2, 0.5]. Its dot product is 3 × 2 + 2 × 0.5 = 7.'
      ]
    },
    steps: [
      'Write each thing as a list of numbers.',
      'Multiply the numbers in matching places.',
      'Add the products.',
      'Read the result: large and positive means they agree, 0 means a right angle, negative means they face away.'
    ],
    use: ['You want one score for how well two lists of numbers match.', 'You need weighted sums, as in a neuron.'],
    avoid: ['The two lists have different lengths. The places do not match up.'],
    mistakes: [
      'Adding the places instead of multiplying them.',
      'Comparing vectors of very different length by dot product alone. A long arrow scores high from its size.',
      'Forgetting that the dot product is one number, not another vector.'
    ],
    cheat: ['vector = list of numbers = arrow', 'add place by place', 'dot = multiply places, then add', 'big and positive = agree', '0 = right angle, negative = opposite'],
    next: ['backprop', 'embeddings'],
    sources: ['Strang, Introduction to Linear Algebra, 5th ed., 2016, ch. 1 (vectors and dot products)', 'Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 2 and 3', 'Goodfellow, Bengio, Courville, Deep Learning, 2016, ch. 2.1 to 2.5']
  },
  probability: {
    what: 'The mean is the balance point of some numbers. The spread says how far they wander from it. A chance, or probability, is a number from 0 to 1 that says how likely something is.',
    analogy: 'Roll a die many times. Any one roll is a surprise. After hundreds of rolls the average is steady and easy to predict.',
    uses: ['Judging whether a test score is unusual', 'Measuring a model with the mean of its errors', 'Turning a classifier answer into a chance, such as 0.9 for spam'],
    before: ['graphs'],
    words: [
      ['mean', 'The total divided by how many numbers there are. It is the balance point.'],
      ['spread', 'How far the numbers sit from the mean.'],
      ['variance', 'The mean of the squared gaps from the mean. To square a gap, multiply it by itself.'],
      ['standard deviation', 'The square root of the variance. It is the usual gap from the mean.'],
      ['chance', 'A number from 0 to 1 that says how likely something is. It is also called probability.'],
      ['random', 'Picked with no pattern, so each student or outcome has the same chance.'],
      ['loss', 'One number that says how wrong a model is. Often it is the mean of squared gaps.'],
      ['classifier', 'A model that sorts things into groups. It often gives a chance for each group.']
    ],
    math: {
      lines: ['\\mu = \\frac{1}{n} \\sum_{i=1}^{n} x_i', '\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\mu)^2', 'P(\\text{event}) = \\frac{\\text{ways it can happen}}{\\text{all ways}}'],
      symbols: [
        ['\\mu', 'the mean'],
        ['x_i', 'one of the numbers'],
        ['n', 'how many numbers there are'],
        ['\\sum', 'add up the value for every number'],
        ['\\sigma^2', 'the variance'],
        ['\\sigma', 'the standard deviation, the square root of the variance'],
        ['P(\\text{event})', 'the chance that the event happens']
      ],
      example: [
        'Ten quiz scores: 4, 5, 5, 6, 6, 6, 7, 7, 8, 9. The total is 63, so the mean is 6.3.',
        'The gaps from 6.3 are −2.3, −1.3, −1.3, −0.3, −0.3, −0.3, 0.7, 0.7, 1.7, 2.7.',
        'The squares add up to 20.1. The variance is 20.1 ÷ 10 = 2.01.',
        'The standard deviation is √2.01, about 1.42.',
        'Four of the ten scores are 7 or more. A random student has a chance of 4 ÷ 10 = 0.4.'
      ]
    },
    steps: [
      'Add up the numbers and divide by how many there are. That is the mean.',
      'Find each gap from the mean.',
      'Square the gaps and take their mean. That is the variance.',
      'Take the square root to get the standard deviation.',
      'Count the ways something can happen and divide by all the ways. That is its chance.'
    ],
    use: ['You want one number for the middle, and one for how much values vary.', 'You want to say how likely an outcome is.'],
    avoid: ['A few extreme values sit in the data. They pull the mean, so check the spread too.'],
    mistakes: [
      'Judging chance from a few trials. Ten rolls of a die rarely look fair.',
      'Forgetting that all chances must add up to 1.',
      'Reading a mean without its spread. Two groups can share a mean and differ a lot.'
    ],
    cheat: ['mean = total ÷ count', 'variance = mean of squared gaps', 'standard deviation = square root of variance', 'chance is from 0 to 1', 'more trials give steadier averages'],
    next: ['gradient', 'logistic', 'nbayes'],
    sources: ['Wasserman, All of Statistics, 2004, ch. 1 to 3', 'Deisenroth, Faisal, Ong, Mathematics for Machine Learning, 2020, ch. 6', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 2.4']
  },
  gradient: {
    what: 'Linear regression draws the best straight line through a cloud of dots. Gradient descent finds that line by trial. It makes a guess, measures the error, and nudges the line to lower the error.',
    analogy: 'Imagine walking down a foggy hill. You cannot see the bottom. You feel which way slopes down and take a small step.',
    uses: ['Predicting house prices from size', 'Training almost every neural network, including chatbots', 'Forecasting sales from past months of data'],
    before: ['gradarrow', 'Averages', 'Straight lines (y = w x + b)'],
    words: [
      ['weight', 'A number the model can change. Here it is the slope of the line: it tilts the line.'],
      ['bias', 'The second number. It lifts or lowers the whole line.'],
      ['loss', 'One number that says how wrong the model is. Lower is better.'],
      ['gradient', 'The slope of the loss. It points uphill, to where the loss grows fastest. We step the opposite way.'],
      ['learning rate', 'How big each step is. Too small is slow. Too big can jump past the best line.']
    ],
    math: {
      lines: ['\\hat{y} = w x + b', 'L = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2', 'w \\leftarrow w - \\eta \\, \\frac{\\partial L}{\\partial w}'],
      symbols: [
        ['\\hat{y}', 'the guess the line makes for one point'],
        ['x', 'the input, such as the size of a home'],
        ['y', 'the true answer, such as the real price'],
        ['w', 'the weight, which is the slope of the line'],
        ['b', 'the bias, which moves the line up or down'],
        ['L', 'the loss: the average of the squared gaps. We square each gap so a gap below the line cannot cancel a gap above it'],
        ['n', 'how many points there are'],
        ['\\eta', 'the learning rate, the size of each step'],
        ['\\leftarrow', 'replace the number on the left with the value on the right'],
        ['\\frac{\\partial L}{\\partial w}', 'the slope of the loss: how fast the loss changes when w changes a little']
      ],
      example: [
        'This is a smaller example than the animation. It has one point, not eight. The steps work the same way.',
        'Take one point: x = 2 and y = 5. Start with w = 1 and b = 0.',
        'The guess is 1 × 2 + 0 = 2. The error is 2 − 5 = −3, so the loss is 9.',
        'The slope of the loss for w is 2 × error × x. That is 2 × (−3) × 2 = −12.',
        'Pick a learning rate of 0.05. The new w is 1 − 0.05 × (−12) = 1.6.',
        'The new guess is 1.6 × 2 = 3.2. The error is −1.8, so the loss falls from 9 to 3.24.'
      ]
    },
    steps: [
      'Start with any line, for example a level one.',
      'Measure the gap between the line and every dot. Square each gap and average them. That is the loss.',
      'Find the gradient: how the loss changes when you nudge the slope or the bias.',
      'Move each number a small step against its gradient. The step size is the learning rate.',
      'Repeat until the loss stops falling. The line now fits the dots.'
    ],
    use: ['You have a loss you can measure and a slope you can find.', 'The model has many numbers to tune, and no ready-made rule gives the answer at once.'],
    avoid: ['A tiny line fit, where a ready-made rule gives the exact answer at once.', 'The loss has no slope, such as counting mistakes directly.'],
    mistakes: [
      'Setting the learning rate too high. The loss grows instead of shrinking. Lower the rate.',
      'Stopping after a few steps because the line looks fine. Watch the loss curve until it flattens.',
      'Mixing inputs of very different sizes, such as metres and grams. Put them on the same size range first so the steps behave.'
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
      ['label', 'The answer attached to an example, such as liked or skipped.'],
      ['majority vote', 'The label that most of the neighbours share.'],
      ['measurement', 'One number that describes an item, such as how much action a film has.']
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
        'This is a smaller made-up example than the animation: four rated films, and a new film at (3, 4).',
        'The four films sit at A (3, 5), B (4, 5), C (1, 4) and D (6, 8). Each pair is the amount of action and romance.',
        'Distances to the new film are: A 1, B 1.41 (√2), C 2, D 5.',
        'Say A is skipped, and B, C and D are liked, with D far away. With k = 1 the nearest, A, decides: skip.',
        'With k = 3 the neighbours are A, B and C. That is one skip and two likes, so the vote says like.',
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
    avoid: ['Huge data sets, because every question scans all the examples.', 'Many measurements per item, where all distances start to look alike.'],
    mistakes: [
      'Using k = 1. One unusual example then decides everything. Try a larger, odd k.',
      'Mixing measurements of different sizes, such as metres and grams. Put them on the same size range first, for example 0 to 1.',
      'Choosing an even k, which can tie. With two labels and k = 2, one vote each is a tie. Use an odd k.'
    ],
    cheat: ['closest k vote', 'small k = jumpy', 'big k = blurry', 'same size range for measurements', 'odd k avoids ties'],
    next: ['kmeans', 'crossval', 'embeddings'],
    sources: ['Cover and Hart, Nearest neighbor pattern classification, IEEE Trans. Information Theory, 1967', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 13', 'scikit-learn documentation, Nearest Neighbors user guide']
  },
  tree: {
    what: 'A decision tree is a chain of yes-or-no questions. Each question splits the examples into two groups. The best question makes each group mostly one label.',
    analogy: 'It is like guessing an animal by asking yes-or-no questions. Each answer rules out many options until one is left.',
    uses: ['Deciding whether a loan is likely to be repaid', 'Helping doctors sort patients by risk from simple test results', 'Choosing whether a day is good for playing outside'],
    before: ['Counting and fractions'],
    words: [
      ['split', 'One yes-or-no question about one measurement, such as is it hot. It cuts the examples into two groups.'],
      ['pure', 'A group is pure when every example in it has the same label.'],
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
        ['G_L, G_R', 'the impurity of the left group and the right group'],
        ['G_{\\text{split}}', 'the score of a split: each side counts in proportion to its size']
      ],
      example: [
        'This is the same data as the animation: 19 days, 9 played and 10 stayed in.',
        'The shares are 9/19 and 10/19. Gini of all 19: 1 − 0.224 − 0.277 = 0.50.',
        'Try the split "wind above 5". The windy side has 7 days, and all stayed in. Its Gini is 0.',
        'The calm side has 12 days (9 played, 3 stayed in): 1 − 0.5625 − 0.0625 = 0.375.',
        'Weighted: 7/19 × 0 + 12/19 × 0.375 = 0.24. The split drops the score from 0.50 to 0.24, so it helps.'
      ]
    },
    steps: [
      'Look at every possible split on every measurement.',
      'Score each split by how pure the two groups become. Keep the best one.',
      'Repeat inside each new group, asking a new question.',
      'Stop at a depth limit or when a group is too small or already pure.'
    ],
    use: ['You want an answer you can read and explain.', 'Your measurements mix numbers and categories.'],
    avoid: ['When one deep tree copies the data, noise included. Limit its depth or use many trees.', 'When the true pattern is a smooth curve.'],
    mistakes: [
      'Letting the tree grow until every leaf has one example. It copies the data, noise included. Limit depth.',
      'Trusting one tree. A small change in data can change it a lot.',
      'Thinking the first question is the only one that matters. Later questions add detail.'
    ],
    cheat: ['ask the best question', 'purer groups = better split', 'repeat in each group', 'limit depth', 'leaf = final answer'],
    next: ['gboost', 'overfit', 'crossval'],
    sources: ['Breiman, Friedman, Olshen, Stone, Classification and Regression Trees, 1984', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 9.2', 'scikit-learn documentation, Decision Trees user guide (Gini and entropy)']
  },
  overfit: {
    what: 'A model can copy its training examples, noise included, and still fail on new ones. That is overfitting. To catch it, hide some data and test on it.',
    analogy: 'A student memorises last year\'s exam answers. They score full marks on that paper and fail a new paper.',
    uses: ['Checking that a spam filter works on mail it has never seen', 'Choosing how complex a price-prediction model should be', 'Proving a medical model works on patients outside its training group'],
    before: ['gradient'],
    words: [
      ['training data', 'The examples the model learns from.'],
      ['test data', 'Examples kept hidden until the end, used to check the model.'],
      ['error', 'How far the guesses sit from the true answers, squared and averaged. Lower is better.'],
      ['degree', 'How bendy the curve may be. Degree 1 is a straight line. Higher degrees bend more.'],
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
        'This is a smaller made-up example than the animation. A very bendy curve fits 3 training points exactly. Each gap is 0, so train error is 0.',
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
      'Tuning on the test set many times. Your choices then start to fit the test data too. Keep a third, separate set for the final check.',
      'Using a split of only a few points. The score then jumps around. See cross-validation.'
    ],
    cheat: ['train error always falls', 'test error is the truth', 'U-shaped test curve', 'simple = misses', 'too bendy = copies the noise'],
    next: ['biasvar', 'crossval', 'regular'],
    sources: ['Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 7 (model assessment)', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 1.1 (polynomial curve fitting)', 'scikit-learn documentation, Cross-validation and Underfitting vs Overfitting examples']
  },
  backprop: {
    what: 'A neuron adds up its inputs times weights, then squashes the total. Backpropagation finds how much each weight caused the error, so every weight can be fixed together.',
    analogy: 'A cake tastes wrong. You walk back through the recipe steps and work out how much each ingredient added to the problem.',
    uses: ['Training image recognisers on photos', 'Training the language models behind chatbots', 'Training speech-to-text systems'],
    before: ['gradient', 'Slopes (how fast one number changes when another number changes)'],
    words: [
      ['neuron', 'A small unit that weights its inputs, adds them, and squashes the total.'],
      ['activation', 'The squashing step. The output neuron in the animation has no squash, so its value can go past 1.'],
      ['tanh', 'The squash used here. It turns any number into one between -1 and 1.'],
      ['loss', 'One number that says how wrong the output is. Lower is better.'],
      ['gradient', 'How much the loss changes when one weight changes a little.'],
      ['forward pass', 'Pushing the inputs through the network to get an output.'],
      ['backward pass', 'Walking back from the error to find each weight\'s share of blame.'],
      ['chain rule', 'A rule for slopes of steps that feed each other: multiply the slopes. It is how blame travels back.']
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
        'This is a smaller example than the animation: one neuron with a tanh squash. The animation has an output neuron that does not squash.',
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
    analogy: 'Think of each word as an arrow from the centre of a map. Cat and dog point the same way. Cat and car point different ways. You compare directions, not distances.',
    uses: ['Search that finds results by meaning, not exact words', 'Recommending songs or products similar to ones you liked', 'Giving chatbots a way to look up relevant notes'],
    before: ['Vectors as lists of numbers'],
    words: [
      ['embedding', 'A list of numbers that stands for a word or item. For example, cat = (3, 1).'],
      ['vector', 'An ordered list of numbers. You can draw it as an arrow.'],
      ['dot product', 'Multiply matching numbers of two vectors, then add the results.'],
      ['cosine similarity', 'A score from -1 to 1 for how closely two arrows point the same way. It is the cosine of the angle between them.'],
      ['length', 'How long the arrow is.']
    ],
    math: {
      lines: ['\\cos(a, b) = \\frac{a \\cdot b}{\\lVert a \\rVert \\, \\lVert b \\rVert}'],
      symbols: [
        ['a, b', 'the two arrows (lists of numbers) we compare'],
        ['a \\cdot b', 'dot product: multiply matching numbers, then add them up'],
        ['\\lVert a \\rVert', 'the length of arrow a'],
        ['\\cos(a, b)', 'cosine similarity: the score for how alike arrows a and b point. 1 is the same way, 0 is a right angle, -1 is opposite']
      ],
      example: [
        'This is a smaller example than the animation, with easy numbers. Say cat = (3, 1), dog = (2, 1) and car = (−1, 3).',
        'Cat and dog: dot product = 3 × 2 + 1 × 1 = 7. Lengths are √10 and √5.',
        'Score = 7 / (√10 × √5) = 7 / 7.07 ≈ 0.99. Nearly the same direction.',
        'Cat and car: dot product = 3 × (−1) + 1 × 3 = 0.',
        'Score = 0, so the arrows are at a right angle. The words are unrelated.',
        'In the animation, cat and truck score −0.68. The arrows point mostly opposite ways, so the words are very unlike.'
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
      ['weighted sum', 'Each input times its weight, all added up, plus the bias. Written z.'],
      ['sigmoid', 'An S-shaped curve that turns any number into a value from 0 to 1.'],
      ['probability', 'A number from 0 to 1 for how likely something is. 0.8 means 8 in 10.'],
      ['threshold', 'The cut-off chance, such as 0.5, above which you answer yes.'],
      ['log loss', 'A penalty score. It is biggest when the model is sure about the wrong answer.'],
      ['gradient descent', 'Nudging w and b a little in the direction that lowers the loss, again and again.'],
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
        ['\\ln', 'natural log. ln asks: e to what power gives this number? For example, ln 1 = 0, and ln of a number below 1 is negative'],
        ['L', 'log loss for one example. A chance p is below 1, so ln p is negative. The minus sign makes the penalty positive']
      ],
      example: [
        'This is a made-up example, not the animation: its w and b are different, so the numbers differ.',
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
    analogy: 'A fisherman casts a net for tuna. Precision asks: how much of what he pulled in is tuna? Recall asks: how many of all the tuna did he pull in?',
    uses: ['Judging a spam filter', 'Judging a medical test for a rare disease', 'Judging a fraud detector at a bank'],
    before: ['logistic'],
    words: [
      ['positive', 'The model says yes. Here, an email flagged as spam.'],
      ['true positive, false positive', 'True positive: the model said yes and was right (spam caught). False positive: it said yes but was wrong (good mail flagged).'],
      ['false negative', 'The model said no but it was wrong. Spam missed.'],
      ['confusion matrix', 'A 2 × 2 grid that holds the four counts.'],
      ['precision', 'Of everything flagged, the share that was right.'],
      ['recall', 'Of everything that was really there, the share we caught.'],
      ['accuracy', 'Of all emails, the share the model marked correctly.'],
      ['threshold', 'The cut-off score. Emails at or above it are flagged.']
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
        'This matches the animation at its starting threshold. Twenty emails, 9 are spam. The filter flags 10 emails. 7 of them are spam.',
        'So TP = 7 and FP = 3. FN = 9 − 7 = 2. TN = 20 − 7 − 3 − 2 = 8.',
        'Precision = 7 / (7 + 3) = 7/10 = 0.70.',
        'Recall = 7 / (7 + 2) = 7/9 ≈ 0.778.',
        'Accuracy = (7 + 8) / 20 = 0.75.'
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
    what: 'k-means sorts points into k groups without any labels. It puts k centres on the map. Then it moves them until each sits in the middle of its group. Each centre is a mean, which is an average, so the name.',
    analogy: 'Pick k spots for ice-cream vans. Every home walks to its nearest van. Then each van moves to the middle of its customers.',
    uses: ['Grouping shop customers by how often and how much they buy', 'Reducing the colours of a photo to a few', 'Sorting news stories into topics'],
    before: ['knn', 'Averages'],
    words: [
      ['cluster', 'A group of points that sit close together.'],
      ['centre', 'The middle point of a cluster, found by averaging its points.'],
      ['assign', 'Give each point to its nearest centre.'],
      ['unsupervised', 'Learning with no answers given. The model finds the groups itself.'],
      ['elbow', 'The bend in the score curve that hints at a good k.'],
      ['outlier', 'A point far away from all the others.']
    ],
    math: {
      lines: ['\\mu_j = \\frac{1}{|C_j|} \\sum_{x \\in C_j} x', 'J = \\sum_{j=1}^{k} \\sum_{x \\in C_j} \\lVert x - \\mu_j \\rVert^2'],
      symbols: [
        ['C_j', 'the set of points assigned to group j'],
        ['\\mu_j', 'the centre of group j: the average of its points'],
        ['|C_j|', 'how many points are in group j'],
        ['x', 'one point'],
        ['k', 'the number of groups'],
        ['J', 'the score: the sum of squared distances to each point\'s centre. A squared distance is a distance times itself, so far points count more. Lower is tighter.']
      ],
      example: [
        'This is a smaller example than the animation: five points on a line, not a map. Points: 1, 2, 9, 10, 12. Start the centres at 1 and 10.',
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
    avoid: ['Odd shapes such as rings or long streaks.', 'Data with a few outliers, points far from all the rest, that drag the centres.'],
    mistakes: [
      'Picking k with no check. Plot the score for several k and look for the elbow.',
      'Trusting one run. A bad start can give a poor result. Run it several times.',
      'Forgetting to put measurements on the same size range. A measurement with big numbers dominates the distance.'
    ],
    cheat: ['assign to nearest centre', 'move centre to the average', 'repeat until stable', 'score always drops as k grows', 'look for the elbow'],
    next: ['pca', 'knn', 'embeddings'],
    sources: ['Lloyd, Least squares quantization in PCM, IEEE Trans. Information Theory, 1982 (written 1957)', 'Arthur and Vassilvitskii, k-means++: the advantages of careful seeding, 2007', 'scikit-learn documentation, Clustering user guide (k-means)']
  },
  pca: {
    what: 'PCA squeezes many columns into a few. A column is one measurement for every item, such as height. PCA finds the direction where the data spreads out most. Each point is then described by where it lands on that direction.',
    analogy: 'Hold a long stick in the light. Its shadow is longest when the light hits it from the side. Think of the data cloud as the stick: PCA picks the angle that makes the shadow longest.',
    uses: ['Shrinking hundreds of measurements to two so you can plot them', 'Speeding up other models by removing near-duplicate columns', 'Removing noise from images'],
    before: ['Averages', 'Variance (how spread out numbers are)'],
    words: [
      ['column', 'One measurement for every item, such as height. Also called a dimension.'],
      ['variance', 'The average squared distance of values from their average. It measures spread.'],
      ['principal component', 'A direction in the data that keeps a lot of the spread. PC1 is the best one, PC2 the next.'],
      ['projection', 'Dropping a point straight onto a line, like a shadow.'],
      ['centre the data', 'Subtract the average of each column so the cloud sits around zero.']
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
        'This is a smaller made-up example than the animation: four points, not twenty. Four centred points: (−3, −2), (−1, −1), (1, 1), (3, 2). Total variance is 5 + 2.5 = 7.5.',
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
      'Not putting columns on the same size range. A column in big units takes over the result.',
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
        'This is a smaller made-up example than the animation: three fits at one spot, not twelve curves.',
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
      ['gradient', 'The slope of the loss, which says which way to nudge. Residuals play this role here, so the method is gradient descent built from trees.'],
      ['small tree (weak learner)', 'A small, simple model, here a short tree.'],
      ['boosting', 'Adding models one after another, each fixing the last one\'s errors.'],
      ['learning rate', 'A number below 1 that scales down each tree, such as 0.5 for half.'],
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
        'This is a smaller made-up example than the animation: three houses, not twenty-four.',
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
      'Adding too many trees. Training error keeps falling while held-out error rises. Stop adding trees at the lowest held-out error.',
      'Setting the learning rate too high. Use a small rate and more trees.',
      'Growing deep trees. Keep each tree short so it stays a small tree.'
    ],
    cheat: ['fit trees to residuals', 'add each in small steps', 'small learning rate + more trees', 'watch held-out error', 'stop adding trees in time'],
    next: ['regular', 'crossval', 'biasvar'],
    sources: ['Friedman, Greedy function approximation: a gradient boosting machine, Annals of Statistics, 2001', 'Chen and Guestrin, XGBoost: a scalable tree boosting system, KDD, 2016', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 10', 'scikit-learn documentation, Gradient boosting user guide']
  },
  regular: {
    what: 'Regularization puts a price on big weights. The model must balance fitting the data against paying that price. This keeps it from fitting noise.',
    analogy: 'Imagine a shopper in a shop where big weights cost more. They keep only the weights that help enough to be worth the price.',
    uses: ['Keeping a model with many inputs from overfitting', 'Picking out the few inputs that matter (with L1)', 'Making linear models stable when inputs overlap'],
    before: ['overfit', 'gradient'],
    words: [
      ['weight', 'A number the model learns for each input, which is one column of data.'],
      ['regularization', 'Adding a price for big weights, so the model cannot fit random noise.'],
      ['penalty', 'The price: an extra cost added to the loss for big weights.'],
      ['L2 (ridge)', 'A penalty on the squares of the weights. It shrinks all weights. Ridge is only a nickname.'],
      ['L1 (lasso)', 'A penalty on the sizes of the weights, with the minus sign dropped. It can set some to exactly zero. Lasso is only a nickname.'],
      ['lambda', 'The dial for how strong the penalty is.']
    ],
    math: {
      lines: ['L_2 = \\text{error} + \\lambda (w_1^2 + w_2^2)', 'L_1 = \\text{error} + \\lambda (|w_1| + |w_2|)'],
      symbols: [
        ['\\text{error}', 'how badly the model fits the data'],
        ['\\lambda', 'the penalty strength. Zero means no penalty.'],
        ['w_1, w_2', 'the two weights of the model'],
        ['w_1^2', 'w1 times itself, so a big weight costs much more'],
        ['|w|', 'absolute value: the size of w with the sign dropped']
      ],
      example: [
        'This is a smaller example than the animation: one weight, not two.',
        'Take one weight with best fit a = 3. Loss = (w − 3)² + penalty. Set λ = 1.',
        'The lowest point of the L2 loss is a / (1 + λ). The lowest point of the L1 loss is a − λ/2, but never below zero.',
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
    use: ['You have many inputs and not much data.', 'You want to drop weak inputs (L1).'],
    avoid: ['Large lambda on a model that already underfits.', 'Inputs on very different size ranges, because the penalty treats all weights alike.'],
    mistakes: [
      'Not putting inputs on the same size range first. The penalty hits inputs with small units too hard.',
      'Penalising the bias term. Usually only the weights are penalised.',
      'Picking lambda by training error. It always says zero. Use held-out data.'
    ],
    cheat: ['price on big weights', 'L2 shrinks all', 'L1 zeroes some', 'lambda 0 = no penalty', 'tune lambda with cross-validation'],
    next: ['crossval', 'biasvar', 'gboost'],
    sources: ['Hoerl and Kennard, Ridge regression: biased estimation for nonorthogonal problems, Technometrics, 1970', 'Tibshirani, Regression shrinkage and selection via the lasso, JRSS B, 1996', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 3.4', 'scikit-learn documentation, Ridge and Lasso user guide']
  },
  crossval: {
    what: 'Cross-validation gives an honest error when you have little data. You split the data into k slices. You test on each slice in turn and train on the rest. Lower error is better.',
    analogy: 'A teacher splits quiz questions into five piles. Each round, the class studies four piles and is tested on the fifth. After five rounds, every pile has been the test once.',
    uses: ['Comparing two models on a small data set', 'Choosing settings such as the penalty strength', 'Reporting how well a model will do on new data'],
    before: ['overfit'],
    words: [
      ['fold', 'One slice of the data, held back for testing in one round.'],
      ['k', 'How many folds there are.'],
      ['error', 'How far the guesses are from the true answers. Lower is better.'],
      ['degree', 'How bendy a curve may be. Degree 1 is a straight line.'],
      ['hyperparameter', 'A setting you choose before training, such as curve degree.'],
      ['leakage', 'When test information sneaks into training and makes the result look better than it is.']
    ],
    math: {
      lines: ['\\text{CV score} = \\frac{1}{k} \\sum_{j=1}^{k} s_j'],
      symbols: [
        ['k', 'the number of folds'],
        ['s_j', 'the score on fold j, from a model trained on the other folds'],
        ['\\sum_{j=1}^{k}', 'add the score of every fold from 1 to k']
      ],
      example: [
        'This is a made-up example with simple numbers, not the animation data. You have 100 points and choose k = 5. Each fold holds 20 points.',
        'Round 1 trains on 80 points and tests on fold 1. Repeat for every fold.',
        'Say the five errors are 0.82, 0.79, 0.85, 0.80 and 0.84.',
        'Their sum is 4.10.',
        'The cross-validation error is 4.10 / 5 = 0.82. The model or setting with the lowest average error wins.'
      ]
    },
    steps: [
      'Shuffle the data and cut it into k equal folds.',
      'Hold out fold 1. Train on the other folds and measure error on fold 1.',
      'Repeat so that every fold is the test fold once.',
      'Average the k errors.',
      'Do this for each model or setting, and pick the lowest average error.'
    ],
    use: ['Your data set is small.', 'You must choose between several models or settings.'],
    avoid: ['Huge data, where one simple split is enough and faster.', 'Data in time order, unless the folds respect the order.'],
    mistakes: [
      'Preparing the data on all the points before splitting, such as putting measurements on one size range. That leaks test information into training. Do it inside each round.',
      'Using the final cross-validation error after heavy tuning as the true error. Keep a last test set.',
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
      ['start chance (prior)', 'How likely spam is before you read the email.'],
      ['word chance (likelihood)', 'How likely a word is, given the email is spam or normal.'],
      ['final chance (posterior)', 'The updated chance of spam after seeing the words.'],
      ['independent', 'One word tells you nothing about another. Not really true, but handy.'],
      ['smoothing', 'Adding a small count, called alpha, to every word so none has a zero chance.']
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
        'This is the same data as the animation. The 6 spam emails hold 14 word appearances: "free" 5 times, "meeting" 0 times, and "lunch" once. The 6 normal emails hold 12: "free" once, "lunch" 3 times, "meeting" 4 times.',
        'Take smoothing alpha = 1 and 6 different words. The chance of "free" in spam is (5 + 1) / (14 + 6) = 0.300. "lunch" is (1 + 1) / 20 = 0.100. "meeting" is (0 + 1) / 20 = 0.050.',
        'Spam score for "free lunch meeting": 0.5 × 0.300 × 0.100 × 0.050 = 0.00075.',
        'In normal mail the chances are 2/18, 4/18 and 5/18. Normal score: 0.5 × 0.111 × 0.222 × 0.278 ≈ 0.00343.',
        'Scale to add to 100 percent: 0.00075 / (0.00075 + 0.00343) ≈ 0.18. The email is about 18 percent likely to be spam.'
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
      'Multiplying many tiny chances directly. The numbers get so small the computer rounds them to zero. Add logs instead.',
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
      ['margin', 'The distance from the line to the nearest point. The empty street is twice the margin wide.'],
      ['support vector', 'A point that touches the edge of the street. Only these points matter.'],
      ['measurement', 'One number that describes a point, such as height. Real data often has many.'],
      ['soft margin', 'A street that lets a few points cross, so overlapping data still works.'],
      ['C', 'The price of letting a point cross the street. You choose it.'],
      ['kernel', 'A way to let a straight-line method draw a curved boundary.']
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
        'This is a made-up example, not the animation data. Let w = (3, 4) and b = −5. The line is 3x + 4y − 5 = 0.',
        'The length of w is √(9 + 16) = 5.',
        'A point at (2, 1) gives 3 × 2 + 4 × 1 − 5 = 5. Its distance from the line is 5 / 5 = 1.',
        'We scale w and b so the closest points give exactly 1 or −1. This does not move the line. Each of those points then sits 1 / 5 = 0.2 from the line.',
        'The margin is 0.2, and the street is 2 / 5 = 0.4 wide. A smaller w would make a wider street.'
      ]
    },
    steps: [
      'Start with two groups of labelled points.',
      'Many lines can split them. Each one has a street of some width.',
      'Pick the line whose street is widest. The points on its edges are the support vectors.',
      'For overlapping data, allow a few points inside the street. This is the soft margin.',
      'For curved boundaries, use a kernel.'
    ],
    use: ['Medium-sized data with clear gaps between groups.', 'Many measurements per point but fewer examples.'],
    avoid: ['Very large data sets, where training gets slow.', 'When you need chances, not only a yes-or-no side.'],
    mistakes: [
      'Not putting measurements on the same size range. The street then depends on units.',
      'Setting the soft margin too loose or too tight. Tune it with cross-validation.',
      'Thinking all points matter. Only the points on the street edge set the line.'
    ],
    cheat: ['widest street wins', 'support vectors set the line', 'street width = 2 / length of w', 'soft margin for overlap', 'kernel for curves'],
    next: ['logistic', 'regular', 'crossval'],
    sources: ['Cortes and Vapnik, Support-vector networks, Machine Learning, 1995', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 12.2', 'scikit-learn documentation, Support Vector Machines user guide']
  },
  hier: {
    what: 'Hierarchical clustering builds groups from the bottom up. It starts with every item alone. Then it joins the two closest groups, again and again, until one group is left. The record of joins is a tree.',
    analogy: 'Think of a family tree read backward. Cousins join into one family, families join into a clan, and clans join into a tribe.',
    uses: ['Grouping genes that switch on and off together', 'Sorting shops into types by size, price and distance', 'Showing how close many items are in one tree picture'],
    before: ['kmeans', 'Distance between two points'],
    words: [
      ['cluster', 'A group of items that sit close together.'],
      ['linkage', 'The rule for measuring the distance between two groups. Average linkage uses the mean of all pair distances.'],
      ['dendrogram', 'A tree picture of the joins. Its height shows the distance at which each join happened.'],
      ['cut', 'A line drawn across the tree. The branches below it are the final groups.'],
      ['unsupervised', 'Learning with no answers given. The model finds the groups itself.']
    ],
    math: {
      lines: ['d(A, B) = \\frac{1}{|A|\\,|B|} \\sum_{a \\in A} \\sum_{b \\in B} d(a, b)'],
      symbols: [
        ['A, B', 'two groups of items'],
        ['a, b', 'one item from A and one item from B'],
        ['d(a, b)', 'the distance between two items'],
        ['|A|, |B|', 'how many items are in each group'],
        ['d(A, B)', 'the distance between the two groups: the average of every pair distance']
      ],
      example: [
        'This is a smaller example than the animation: four dots on a line, at 1, 2, 6 and 8.',
        'The closest pair is 1 and 2, only 1 apart. Join them at height 1.',
        'Next, 6 and 8 are 2 apart. The group {1, 2} is 4.5 from 6 and 6.5 from 8, which is further. Join 6 and 8 at height 2.',
        'Last, the two groups: the four pair distances are 5, 7, 4 and 6. Their average is 22 / 4 = 5.5. Join at height 5.5.',
        'The joins happened at 1, 2 and 5.5. Cutting at height 3 leaves two groups: {1, 2} and {6, 8}.'
      ]
    },
    steps: [
      'Start with every item as its own group.',
      'Find the two closest groups and join them.',
      'Measure distances again, using your linkage rule.',
      'Repeat until one group remains. Draw each join as a U in a tree.',
      'Cut the tree at a height to get the number of groups you want.'
    ],
    use: ['You want groups and also the story of how they nest.', 'You have a few hundred items or fewer, and a sensible distance.'],
    avoid: ['Huge data. Comparing every pair costs much time and memory.', 'Data where a wrong early join would hurt. Joins are never undone.'],
    mistakes: [
      'Choosing the linkage rule without looking. Nearest-pair linkage can chain groups into one long streak.',
      'Mixing measurements with different size ranges. The biggest numbers then rule the distance.',
      'Reading the left-to-right order of leaves as meaning. Only the heights carry meaning.'
    ],
    cheat: ['join the two closest groups', 'repeat until one group', 'tree height = distance at join', 'cut the tree to choose groups', 'long gap with no joins = natural cut'],
    next: ['kmeans', 'dbscan', 'pca'],
    sources: ['Ward, Hierarchical grouping to optimize an objective function, Journal of the American Statistical Association, 1963', 'Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2009, ch. 14.3.12', 'scikit-learn documentation, Clustering: hierarchical clustering', 'SciPy documentation, scipy.cluster.hierarchy.linkage']
  },
  dbscan: {
    what: 'DBSCAN finds clusters by looking for crowded places. A dot is in a crowd when enough other dots sit within a set radius. Crowds that touch join into one cluster. Dots in no crowd are called noise.',
    analogy: 'Picture people at a fair. Where many stand close together, a crowd forms. Crowds that touch merge. A lone person far away belongs to no crowd.',
    uses: ['Finding shapes such as rings or streaks that k-means misses', 'Spotting stray readings from a sensor', 'Grouping map locations, such as busy street corners'],
    before: ['kmeans'],
    words: [
      ['eps', 'The radius of the circle drawn around each dot.'],
      ['min points', 'How many dots a circle must hold, counting its centre, for the centre to be crowded.'],
      ['core dot', 'A dot whose circle holds at least min points dots.'],
      ['border dot', 'A dot that is not crowded itself but sits in a core dot’s circle.'],
      ['noise', 'A dot that is neither core nor border. It belongs to no cluster.'],
      ['cluster', 'A group of dots that sit close together.']
    ],
    math: {
      lines: ['N_{\\varepsilon}(p) = \\{\\, q : \\lVert p - q \\rVert \\le \\varepsilon \\,\\}', 'p \\text{ is a core dot if } |N_{\\varepsilon}(p)| \\ge \\text{minPts}'],
      symbols: [
        ['p, q', 'two dots'],
        ['\\varepsilon', 'eps, the radius of the circle'],
        ['N_{\\varepsilon}(p)', 'every dot within eps of p, including p itself'],
        ['\\lVert p - q \\rVert', 'the distance between p and q'],
        ['\\text{minPts}', 'the number of dots a crowd needs']
      ],
      example: [
        'This is a smaller example than the animation: six dots on a line at 1.0, 1.5, 2.0, 2.4, 5.0 and 9.0. Take eps = 0.6 and min points = 3.',
        'Dot 1.5 has 1.0, 1.5 and 2.0 within 0.6, so 3 dots. It is a core dot. Dot 2.0 has 1.5, 2.0 and 2.4, so it is core too.',
        'Dots 1.0 and 2.4 each have only 2 dots in their circle. They are not core, but each sits next to a core dot, so they are border dots.',
        'Dots 5.0 and 9.0 are alone in their circles. They are noise.',
        'The cluster is {1.0, 1.5, 2.0, 2.4}. Two dots are noise.'
      ]
    },
    steps: [
      'Pick eps and min points.',
      'Mark each dot as core, border or noise by counting dots in its circle.',
      'Start at a core dot not yet used and add every dot in its circle.',
      'Repeat from each new core dot until nothing new is reachable. That is one cluster.',
      'Start again from an unused core dot. Dots left over stay as noise.'
    ],
    use: ['Clusters have odd shapes or different sizes.', 'You expect stray points and want them set aside.'],
    avoid: ['Data where crowds differ a lot in density. One eps cannot fit all.', 'Data with many columns, where distances become less useful.'],
    mistakes: [
      'Picking eps by guess. Plot each dot’s distance to its few nearest neighbours and look for the bend.',
      'Forgetting to put measurements on the same size range first.',
      'Expecting every dot in a group. Noise is a normal result, not a failure.'
    ],
    cheat: ['eps = circle radius', 'min points = crowd size', 'core, border, noise', 'crowds that touch merge', 'no number of clusters needed'],
    next: ['kmeans', 'hier', 'anomaly'],
    sources: ['Ester, Kriegel, Sander, Xu, A density-based algorithm for discovering clusters in large spatial databases with noise, KDD, 1996', 'Schubert, Sander, Ester, Kriegel, Xu, DBSCAN revisited, revisited, ACM Transactions on Database Systems, 2017', 'scikit-learn documentation, Clustering: DBSCAN']
  },
  tsne: {
    what: 'A map made with t-SNE or UMAP squeezes items with many measurements onto a flat page. Items that were close stay close. The result lets you see clumps in data that has too many columns to draw.',
    analogy: 'Imagine moving a crowd of friends onto a small stage. Good friends must stand together. Strangers can stand anywhere apart.',
    uses: ['Drawing a map of word or image embeddings', 'Checking whether the groups you expect really exist', 'Exploring a new data set before choosing a model'],
    before: ['pca', 'embeddings'],
    words: [
      ['t-SNE', 'A method that makes a 2D map by matching neighbour scores. The t is for the Student t curve it uses.'],
      ['UMAP', 'A newer method with the same goal. It builds a graph of nearest neighbours and lays it flat.'],
      ['perplexity', 'A setting for t-SNE. It is roughly how many neighbours each item cares about.'],
      ['neighbour score', 'A number saying how close two items are. Higher means closer.'],
      ['embedding', 'A list of numbers that describes an item, such as a word or a picture.'],
      ['dimension', 'One column of measurement. Five columns means five dimensions.']
    ],
    math: {
      lines: ['p_{j|i} = \\frac{e^{-\\lVert x_i - x_j \\rVert^2 / 2\\sigma_i^2}}{\\sum_{k \\ne i} e^{-\\lVert x_i - x_k \\rVert^2 / 2\\sigma_i^2}}', 'q_{ij} = \\frac{(1 + \\lVert y_i - y_j \\rVert^2)^{-1}}{\\sum_{k \\ne l} (1 + \\lVert y_k - y_l \\rVert^2)^{-1}}'],
      symbols: [
        ['x_i', 'item i in the original many-column space'],
        ['y_i', 'item i on the flat map'],
        ['p_{j|i}', 'how strongly item i treats item j as a neighbour in the original space'],
        ['\\sigma_i', 'a width chosen for each item so its effective neighbour count equals the perplexity'],
        ['q_{ij}', 'the neighbour score on the map, using a heavy-tailed curve'],
        ['e', 'the number 2.718, used to turn distances into scores that fall off quickly']
      ],
      example: [
        'This is a smaller example than the animation. One item has three others at distances 1, 2 and 4. The width is 1.',
        'Gaussian scores: e^(-1/2) = 0.607, e^(-4/2) = 0.135, e^(-16/2) = 0.0003. They add to 0.743, so the shares are 0.82, 0.18 and 0.0005.',
        'On the map, the heavy-tailed curve gives 1 / (1 + d²): 0.5, 0.2 and 0.059. They add to 0.759, so the shares are 0.66, 0.26 and 0.08.',
        'The far item gets a share of 0.08 on the map but only 0.0005 in the original. The map lets it sit further away without a big penalty.',
        'That room is why clumps spread out instead of crowding together.'
      ]
    },
    steps: [
      'Score how close each pair of items is in the original columns.',
      'Place the items at random on a flat map.',
      'Score how close each pair is on the map.',
      'Nudge items so the map’s scores match the original scores. Repeat many times.',
      'Colour the map by known labels, if any, to check that groups stayed together.'
    ],
    use: ['You want to look at the shape of high-dimensional data.', 'You want a picture to check embeddings or clusters.'],
    avoid: ['Using distances or sizes between clumps as exact facts.', 'Using the map as the input for a model without checking.'],
    mistakes: [
      'Trusting the gaps between clumps. A wide gap on the map may be small in the data.',
      'Running it once. Different random starts and perplexities give different maps.',
      'Choosing a perplexity far larger than the real groups. The groups blur together.'
    ],
    cheat: ['keeps neighbours close', 'distances between clumps can mislead', 'perplexity = how many neighbours', 'run more than once', 'UMAP: same goal, graph based'],
    next: ['pca', 'kmeans', 'embeddings'],
    sources: ['van der Maaten and Hinton, Visualizing data using t-SNE, Journal of Machine Learning Research, 2008', 'McInnes, Healy, Melville, UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction, arXiv:1802.03426, 2018', 'scikit-learn documentation, Manifold learning: t-SNE', 'Wattenberg, Viegas, Johnson, How to use t-SNE effectively, Distill, 2016']
  },
  gmm: {
    what: 'A Gaussian mixture model describes data as a blend of several bell-shaped groups. Each group has a middle, a spread and a tilt. Every item gets a share for each group, so the groups are soft and can overlap.',
    analogy: 'Picture several lamps lighting a floor. Where two glows overlap, one spot belongs partly to each lamp.',
    uses: ['Grouping items whose groups are stretched or tilted', 'Telling how sure the model is about each item’s group', 'Spotting items that fit no group well'],
    before: ['kmeans', 'probability'],
    words: [
      ['Gaussian', 'A bell-shaped spread of values, high in the middle and low at the edges.'],
      ['mixture', 'A blend of several groups, each with its own weight.'],
      ['EM', 'Short for expectation and maximization. Two moves, repeated: share out each item, then refit each group.'],
      ['share', 'How much of an item belongs to one group. All the shares of an item add to 100%.'],
      ['fit score', 'How likely the model makes the data you saw. Statisticians call it the log-likelihood.'],
      ['BIC', 'A score that rewards a good fit but charges for each extra number the model uses. Lower is better.']
    ],
    math: {
      lines: ['r_{ik} = \\frac{w_k \\, N(x_i \\mid \\mu_k, \\Sigma_k)}{\\sum_j w_j \\, N(x_i \\mid \\mu_j, \\Sigma_j)}', '\\mu_k = \\frac{\\sum_i r_{ik}\\, x_i}{\\sum_i r_{ik}}', '\\text{BIC} = p \\ln n - 2 \\ln L'],
      symbols: [
        ['r_{ik}', 'the share of item i that belongs to group k'],
        ['w_k', 'the weight of group k: how big a part of the data it is'],
        ['N(x \\mid \\mu, \\Sigma)', 'the height of the bell for group k at item x'],
        ['\\mu_k', 'the middle of group k'],
        ['\\Sigma_k', 'the spread and tilt of group k'],
        ['p', 'how many numbers the model has to learn'],
        ['n', 'how many items there are'],
        ['\\ln L', 'the fit score']
      ],
      example: [
        'This is a smaller example than the animation: one column, two groups, and three items at 1, 3 and 6.',
        'Group A has middle 2 and group B has middle 5. Both have spread 1 and weight one half.',
        'For the item at 3: bell heights are 0.242 for A and 0.054 for B. The shares are 0.242 / 0.296 = 0.82 for A and 0.18 for B.',
        'The items at 1 and 6 give A shares 1.00 and 0.00.',
        'New middle for A = (1 x 1.00 + 3 x 0.82 + 6 x 0.00) / 1.82 = 1.90. New middle for B = 5.53.',
        'Repeat share and refit until the fit score stops rising.'
      ]
    },
    steps: [
      'Choose how many groups, K, and place K rough bells.',
      'E move: give each item a share for every bell.',
      'M move: refit each bell using those shares as weights.',
      'Repeat until the fit score stops rising.',
      'Compare BIC for several K and keep the lowest.'
    ],
    use: ['Groups overlap or are stretched.', 'You need shares, not hard labels.'],
    avoid: ['Groups that are not bell-shaped, such as rings.', 'Very small data with many groups. The fit becomes unstable.'],
    mistakes: [
      'Running once. EM can stop in a poor fit that depends on the start.',
      'Letting a bell shrink onto one item. Keep a small floor on its spread.',
      'Picking K by fit score alone. It always improves as K grows, so use BIC or a held-out check.'
    ],
    cheat: ['each group is a bell', 'E move: share out items', 'M move: refit the bells', 'repeat until steady', 'pick K with BIC (lower is better)'],
    next: ['kmeans', 'anomaly', 'hier'],
    sources: ['Dempster, Laird, Rubin, Maximum likelihood from incomplete data via the EM algorithm, Journal of the Royal Statistical Society B, 1977', 'Bishop, Pattern Recognition and Machine Learning, 2006, ch. 9.2', 'Schwarz, Estimating the dimension of a model, Annals of Statistics, 1978', 'scikit-learn documentation, Gaussian mixture models']
  },
  anomaly: {
    what: 'Anomaly detection finds items that are unusual. An isolation forest does this by cutting data with random lines. Odd items are cut off alone in few cuts, while ordinary items need many.',
    analogy: 'In a crowded hall, a person standing alone by the far wall is quick to point out. A person in the middle of the crowd takes many questions to single out.',
    uses: ['Spotting card payments that look unusual', 'Catching a sensor that has started to fail', 'Cleaning data by finding entries that may be typing errors'],
    before: ['tree', 'dbscan'],
    words: [
      ['anomaly', 'An item that is very different from most of the others.'],
      ['isolate', 'Cut the data until one item sits alone.'],
      ['path length', 'The number of cuts needed to isolate an item.'],
      ['score', 'A number from 0 to 1. Near 1 means likely odd. Around 0.5 means ordinary.'],
      ['threshold', 'The score at which you start to flag an item.']
    ],
    math: {
      lines: ['s(x, n) = 2^{-E[h(x)] / c(n)}', 'c(n) = 2\\,(\\ln(n - 1) + 0.5772) - \\frac{2(n - 1)}{n}'],
      symbols: [
        ['x', 'one item'],
        ['n', 'the number of items used to build each tree'],
        ['h(x)', 'the path length of x in one tree'],
        ['E[h(x)]', 'the average path length over all trees'],
        ['c(n)', 'a typical path length for n items, used to put scores on a common scale'],
        ['s', 'the score, between 0 and 1']
      ],
      example: [
        'This is a smaller example than the animation: n = 8 items.',
        'c(8) = 2 x (ln 7 + 0.5772) - 14 / 8 = 2 x 2.523 - 1.75 = 3.30.',
        'An item with an average path length of 1.5 scores 2^(-1.5 / 3.30) = 0.73. It is likely odd.',
        'An item with an average path length of 3.30 scores 2^(-1) = 0.50. It is ordinary.',
        'An item with an average path length of 5 scores 2^(-5 / 3.30) = 0.35. It is deep in the crowd.'
      ]
    },
    steps: [
      'Build many trees. In each, cut at a random axis and a random place.',
      'Count the cuts needed to isolate each item. That is its path length.',
      'Average the path length for each item over all trees.',
      'Turn the average into a score from 0 to 1.',
      'Flag items whose score is above your threshold, then look at them.'
    ],
    use: ['You have no labels for what is odd.', 'You want a fast method that scales to large data.'],
    avoid: ['When odd items cluster together. They then need many cuts too.', 'When you need a reason for each flag. The score alone does not explain it.'],
    mistakes: [
      'Treating a flag as proof. It only says the item is unusual.',
      'Setting the threshold with no thought of cost. A review takes time, and a miss can cost more.',
      'Using columns that mean nothing. They add noise to the cuts.'
    ],
    cheat: ['odd items are cut off in few cuts', 'short path = odd, long path = ordinary', 'score near 1 = odd, near 0.5 = ordinary', 'average over many trees', 'flag means look, not guilty'],
    next: ['tree', 'dbscan', 'gmm'],
    sources: ['Liu, Ting, Zhou, Isolation Forest, IEEE International Conference on Data Mining, 2008', 'Liu, Ting, Zhou, Isolation-based anomaly detection, ACM Transactions on Knowledge Discovery from Data, 2012', 'scikit-learn documentation, Novelty and outlier detection: isolation forest']
  }
};
if (typeof module !== 'undefined') module.exports = { AI_ABOUT_ML };
