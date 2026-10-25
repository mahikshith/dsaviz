// About-this-lesson content for the AI now track. Our own writing; facts checked against the sources listed per lesson.
const AI_ABOUT_NOW = {
  attention: {
    what: 'Attention is how a model lets each word look at the other words in a sentence. It scores how much each word matters, then mixes in the useful ones. This is the main idea inside a transformer, the kind of model behind most chatbots.',
    analogy: 'Think of a classroom where a student must answer a question. The student glances at every classmate and listens most to the ones who know the answer.',
    uses: ['Chatbots use it to work out what a word like "it" refers to.', 'Translation tools use it to match words in one language to words in another.', 'Code assistants use it to link a variable to where it was first defined.'],
    before: ['tokens', 'embeddings'],
    words: [
      ['token', 'A small piece of text, often a word or part of a word.'],
      ['embedding', 'A list of numbers that stands for the meaning of a token.'],
      ['query', 'A list of numbers that says what one token is looking for.'],
      ['key', 'A list of numbers that says what another token contains, so it can be matched.'],
      ['value', 'The information a token hands over when another token pays attention to it.'],
      ['softmax', 'A step that turns any scores into weights that are positive and add up to 1.'],
      ['head', 'One run of attention. Several heads run side by side, and each can look for a different link.'],
      ['layer', 'One round of attention and other steps. A transformer stacks many layers.']
    ],
    math: {
      lines: ['\\mathrm{softmax}\\!\\left(\\frac{Q K^{T}}{\\sqrt{d}}\\right)V'],
      symbols: [
        ['Q', 'The queries: what each token is looking for.'],
        ['K', 'The keys: what each token offers to be matched with.'],
        ['V', 'The values: the information each token passes on.'],
        ['K^T', 'The keys turned on their side. This lines up the numbers so each query can be multiplied with every key.'],
        ['d', 'How many numbers are in each query and key.'],
        ['\\sqrt{d}', 'The square root of d. Dividing by it keeps the scores from growing too big.'],
        ['softmax', 'Turns the scores into weights that add up to 1.']
      ],
      example: [
        'This is a smaller made-up example than the animation: one token meets three tokens, not ten.',
        'Let one token have the query [1, 1, 1, 1]. So d = 4 and the square root of d is 2.',
        'Multiply the query with each key and add up the products. The scores are 1, 2 and 4.',
        'Divide each score by 2. This gives 0.5, 1 and 2.',
        'Softmax turns these into weights: about 0.14, 0.23 and 0.63. They add up to 1.',
        'The three values are 10, 20 and 40. The mix is 0.14 x 10 + 0.23 x 20 + 0.63 x 40, which is about 31.2.'
      ]
    },
    steps: [
      'Each token makes a query, a key and a value from its embedding.',
      'A token compares its query with every key. A good match gives a high score.',
      'Softmax turns the scores into weights that add up to 1.',
      'The token takes a weighted mix of all the values. Its meaning now carries some of the others.',
      'Several heads do this side by side, and every token does it at the same time.'
    ],
    use: ['Use it when the meaning of one piece depends on others far away.', 'Use it for text, code, images and sound, once they are cut into tokens.'],
    avoid: ['Avoid it on very long inputs without tricks. Double the length and the work grows four times.', 'Avoid it when a small, simple model already does the job.'],
    mistakes: [
      'Attention weights are not a full explanation of the answer. They show where the model looked, not why it answered.',
      'The model does not read words one by one. Attention lets it read all tokens at once.',
      'A long input is not always used well. Facts in the middle of a long input can get missed.'
    ],
    cheat: ['Query asks, key answers, value is the content.', 'Score, divide by the square root of d, softmax, then mix.', 'Weights are positive and add up to 1.', 'Cost grows with the square of the length.', 'Heads are several attention runs in parallel.'],
    next: ['vit', 'systems', 'moe'],
    sources: ['Vaswani, Shazeer, Parmar et al., "Attention Is All You Need", 2017. https://arxiv.org/abs/1706.03762', 'Dao, Fu, Ermon, Rudra, Re, "FlashAttention", 2022. https://arxiv.org/abs/2205.14135', 'Liu, Lin, Hewitt et al., "Lost in the Middle", 2023. https://arxiv.org/abs/2307.03172']
  },

  systems: {
    what: 'Some models answer at once. Reasoning models first write out steps, then answer. Writing steps costs more time, but it often gives better answers on hard problems.',
    analogy: 'Compare giving the first answer that comes to mind with working it out on scrap paper. The scrap paper takes longer, and it catches silly mistakes.',
    uses: ['Math and logic problems, where each step builds on the last.', 'Writing and fixing computer code, where the model can check its own work.', 'Planning tasks with many steps, such as booking a trip around several limits.'],
    before: ['tokens'],
    words: [
      ['System 1', 'A name from psychology for thinking that is fast and automatic. The animation draws it as the fast lane.'],
      ['System 2', 'A name from psychology for thinking that is slow and careful. The animation draws it as the slow lane.'],
      ['reasoning model', 'A model trained to write out steps before it gives its answer.'],
      ['test-time compute', 'Extra computer work a model does while answering, not while it is being trained.'],
      ['token', 'A small piece of text, often a word or part of a word. Written steps are made of tokens.'],
      ['distillation', 'Training a fast model to copy the answers of a slower one.']
    ],
    math: {
      lines: ['x + (x + 1.00) = 1.10'],
      symbols: [
        ['x', 'The price of the pen, which we want to find.'],
        ['x + 1.00', 'The price of the book, which costs 1.00 more than the pen.'],
        ['1.10', 'The total price of the pen and book together, in dollars.']
      ],
      example: [
        'This is the same puzzle as the animation. A pen and a book cost 1.10 dollars together. The book costs 1.00 more than the pen.',
        'A fast guess says the pen costs 0.10. Then the book costs 1.10, and the total is 1.20. That is wrong.',
        'Write it out: x + x + 1.00 = 1.10. Take away 1.00 from both sides. Then two times x equals 0.10.',
        'Divide by 2. The pen costs x = 0.05, and the book costs 1.05.',
        'Check: 0.05 + 1.05 = 1.10. The slow, careful way gets it right.'
      ]
    },
    steps: [
      'A plain model gives its answer in one pass, like a quick reflex.',
      'A reasoning model first writes out steps, using extra tokens (small pieces of text) as scrap paper.',
      'Each step gives the model something to check and build on.',
      'More thinking helps on hard problems up to a point. Then the gains flatten.',
      'Distillation can teach a fast model to copy the careful answers.'
    ],
    use: ['Use thinking steps for hard math, code and planning.', 'Use a quick answer for easy questions, where extra steps add cost but little gain.'],
    avoid: ['Avoid long thinking for simple lookups, because it wastes time and money.', 'Avoid trusting the written steps blindly. They can look fine and still hide a mistake.'],
    mistakes: [
      'Models do not have two real brains. System 1 and System 2 are only a picture to help you think.',
      'More thinking is not always better. The gains flatten, and easy questions need little.',
      'Longer steps do not fix a wrong fact. If the model starts from a false fact, more steps can repeat the mistake.'
    ],
    cheat: ['System 1 is fast. System 2 is slow and careful.', 'Reasoning models write steps before answering.', 'Extra steps cost tokens and time.', 'Gains flatten as the budget grows.', 'Distillation turns slow habits into quick ones.'],
    next: ['agents', 'distill', 'evals'],
    sources: ['Kahneman, "Thinking, Fast and Slow", 2011, for the System 1 and System 2 idea.', 'Wei, Wang, Schuurmans et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", 2022. https://arxiv.org/abs/2201.11903', 'Snell, Lee, Xu, Kumar, "Scaling LLM Test-Time Compute Optimally...", 2024. https://arxiv.org/abs/2408.03314', 'DeepSeek-AI, "DeepSeek-R1", 2025. https://arxiv.org/abs/2501.12948', 'Yu, Xu, Weston, Kulikov, "Distilling System 2 into System 1", 2024. https://arxiv.org/abs/2407.06023']
  },

  jepa: {
    what: 'JEPA is a way to teach a model about the world from pictures or video without labels. Part of the picture is hidden. The model guesses a short summary of the hidden part, not its pixels.',
    analogy: 'If a friend covers part of a photo, you say "a tree is there". You do not try to name every leaf.',
    uses: ['Learning useful picture summaries from images that nobody has labelled.', 'Learning what happens in video, such as how objects move.', 'Helping robots predict what their next move would do.'],
    before: ['embeddings', 'vit'],
    words: [
      ['encoder', 'A part of the model that turns a picture piece into a list of numbers.'],
      ['embedding', 'A list of numbers that stands for the meaning of something.'],
      ['predictor', 'A part of the model that guesses one list of numbers from another.'],
      ['generative model', 'A model that makes new content, such as painting every pixel of a picture.'],
      ['self-supervised', 'Learning from the data itself, with no labels from people. For example, hide a word in a sentence and learn to guess it.'],
      ['world model', 'A model that predicts what will happen next. A robot with one can imagine a move before it makes it.']
    ],
    math: {
      lines: ['L = \\sum_i \\left(\\hat{s}_i - s_i\\right)^2'],
      symbols: [
        ['L', 'The loss: one number that says how wrong the guess is.'],
        ['\\hat{s}', 'The guess: the predicted list of numbers for the hidden part.'],
        ['s', 'The answer key: the target encoder list of numbers for the hidden part.'],
        ['\\sum_i', 'Add up the result for every number i in the list.'],
        ['(\\hat{s}_i - s_i)^2', 'The gap between guess and answer for one number, multiplied by itself.']
      ],
      example: [
        'This is a made-up example with two numbers. Real lists are much longer.',
        'Say the answer key for a hidden block is s = [0.5, 0.4].',
        'The predictor guesses [0.6, 0.2].',
        'The gaps are 0.6 - 0.5 = 0.1, and 0.2 - 0.4 = -0.2.',
        'Square each gap: 0.01 and 0.04. Add them: the loss is 0.05.',
        'Training changes the model so this loss gets smaller. No pixel is ever compared.'
      ]
    },
    steps: [
      'Cut the picture into patches and hide a block of them.',
      'A context encoder turns the visible patches into a list of numbers.',
      'A target encoder turns the hidden block into a list of numbers. This is the answer key. It is used only in training, when the full picture is known.',
      'A predictor guesses the answer key from the visible patches.',
      'The loss compares the two lists, not pixels. Training makes the guess closer.'
    ],
    use: ['Use it to learn picture or video summaries without labels.', 'Use it when exact pixel detail does not matter, only the main idea.'],
    avoid: ['Avoid it when you need the model to draw the missing pixels.', 'Avoid treating it as proven better than generating. The evidence so far is mostly vision and robotics.'],
    mistakes: [
      'JEPA does not make pictures. It predicts a summary, so it cannot paint the hidden part.',
      'The target is not a human label. The target encoder makes it from the picture itself.',
      'JEPA is not the only way to build smart models. It is one research idea, and the question is still open.'
    ],
    cheat: ['Hide a block, guess its summary.', 'Compare summaries, not pixels.', 'Context encoder, target encoder, predictor.', 'I-JEPA is for images. V-JEPA is for video.', 'No hand-made label is needed.'],
    next: ['vit', 'diffusion', 'evals'],
    sources: ['Assran, Duval, Misra, Bojanowski et al., "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture", 2023. https://arxiv.org/abs/2301.08243', 'LeCun, "A Path Towards Autonomous Machine Intelligence", 2022. https://openreview.net/forum?id=BZ5a1r-kVsf', 'Bardes, Garrido, Ponce, Chen et al., "Revisiting Feature Prediction for Learning Visual Representations from Video", 2024. https://arxiv.org/abs/2404.08471', 'Assran, Bardes, Fan, Garrido et al., "V-JEPA 2", 2025. https://arxiv.org/abs/2506.09985']
  },

  rag: {
    what: 'RAG stands for retrieval-augmented generation, which means look it up first, then write. The system finds passages that fit your question. Then the model writes its answer using those passages.',
    analogy: 'It is an open-book exam. You find the right pages first, then write your answer from them.',
    uses: ['Company help bots that answer from the latest policy documents.', 'Search tools that answer in a sentence and point to the source.', 'Study helpers that answer from your own notes.'],
    before: ['embeddings', 'attention'],
    words: [
      ['retrieve', 'To look up and fetch the passages that best fit the question.'],
      ['chunk', 'A small piece cut from a longer document.'],
      ['embedding', 'A list of numbers that stands for the meaning of a piece of text.'],
      ['index', 'A store of embeddings that can be searched for the closest ones. It is also called a vector index.'],
      ['closest by meaning', 'Two lists of numbers that point almost the same way. Maths scores this with cosine similarity, from -1 to 1.'],
      ['prompt', 'The text you send to the model, such as your question plus any pasted notes.'],
      ['hallucination', 'A confident answer from a model that is wrong or made up.']
    ],
    math: {
      lines: ['\\cos(a, b) = \\frac{a \\cdot b}{\\lVert a \\rVert \\, \\lVert b \\rVert}'],
      symbols: [
        ['a', 'The list of numbers for the question.'],
        ['b', 'The list of numbers for one chunk.'],
        ['\\cos(a, b)', 'Cosine similarity: the score for how close in meaning the question and the chunk are. 1 is closest.'],
        ['a \\cdot b', 'Multiply the lists number by number, then add up the products.'],
        ['\\lVert a \\rVert', 'The length of list a: the square root of the sum of its squares.']
      ],
      example: [
        'This is a smaller example than the animation: lists of two numbers, not hundreds.',
        'Let the question be a = [3, 4]. Its length is 5, since 9 + 16 = 25.',
        'Chunk 1 is [4, 3]. The products add up to 12 + 12 = 24. Its length is also 5.',
        'The score is 24 / (5 x 5) = 0.96. These point almost the same way, so it is a close match.',
        'Chunk 2 is [1, 0]. The score is 3 / (5 x 1) = 0.6. Chunk 3 is [-4, 3]. Its score is 0.',
        'Chunk 1 ranks first, so it is pasted into the prompt. Real embeddings are longer lists, but the steps are the same.'
      ]
    },
    steps: [
      'Before any question, cut your documents into chunks and turn each into an embedding.',
      'Store the embeddings in an index.',
      'When a question arrives, turn it into an embedding too.',
      'Retrieve the chunks closest in meaning from the index.',
      'Paste them into the prompt. The model answers from them and names which chunk each fact came from.'
    ],
    use: ['Use it for fresh or private facts the model never saw in training.', 'Use it when you want answers that point to a source.'],
    avoid: ['Avoid it when the answer needs no outside facts, such as rewording a sentence.', 'Avoid trusting it when the documents are wrong or out of date.'],
    mistakes: [
      'RAG does not retrain the model. You update the documents, and the model stays the same.',
      'Retrieval can miss. If the right chunk is not fetched, the model may still guess.',
      'Cutting chunks badly can split a fact in two, so neither piece holds the whole fact.'
    ],
    cheat: ['Retrieve first, generate second.', 'Chunks become embeddings in an index.', 'Closest chunks go into the prompt.', 'Update the index, not the model.', 'Quality depends on chunking and retrieval.'],
    next: ['agents', 'evals', 'moe'],
    sources: ['Lewis, Perez, Piktus, Petroni et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", 2020. https://arxiv.org/abs/2005.11401', 'Asai, Wu, Wang, Sil et al., "Self-RAG", 2023. https://arxiv.org/abs/2310.11511', 'Anthropic, "Contextual retrieval in AI systems", 2024. https://www.anthropic.com/research/contextual-retrieval', 'Liu, Lin, Hewitt et al., "Lost in the Middle", 2023. https://arxiv.org/abs/2307.03172']
  },

  agents: {
    what: 'An agent is a model that works in a loop. It thinks, uses a tool, reads what came back, and repeats until the goal is met. MCP is an open standard that lets tools plug into many apps.',
    analogy: 'A handyman fixes a leak by trying something, looking at the result, and trying the next step. He stops when the leak is gone.',
    uses: ['Coding helpers that run tests, read files and fix bugs.', 'Research helpers that search, read pages and write a summary.', 'Office helpers that look up a calendar and book a meeting.'],
    before: ['systems', 'rag'],
    words: [
      ['tool', 'A small program the model can ask the computer to run, such as search or run tests.'],
      ['tool call', 'A short message in a fixed format. It names a tool and gives its inputs.'],
      ['observation', 'What a tool sends back after it runs.'],
      ['workflow', 'A fixed list of steps written in code, with no choices made by the model.'],
      ['MCP', 'The Model Context Protocol: one open standard for connecting apps to tools and data.']
    ],
    math: {
      lines: ['N \\times M \\quad \\mathrm{versus} \\quad N + M'],
      symbols: [
        ['N', 'The number of apps that want to use tools.'],
        ['M', 'The number of tools or data sources.'],
        ['N \\times M', 'The connectors needed if each app needs its own link to each tool.'],
        ['N + M', 'The pieces needed if every app and every tool speaks one shared standard.']
      ],
      example: [
        'This matches the last part of the animation. Say 3 apps want to use 3 tools.',
        'Without a standard, each pair needs its own connector: 3 x 3 = 9.',
        'With one shared standard, each app and each tool speaks it once: 3 + 3 = 6.',
        'Now take 5 apps and 4 tools. Custom links need 5 x 4 = 20. A shared standard needs 5 + 4 = 9.',
        'The gap grows as both numbers grow, which is why a shared standard helps.'
      ]
    },
    steps: [
      'You give the agent a goal.',
      'The model thinks about what to do next and picks a tool.',
      'It sends a tool call. The tool runs and returns an observation.',
      'The model reads the observation, thinks again, and picks the next action.',
      'It stops when the goal is met, or when it hits a limit you set.'
    ],
    use: ['Use an agent when the steps cannot be known in advance.', 'Use a plain workflow first when the steps are fixed, because it is simpler and cheaper.'],
    avoid: ['Avoid giving an agent access to many things. Give each tool only what it needs.', 'Avoid unchecked actions that cannot be undone, such as deleting data or sending money.'],
    mistakes: [
      'An agent is not a new kind of model. It is a model used in a loop with tools.',
      'MCP is not an agent. It is only a standard way to connect tools and data.',
      'Tool results can hide instructions meant to trick the model. An example is a page that says "ignore your goal". Treat results as data, and keep a person in charge.'
    ],
    cheat: ['Think, act, observe, repeat.', 'A tool call is a short message in a fixed format.', 'Workflow: fixed steps. Agent: chooses its own.', 'MCP: one standard, many apps and tools.', 'Limit access and check risky actions.'],
    next: ['rag', 'evals', 'systems'],
    sources: ['Yao, Zhao, Yu, Du et al., "ReAct", 2022. https://arxiv.org/abs/2210.03629', 'Schick, Dwivedi-Yu, Dessi et al., "Toolformer", 2023. https://arxiv.org/abs/2302.04761', 'Anthropic, "Building effective AI agents", 2024. https://www.anthropic.com/research/building-effective-agents', 'Model Context Protocol specification, version 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28', 'Jimenez, Yang, Wettig, Yao et al., "SWE-bench", 2023. https://arxiv.org/abs/2310.06770']
  },

  moe: {
    what: 'A mixture of experts keeps many small expert blocks inside one model. A router picks only a few of them for each token. So the model can hold a lot of knowledge but do little work per token.',
    analogy: 'A hospital has many specialist doctors. The front desk sends you to the two you need, so not every doctor sees every patient.',
    uses: ['Large language models that must be strong but still fast to run.', 'Models like Mixtral, an open model that picks 2 of 8 experts for each token.', 'Very large research models that would be too costly if every part ran for every token.'],
    before: ['attention'],
    words: [
      ['expert', 'One of several smaller blocks of weights inside a layer.'],
      ['router', 'A small part that scores the experts and picks which ones run.'],
      ['top-k', 'Keep only the k highest scores. With k = 2, only the two best experts run.'],
      ['layer', 'One stage of the model. Tokens pass through many layers, one after another.'],
      ['weights', 'The numbers inside a model that training sets.'],
      ['token', 'A small piece of text, often a word or part of a word.'],
      ['load balancing', 'A nudge in training that spreads tokens evenly over the experts.']
    ],
    math: {
      lines: ['y = \\sum_{i \\in \\mathrm{top}\\text{-}k} g_i \\, E_i(x)'],
      symbols: [
        ['x', 'The token that is being processed.'],
        ['E_i(x)', 'The output of expert number i for this token.'],
        ['g_i', 'The router weight for expert i. The chosen weights add up to 1.'],
        ['\\sum', 'Add up the results for every chosen expert.'],
        ['y', 'The final output for the token.']
      ],
      example: [
        'This is a smaller example than the animation: only the top 2 experts are scored.',
        'The router scores 8 experts for one token and keeps the top 2. Their scores are 2.0 and 1.0.',
        'Softmax uses the number e, about 2.718. e^2 means e times e, about 7.39, and e^1 is about 2.72. The sum is about 10.11.',
        'The weights are 7.39 / 10.11 = 0.73 and 2.72 / 10.11 = 0.27.',
        'Suppose expert A outputs 10 and expert B outputs 20.',
        'The mix is 0.73 x 10 + 0.27 x 20, which is about 12.7. The other 6 experts did no work.'
      ]
    },
    steps: [
      'Replace one big block of weights with several smaller experts.',
      'A router scores every expert for the current token.',
      'Only the top few experts run for that token.',
      'Their outputs are mixed, weighted by the router scores.',
      'Training adds a nudge so that tokens spread over all experts.'
    ],
    use: ['Use it when you want a big model but a low cost per token.', 'Use it when you have enough memory to store all the experts.'],
    avoid: ['Avoid it on small devices with little memory, because all experts must be stored.', 'Avoid it when load balancing is hard to get right and a small plain model is enough.'],
    mistakes: [
      'Experts do not each own a clear topic like "math" or "French". Their jobs are mixed and hard to name.',
      'Using few experts per token does not mean less memory. All experts must still be stored.',
      'The model does not pick one expert for the whole sentence. The router chooses again for every token.'
    ],
    cheat: ['Many experts stored, few used per token.', 'The router scores and picks the top k.', 'Outputs are mixed by router weights.', 'Memory cost is high. Work per token is low.', 'Load balancing stops one expert getting everything.'],
    next: ['lora', 'distill', 'evals'],
    sources: ['Shazeer, Mirhoseini, Maziarz, Davis et al., "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", 2017. https://arxiv.org/abs/1701.06538', 'Fedus, Zoph, Shazeer, "Switch Transformers", 2021. https://arxiv.org/abs/2101.03961', 'Jiang, Sablayrolles, Roux, Mensch et al., "Mixtral of Experts", 2024. https://arxiv.org/abs/2401.04088']
  },

  lora: {
    what: 'LoRA is a cheap way to fine-tune a big model, which means teaching it a new job. You freeze the original weights and train two thin matrices, which are grids of numbers, beside them. Multiplied together, they make a small learned correction.',
    analogy: 'Instead of rewriting a whole textbook, you stick a few notes on the pages. The book stays the same, and the notes change the lesson.',
    uses: ['Teaching a model to answer in a company writing style.', 'Adapting a model to a field such as law or medicine with little hardware.', 'Keeping many small adapter files for one base model, one per task.'],
    before: ['backprop', 'attention'],
    words: [
      ['weights', 'The numbers inside a model that training adjusts.'],
      ['matrix', 'A grid of numbers arranged in rows and columns.'],
      ['fine-tuning', 'Training a model that is already trained, to do a new job.'],
      ['frozen', 'Not changed during training.'],
      ['rank', 'How thick the two thin matrices are. Written r.'],
      ['adapter', 'The small set of new numbers that LoRA trains.'],
      ['QLoRA', 'LoRA on a base model stored with tiny 4-bit numbers, so it fits on a smaller graphics card.']
    ],
    math: {
      lines: ['h = W x + B A x', '\\text{trainable numbers} = 2 \\times d \\times r'],
      symbols: [
        ['x', 'The input going into the layer.'],
        ['W', 'The original big matrix of weights. It stays frozen.'],
        ['B, A', 'The two thin matrices that are trained. Multiplied together, they match the size of W.'],
        ['h', 'The output of the layer: the old answer plus a small correction.'],
        ['d', 'The number of rows and of columns in W.'],
        ['r', 'The rank: how thick the thin matrices are.']
      ],
      example: [
        'This is the same size as the animation. Say W is a grid of 4096 by 4096 numbers. Full fine-tuning trains 4096 x 4096 = 16,777,216 of them.',
        'LoRA with rank r = 4 trains two thin matrices. Each has 4096 x 4 = 16,384 numbers.',
        'Together that is 2 x 16,384 = 32,768 trainable numbers.',
        'Divide: 16,777,216 / 32,768 = 512. That is 512 times fewer for this one matrix.',
        'After training, add the correction into W once. The tuned model then runs as fast as before.'
      ]
    },
    steps: [
      'Start with a trained model and freeze its weights.',
      'Add two thin matrices next to a big weight matrix.',
      'During training, only the two thin matrices change.',
      'The layer output is the old answer plus the small correction.',
      'Save only the small adapter. It can be swapped per task or merged into W.'
    ],
    use: ['Use it when you have little memory or few examples.', 'Use it when you want many task versions of one base model.'],
    avoid: ['Avoid it when you need to teach the model a great deal of new knowledge from scratch.', 'Avoid a rank that is too small for a hard task, since it may not learn enough.'],
    mistakes: [
      'LoRA does not shrink the base model. The big weights are still needed to run it.',
      'Higher rank is not always better. It costs more and may not help.',
      'The frozen weights are not retrained. Only the adapter learns.'
    ],
    cheat: ['Freeze W, train two thin matrices.', 'Output = old answer + small correction.', 'Rank r sets how many numbers you train.', 'Adapters are small files.', 'QLoRA = LoRA on a base model stored in tiny 4-bit numbers.'],
    next: ['prefs', 'distill', 'moe'],
    sources: ['Hu, Shen, Wallis, Allen-Zhu et al., "LoRA: Low-Rank Adaptation of Large Language Models", 2021. https://arxiv.org/abs/2106.09685', 'Dettmers, Pagnoni, Holtzman, Zettlemoyer, "QLoRA", 2023. https://arxiv.org/abs/2305.14314']
  },

  tokens: {
    what: 'A model reads numbers, not letters. So text is cut into pieces called tokens, and each token gets a number. Byte-pair encoding is a way to choose good pieces by merging common neighbours.',
    analogy: 'Think of building words from letter tiles. If two tiles always sit together, you glue them into one bigger tile.',
    uses: ['Every chatbot cuts your message into tokens before it reads it.', 'Prices and length limits for models are counted in tokens.', 'Translation and search tools use tokens to handle rare or new words.'],
    before: ['embeddings'],
    words: [
      ['token', 'A piece of text that gets its own number, called an id.'],
      ['vocabulary', 'The full list of tokens a model knows.'],
      ['merge', 'A rule that glues two neighbouring tokens into one new token.'],
      ['byte', 'A basic unit of stored data. One plain letter takes one byte.'],
      ['byte-pair encoding', 'A method that builds the vocabulary by repeated merges of the most common pair of neighbours. Pairs are counted in bytes or letters.'],
      ['subword', 'A token that is smaller than a word but bigger than a letter.']
    ],
    math: {
      lines: ['V = V_0 + m'],
      symbols: [
        ['V', 'The final vocabulary size: how many tokens exist.'],
        ['V_0', 'The starting tokens, such as single letters.'],
        ['m', 'The number of merges you did. Each merge adds one new token.']
      ],
      example: [
        'This is the same practice text as the animation: play (5 times), played (3), playing (4), player (2), plays (3) and replay (2). Start from single letters.',
        'The starting tokens are 11 letters: p, l, a, y, e, d, i, n, g, r and s. So V_0 = 11.',
        'Count neighbouring pairs, weighted by how often each word appears. "p l" appears 5 + 3 + 4 + 2 + 3 + 2 = 19 times. So do "l a" and "a y".',
        'Merge "p" and "l" into the new token "pl". Count again: "pl a" appears 19 times, so merge it into "pla".',
        'Then "pla y" also appears 19 times, so merge it into "play". After 3 merges, V = 11 + 3 = 14.'
      ]
    },
    steps: [
      'Start with single letters as the tokens, and count how often each word appears.',
      'Count every pair of neighbouring tokens.',
      'Merge the most common pair into one new token.',
      'Repeat for as many merges as you want.',
      'To read a new word, apply the merges in order. A rare word falls back to smaller pieces.'
    ],
    use: ['Use subword tokens to cover rare and new words with a small vocabulary.', 'Use token counts to estimate cost and fit inside a length limit.'],
    avoid: ['Avoid one token per whole word, because new words have no id.', 'Avoid one token per letter, because the rows get very long.'],
    mistakes: [
      'A token is not always a word. It can be part of a word, a space or a symbol.',
      'The same text can make a different number of tokens in another language or another model.',
      'Tokens are not meaning. The model learns meaning later, from the embeddings.'
    ],
    cheat: ['Text becomes tokens, then numbers.', 'Merge the most common pair, then repeat.', 'Vocabulary = starting tokens + merges.', 'Rare words split into smaller pieces.', 'Cost and limits are counted in tokens.'],
    next: ['attention', 'vit', 'prefs'],
    sources: ['Sennrich, Haddow, Birch, "Neural Machine Translation of Rare Words with Subword Units", 2015 (ACL 2016). https://arxiv.org/abs/1508.07909']
  },

  distill: {
    what: 'Distillation trains a small model to copy a big one. The student learns from the teacher\'s full list of chances, not only the right answer. That extra detail helps it learn more from the same data.',
    analogy: 'A teacher who says "mostly A, a little B" teaches more than one who only says "A".',
    uses: ['Making a model small enough to run on a phone.', 'Making a fast, cheap model that keeps most of a large model\'s skill, as DistilBERT did.', 'Teaching a fast model to copy the careful answers of a slow reasoning model.'],
    before: ['backprop', 'logistic'],
    words: [
      ['teacher', 'The big, accurate model that is copied.'],
      ['student', 'The small model that learns from the teacher.'],
      ['soft target', 'The full list of chances from the teacher, such as cat 70%, tiger 25%, car 5%.'],
      ['hard label', 'Only the right answer, as 100% for one class and 0% for the rest.'],
      ['temperature', 'A setting T that makes the chances softer when it is larger.'],
      ['softmax', 'A step that turns a list of scores into chances that add up to 100%.'],
      ['KL divergence', 'A score for how far one set of chances is from another. 0 means they match.']
    ],
    math: {
      lines: ['q_i = \\frac{e^{z_i / T}}{\\sum_j e^{z_j / T}}'],
      symbols: [
        ['z_i', 'The raw score the teacher gives to class i, before it becomes a chance.'],
        ['T', 'The temperature. Scores are divided by it. A larger T gives softer chances.'],
        ['e^{x}', 'The number e (about 2.72) raised to the power x. It is always positive.'],
        ['\\sum_j', 'Add up the same thing for every class j.'],
        ['q_i', 'The chance given to class i. All chances add up to 1.']
      ],
      example: [
        'This is the same teacher as the animation: five classes, with scores cat 6, tiger 3.5, dog 3, car −1 and banana −2.',
        'The score "e to the power x" means e (about 2.72) multiplied by itself x times. Softmax gives each class e to its score, divided by the total.',
        'With T = 1, the chances are about 0.883, 0.072, 0.044, 0.001 and 0.000 for cat, tiger, dog, car and banana. The answer is very sharp.',
        'With T = 4, divide the scores by 4 first: 1.5, 0.875, 0.75, −0.25 and −0.5. The chances become about 0.432, 0.231, 0.204, 0.075 and 0.058.',
        'Now you can see that a cat looks more like a tiger than like a car. The student is trained to match these soft chances, and also to get the true label right.'
      ]
    },
    steps: [
      'Train or choose a big, accurate teacher model.',
      'Run the teacher on the training examples and keep its chances for every class.',
      'Soften the chances by dividing the scores by a temperature T.',
      'Train the small student to match the soft chances and the true label.',
      'Use the student, which is smaller and faster than the teacher.'
    ],
    use: ['Use it when the big model is too slow or costly to run.', 'Use it to move careful habits of a slow model into a fast one.'],
    avoid: ['Avoid expecting the student to beat the teacher. It rarely does.', 'Avoid training on a model\'s outputs if its licence forbids it. Check the terms first.'],
    mistakes: [
      'Distillation is not copying weights. The student learns from the outputs of the teacher.',
      'A very high temperature is not always better. It can wash out the useful differences.',
      'A smaller model does not keep everything. It keeps most of the skill, not all.'
    ],
    cheat: ['Teacher big, student small.', 'Learn from soft chances, not only labels.', 'Temperature T softens the chances.', 'Loss mixes soft targets and the true label.', 'Student rarely beats the teacher.'],
    next: ['lora', 'systems', 'evals'],
    sources: ['Hinton, Vinyals, Dean, "Distilling the Knowledge in a Neural Network", 2015. https://arxiv.org/abs/1503.02531', 'Sanh, Debut, Chaumond, Wolf, "DistilBERT", 2019. https://arxiv.org/abs/1910.01108', 'Yu, Xu, Weston, Kulikov, "Distilling System 2 into System 1", 2024. https://arxiv.org/abs/2407.06023']
  },

  evals: {
    what: 'An eval is a test that gives a model a score. A benchmark is a fixed test shared by many models. A score is only an estimate, so it comes with a margin of error.',
    analogy: 'A school exam gives a mark, but a different set of questions could give a slightly different mark. A test with few questions is shakier.',
    uses: ['Comparing two models before you choose one for a product.', 'Checking whether a change to a model made it better or worse.', 'Watching for mistakes on your own real examples before you launch.'],
    before: ['Percentages', 'Averages'],
    words: [
      ['benchmark', 'A fixed set of questions used to compare models. MMLU and SWE-bench are two well-known ones.'],
      ['margin of error', 'How far a score could move by chance if the test were different.'],
      ['leak', 'When test questions were in the training data, so the model may remember answers.'],
      ['saturate', 'To reach such high scores that the test no longer separates models.'],
      ['judge', 'A person or a strong model that marks open-ended answers.']
    ],
    math: {
      lines: ['\\pm 1.96 \\sqrt{\\frac{p\\,(1 - p)}{n}}'],
      symbols: [
        ['p', 'The share of questions answered right, as a number from 0 to 1.'],
        ['n', 'How many questions are in the test.'],
        ['1 - p', 'The share answered wrong.'],
        ['\\sqrt{}', 'The square root: the number that gives the value when multiplied by itself.'],
        ['1.96', 'A fixed number for 95 percent certainty: the true score falls inside the range about 95 times in 100.']
      ],
      example: [
        'Model A scores 72% on 100 questions, so p = 0.72.',
        'Work out p x (1 - p) / n = 0.72 x 0.28 / 100 = 0.002016. Its square root is about 0.0449.',
        'Multiply by 1.96. The margin is about 0.088, or plus or minus 8.8 points.',
        'Model B scores 67%. The gap of 5 points is smaller than the margin for the gap, about 12.7 points. That margin is bigger than each score\'s own, because both scores can wobble. So it is not clear that A is better.',
        'With 1,000 questions each, the margin for the gap falls to about 4.0 points. Now a 5-point gap is a clearer win.'
      ]
    },
    steps: [
      'Pick a fixed set of questions and a way to mark them.',
      'Mark by answer key, by running tests, or by a judge.',
      'Report the score with its margin of error, not only one number.',
      'Check for leaks, and keep some tests private.',
      'Add tests from your own real task, since that is the one that counts.'
    ],
    use: ['Use evals before you trust or ship a model.', 'Use your own examples, held back from training, marked the same way every time.'],
    avoid: ['Avoid comparing two scores that differ by less than the margin of error.', 'Avoid trusting one number from a test the model may have seen in training.'],
    mistakes: [
      'A higher score does not always mean a better model for your task. The test may not match your job.',
      'A benchmark does not stay useful forever. Once top models score very high, it stops telling them apart.',
      'A judge model is not neutral. Judges can have habits, such as liking longer answers.'
    ],
    cheat: ['A benchmark is a fixed exam.', 'A score is an estimate with a margin.', 'More questions shrink the margin.', 'Leaks and saturation break scores.', 'Your own eval matters most.'],
    next: ['confusion', 'agents', 'prefs'],
    sources: ['Hendrycks, Burns, Basart, Zou et al., "Measuring Massive Multitask Language Understanding", 2020. https://arxiv.org/abs/2009.03300', 'Liang, Bommasani, Lee, Tsipras et al., "Holistic Evaluation of Language Models", 2022. https://arxiv.org/abs/2211.09110', 'Zheng, Chiang, Sheng, Zhuang et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", 2023. https://arxiv.org/abs/2306.05685', 'Jimenez, Yang, Wettig, Yao et al., "SWE-bench", 2023. https://arxiv.org/abs/2310.06770', 'Hsieh, Sun, Kriman, Acharya et al., "RULER", 2024. https://arxiv.org/abs/2404.06654']
  },

  diffusion: {
    what: 'A diffusion model makes pictures by removing noise. During training it learns to take a noisy picture and guess the noise. If you know the noise, you can take it away. To draw something new, it starts from pure noise and cleans it step by step.',
    analogy: 'Picture a sculptor who sees a rough block of stone. With small cuts, the sculptor reveals a shape that was hidden in it.',
    uses: ['Text-to-image tools that draw a picture from a short description.', 'Photo editing, such as filling in a missing part of a picture.', 'Making video, sound and 3D shapes, which use the same noise-removal idea.'],
    before: ['backprop', 'embeddings'],
    words: [
      ['noise', 'Random numbers mixed into data until the data is hard to see.'],
      ['forward process', 'Adding a little noise at each step, which needs no learning.'],
      ['reverse process', 'Removing noise step by step. This is the part the model learns.'],
      ['denoising step', 'One small clean-up of the noise.'],
      ['prompt', 'The words you type to tell the model what picture you want.'],
      ['latent', 'A small, squeezed copy of an image that is cheaper to work on.']
    ],
    math: {
      lines: ['x_t = \\sqrt{\\bar{\\alpha}_t}\\, x_0 + \\sqrt{1 - \\bar{\\alpha}_t}\\, \\varepsilon'],
      symbols: [
        ['x_0', 'The clean original data, such as a picture.'],
        ['x_t', 'The noisy version after t steps.'],
        ['\\varepsilon', 'Random noise, picked fresh each time.'],
        ['\\bar{\\alpha}_t', 'A number between 0 and 1. It starts near 1 and shrinks toward 0 as t grows.'],
        ['\\sqrt{}', 'The square root of a number.']
      ],
      example: [
        'This is a smaller example than the animation: one pixel, not a ring of dots. Take one pixel with value x_0 = 2 and a random noise value of -1.',
        'Early on, say the number from the noise schedule is 0.64. Its square root is 0.8.',
        'The square root of 1 - 0.64 = 0.36 is 0.6.',
        'The noisy pixel is 0.8 x 2 + 0.6 x (-1) = 1.6 - 0.6 = 1.0.',
        'Late in the process the number is near 0, so the pixel is almost all noise. If the model guesses the noise, it can take it away and get the pixel back.'
      ]
    },
    steps: [
      'Take real training pictures and add noise a little at a time until nothing is left but noise.',
      'Train a model to look at a noisy picture and guess the noise in it.',
      'To make something new, start from fresh random noise.',
      'Remove a small part of the guessed noise, again and again.',
      'A text prompt can steer each step, so the result matches your words.'
    ],
    use: ['Use it for high-quality image, video and audio generation.', 'Use fewer steps when you need speed, and more when you need detail.'],
    avoid: ['Avoid it when you need an instant result and cannot afford many steps.', 'Avoid believing the output is true. It makes a plausible picture, not a photo of something real.'],
    mistakes: [
      'The model does not search for a stored picture. It builds a new one from noise.',
      'The model does not guess the clean picture in one go. It removes a bit of noise at a time.',
      'More steps do not always help. After enough steps, extra ones add time but little gain.'
    ],
    cheat: ['Forward: add noise, no learning.', 'Reverse: remove noise, learned.', 'Start from random noise to make something new.', 'Few steps are fast but rough.', 'Latent diffusion works on a squeezed copy of the image.'],
    next: ['jepa', 'vit', 'evals'],
    sources: ['Sohl-Dickstein, Weiss, Maheswaranathan, Ganguli, "Deep Unsupervised Learning using Nonequilibrium Thermodynamics", 2015. https://arxiv.org/abs/1503.03585', 'Ho, Jain, Abbeel, "Denoising Diffusion Probabilistic Models", 2020. https://arxiv.org/abs/2006.11239', 'Rombach, Blattmann, Lorenz, Esser et al., "High-Resolution Image Synthesis with Latent Diffusion Models", 2021. https://arxiv.org/abs/2112.10752', 'Ho, Salimans, "Classifier-Free Diffusion Guidance", 2022. https://arxiv.org/abs/2207.12598']
  },

  prefs: {
    what: 'RLHF and DPO tune a model using human votes. People pick the better of two answers. The model is then changed to give winning answers more often. It must not stray far from where it began.',
    analogy: 'A cook tastes two dishes from a customer and learns which one is liked. The cook adjusts the recipe, but keeps the same kitchen style.',
    uses: ['Making chatbots more helpful and polite, as in InstructGPT.', 'Making models refuse harmful requests more often.', 'Tuning a model to follow instructions in a chosen style.'],
    before: ['backprop', 'tokens'],
    words: [
      ['preference', 'A vote that says which of two answers a person likes better.'],
      ['pretrained model', 'A model already trained on a large amount of text, before this tuning.'],
      ['reward model', 'A model that gives a higher score to answers people tend to prefer.'],
      ['RLHF', 'Reinforcement learning from human feedback. Reinforcement learning means learning by trying things and getting rewards. Here the model is tuned to get more reward.'],
      ['DPO', 'Direct preference optimization: tune on the votes directly, with no reward model.'],
      ['leash', 'A limit that keeps the tuned model close to the starting model. Its strength is called beta. A larger beta keeps the model closer.']
    ],
    math: {
      lines: ['L = -\\log \\sigma\\!\\left(\\beta\\left[\\log\\tfrac{\\pi(y_w)}{\\pi_{\\mathrm{ref}}(y_w)} - \\log\\tfrac{\\pi(y_l)}{\\pi_{\\mathrm{ref}}(y_l)}\\right]\\right)'],
      symbols: [
        ['y_w', 'The winning answer, the one people chose.'],
        ['y_l', 'The losing answer.'],
        ['\\pi(y)', 'The chance the model being tuned gives to answer y.'],
        ['\\pi_{\\mathrm{ref}}(y)', 'The chance the starting model gave to answer y.'],
        ['\\beta', 'The leash strength. A larger value keeps the model closer to the start.'],
        ['\\sigma', 'The sigmoid: a curve that squeezes any number into a value between 0 and 1.'],
        ['\\log', 'The natural logarithm. It turns a ratio of chances into a plain gap.']
      ],
      example: [
        'This is a made-up example with simple numbers. Say beta = 0.5. A log of a chance below 1 is negative, and a less negative log means a more likely answer.',
        'For the winner, the log chance is -1.0 for the new model and -1.5 for the start model. The gap is +0.5.',
        'For the loser, the new log chance is -3.0, and for the start model it is -2.5. The gap is -0.5.',
        'Winner gap minus loser gap is 0.5 - (-0.5) = 1.0. Times beta this is 0.5.',
        'The sigmoid of 0.5 is about 0.622. The loss is -ln(0.622), about 0.474.',
        'Training raises the winner and lowers the loser, which makes the number bigger and the loss smaller.'
      ]
    },
    steps: [
      'Ask the model for several answers to the same question.',
      'People compare answers two at a time and pick the better one.',
      'RLHF: fit a reward model from the votes. Then tune the model to earn more reward, on a leash.',
      'DPO: tune the model straight from the votes, raising winners and lowering losers.',
      'Check the result with fresh tests, since models can learn to please instead of to help.'
    ],
    use: ['Use it when good behaviour is hard to write as a rule but easy for people to judge.', 'Use DPO when you want a simpler setup than the full RLHF loop.'],
    avoid: ['Avoid treating the votes as truth. They reflect who was asked and what they valued.', 'Avoid a leash that is too loose, since the model may drift into odd answers.'],
    mistakes: [
      'These methods do not teach new facts. They shape which answers the model prefers to give.',
      'DPO is not magic. It is a way to reach the same goal as RLHF with a simpler loss.',
      'A model that gets high reward may be pleasing, not helpful. Keep checking with real people.'
    ],
    cheat: ['People pick the better answer of two.', 'RLHF: reward model, then reinforcement learning.', 'DPO: use the votes directly.', 'Beta is the leash to the start model.', 'Votes carry the bias of the voters.'],
    next: ['evals', 'lora', 'distill'],
    sources: ['Christiano, Leike, Brown, Martic et al., "Deep reinforcement learning from human preferences", 2017. https://arxiv.org/abs/1706.03741', 'Ouyang, Wu, Jiang, Almeida et al., "Training language models to follow instructions with human feedback", 2022. https://arxiv.org/abs/2203.02155', 'Rafailov, Sharma, Mitchell, Ermon et al., "Direct Preference Optimization", 2023. https://arxiv.org/abs/2305.18290']
  },

  vit: {
    what: 'A vision transformer reads a picture the way a language model reads a sentence. It cuts the picture into square patches. Each patch becomes a token, and attention lets the patches look at each other.',
    analogy: 'Cut a photo into floor tiles and lay them in a row. Then ask each tile to look at all the other tiles.',
    uses: ['Sorting photos into classes, such as cat or car.', 'Reading pictures inside chat models that handle images and text.', 'Spotting and outlining objects in photos and medical scans.'],
    before: ['attention', 'tokens'],
    words: [
      ['transformer', 'A model that reads many pieces at once and lets each piece look at the others.'],
      ['token', 'A small piece that the model reads, such as a word or a picture patch.'],
      ['patch', 'A small square piece cut from a picture.'],
      ['patch embedding', 'A trained step that turns the pixels of one patch into a token.'],
      ['position vector', 'Numbers added to a token to say where its patch was in the picture.'],
      ['class token', 'An extra token added in front, whose final numbers name the picture.'],
      ['pixel', 'One tiny dot of a picture, with a colour.']
    ],
    math: {
      lines: ['N = \\frac{H}{P} \\times \\frac{W}{P}'],
      symbols: [
        ['N', 'The number of patches, and so of tokens.'],
        ['H', 'The height of the picture in pixels.'],
        ['W', 'The width of the picture in pixels.'],
        ['P', 'The side length of one square patch in pixels.']
      ],
      example: [
        'This is a different example from the animation, which uses a 192 by 192 picture. Here the picture is 224 by 224 pixels, as in the original paper, cut into patches that are 16 by 16 pixels.',
        'That makes 224 / 16 = 14 patches across and 14 down. So N = 14 x 14 = 196 tokens.',
        'Each patch holds 16 x 16 x 3 colours = 768 numbers. One trained step turns them into a token.',
        'Attention compares every pair of tokens: 196 x 196 = 38,416 pairs.',
        'With patches of 32, there are only 7 x 7 = 49 tokens and 2,401 pairs. Halving the patch size gives 4 times the tokens and 16 times the pairs.'
      ]
    },
    steps: [
      'Cut the picture into square patches, like floor tiles.',
      'Flatten each patch into a list of numbers, and turn it into a token with one trained step.',
      'Add a position vector to each token, and put a class token at the front.',
      'Run the tokens through attention layers. Every patch can look at every other patch.',
      'Read the class token at the end to name the picture.'
    ],
    use: ['Use it when you have a very large set of training pictures.', 'Use it to feed images into a model that also reads text.'],
    avoid: ['Avoid it with only a small set of pictures, unless you start from a model already trained.', 'Avoid small patches on large pictures, since the cost grows with the square of the token count.'],
    mistakes: [
      'The model does not see the whole picture as one thing. It sees a row of patch tokens.',
      'Without position vectors, the model would lose where each patch sat.',
      'A vision transformer has no built-in sense that nearby pixels go together. It must learn this from lots of data.'
    ],
    cheat: ['Picture to patches to tokens.', 'Add position vectors and a class token.', 'Then it is an ordinary transformer.', 'Patch size sets the token count.', 'Needs a lot of training data.'],
    next: ['jepa', 'diffusion', 'evals'],
    sources: ['Dosovitskiy, Beyer, Kolesnikov, Weissenborn et al., "An Image is Worth 16x16 Words", 2020. https://arxiv.org/abs/2010.11929', 'Touvron, Cord, Douze, Massa et al., "Training data-efficient image transformers & distillation through attention", 2020. https://arxiv.org/abs/2012.12877', 'He, Chen, Xie, Li et al., "Masked Autoencoders Are Scalable Vision Learners", 2021. https://arxiv.org/abs/2111.06377']
  }
};
if (typeof module !== 'undefined') module.exports = { AI_ABOUT_NOW };
