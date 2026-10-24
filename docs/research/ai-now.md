# AI now: research bucket for a DSAMaxxing track

Crawled 2026-10-24 with REA (Edge launch mode), primary sources only. Everything below is in our own words; no abstracts or prose copied. Dates are those shown on the page (arXiv: first submission date). The License column is what the page showed; Meta, Anthropic, Hugging Face and DeepMind pages displayed no content licence, and Hugging Face blog author names were not captured. See `links/ai-now.md` for every URL visited.

## Why these matter now

- Reasoning models changed what 'a model answers' means: the answer is the end of a long search. That is the most teachable shift since 2024 and it links directly to DSA ideas (search, backtracking, pruning, sampling).
- Agents plus MCP turn a model into a program that calls other programs: loops, state, protocols and graphs of tools.
- RAG, MoE, long context and small models are all answers to the same constraint, compute and memory, each with a data-structure or algorithm flavour (index and nearest neighbour; sparse routing; attention cost; compression).
- JEPA and world models are the main alternative bet to 'predict the next token', a good contrast for a learner to hold two designs in mind.
- Evals decide what any of this is believed to be worth; a good closing lesson.

## Suggested order for an AI-now track

1. System 1 vs System 2 (frame)
2. Reasoning models and test-time compute
3. Agents, tool use, MCP
4. RAG
5. Long context, then multimodal
6. Mixture of Experts
7. Fine-tuning (LoRA/QLoRA, DPO) and distillation
8. Small and on-device models
9. JEPA and world models (the 'other path')
10. Evals and benchmarks (capstone; sprinkle a one-screen primer earlier)

Rationale: mental model first, then the two big capabilities (think, act), then supply of knowledge (RAG, context), then efficiency (MoE, fine-tune, small), then the contrasting paradigm and a critical close.


## 1. System 1 vs System 2 (and System 3?)

**Idea.** Psychology splits thinking into a fast, automatic mode (System 1) and a slow, effortful mode (System 2). A plain language model answering in one pass behaves like System 1. A reasoning model that writes out long working, tries options and checks itself behaves like System 2. Distillation can fold slow habits back into a fast model.

**System 3.** Not found in the primary sources REA reached. The 1-to-2 survey's HTML version contains no 'System 3' text. Do not teach 'System 3' as an established term; flag it as an informal label until a paper is sourced.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| From System 1 to System 2: A Survey of Reasoning Large Language Models | Li, Zhang, Zhang, Zhang et al. | 2025-02-24 | <https://arxiv.org/abs/2502.17419> | Maps LLM progress onto the fast-intuitive vs slow-deliberate split and surveys the models that moved toward the slow side. Its HTML version has no mention of a 'System 3'. | CC BY 4.0 |
| Distilling System 2 into System 1 | Yu, Xu, Weston, Kulikov | 2024-07-08 | <https://arxiv.org/abs/2407.06023> | Shows slow step-by-step answers can be trained back into a fast single-pass model, so the 'slow' habit becomes a reflex. | CC BY-NC-ND 4.0 |
| Chain-of-Thought Prompting Elicits Reasoning in Large Language Models | Wei et al. | 2022-01-28 | <https://arxiv.org/abs/2201.11903> | The origin of 'show your work' prompting: intermediate steps make big models solve multi-step problems. | CC BY 4.0 |

### How we'd animate it

Cast: **Reflex Rabbit** (System 1) blurts an answer in one frame; **Professor Owl** (System 2) fills a scratchpad lane step by step. A 'question belt' feeds both. Step-through: easy question, rabbit wins in 1 tick; hard question, rabbit wrong, owl takes 12 ticks and is right. Slider: 'thinking budget'. Final beat: a 'distil' button teaches the rabbit the owl's answers, so the rabbit gets faster and better, but not on brand-new puzzles.

### Open questions / what's contested

- Is the System 1/2 analogy honest or just a metaphor? Brains and transformers differ.
- Does longer thinking always help, or does it plateau or overthink easy questions?
- 'System 3' has no agreed definition in what we reached. Gap.


## 3. Reasoning models: test-time compute, chain-of-thought, verifiable-reward RL

**Idea.** Spend more computation when answering, not only when training. Ways: write a chain of thought; sample many answers and vote (self-consistency); search over branches (tree of thoughts); use a checker to pick the best. Newer reasoning models learn this behaviour by **reinforcement learning from verifiable rewards**: on tasks with a checkable answer (maths, code) reward correct final answers and let the model discover long reasoning on its own. Process-level grading (judging each step) is the alternative to grading only outcomes.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Chain-of-Thought Prompting Elicits Reasoning in Large Language Models | Wei et al. | 2022-01-28 | <https://arxiv.org/abs/2201.11903> | Intermediate written steps lift multi-step reasoning accuracy. | CC BY 4.0 |
| Self-Consistency Improves Chain of Thought Reasoning in Language Models | Wang, Wei, Schuurmans, Le et al. | 2022-03-21 | <https://arxiv.org/abs/2203.11171> | Sample many reasoning paths and take the most common answer: a vote instead of one greedy try. | CC BY 4.0 |
| Tree of Thoughts: Deliberate Problem Solving with Large Language Models | Yao, Yu, Zhao, Shafran et al. | 2023-05-17 | <https://arxiv.org/abs/2305.10601> | Turns reasoning into search: branch, evaluate, backtrack. | CC BY 4.0 |
| Let's Verify Step by Step | Lightman, Kosaraju, Burda, Edwards et al. | 2023-05-31 | <https://arxiv.org/abs/2305.20050> | Compares grading only the final answer with grading each step; per-step feedback trains better verifiers. | arXiv non-exclusive licence |
| Large Language Monkeys: Scaling Inference Compute with Repeated Sampling | Brown, Juravsky, Ehrlich, Clark et al. | 2024-07-31 | <https://arxiv.org/abs/2407.21787> | Treats number of attempts as a scaling axis; more samples keep paying off when an answer can be checked. | CC BY 4.0 |
| Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters | Snell, Lee, Xu, Kumar | 2024-08-06 | <https://arxiv.org/abs/2408.03314> | Studies how to spend inference compute per problem; extra thinking time can beat a bigger model on some tasks. | CC BY 4.0 |
| Tulu 3: Pushing Frontiers in Open Language Model Post-Training | Lambert, Morrison, Pyatkin et al. | 2024-11-22 | <https://arxiv.org/abs/2411.15124> | Open recipe for post-training, including reinforcement learning with verifiable rewards. | CC BY 4.0 |
| DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning | DeepSeek-AI | 2025-01-22 | <https://arxiv.org/abs/2501.12948> | Shows long reasoning behaviour can be encouraged by reinforcement learning on checkable tasks. | arXiv non-exclusive licence |
| Open-R1: a fully open reproduction of DeepSeek-R1 | Hugging Face (blog) | 2025-01-28 | <https://huggingface.co/blog/open-r1> | Community effort to rebuild the R1 pipeline in the open; useful for the data/training-stage breakdown. | none shown on page |
| Scaling test-time compute (Space page) | Hugging Face H4 (Space) | not shown | <https://huggingface.co/spaces/HuggingFaceH4/blogpost-scaling-test-time-compute> | Interactive companion to a test-time-compute write-up (only the page title was captured; contents not read). | none shown on page |

### How we'd animate it

Cast: **Student Bot** at a whiteboard, **Checker** (a green-tick machine). Step-through A: one-shot guess. B: chain-of-thought lines appear. C: 8 parallel attempts, majority-vote bar. D: tree with pruned red branches. E: RL loop, Student gets +1 from Checker for right answers, long scribbles grow over 'training epochs'. A 'think budget' slider shows accuracy rising then flattening.

### Open questions / what's contested

- Is RL creating new ability or surfacing what pretraining already had?
- Written reasoning is not always the real computation (faithfulness). Not sourced here.
- Verifiable rewards only cover checkable domains; fuzzy tasks remain open.
- OpenAI's reasoning-model post was blocked by a bot check, so the first-party OpenAI view is a gap.


## 2. JEPA and world models

**Idea.** A generative model predicts raw pixels or tokens. A JEPA predicts in a compressed 'meaning space': show part of an image or video, predict the abstract representation of the hidden part, and ignore unpredictable detail like exact leaf texture. I-JEPA does it for images, V-JEPA for video, V-JEPA 2 adds a little robot data so the model can predict what an action will do and plan toward a goal. A **world model** is any learned simulator you can imagine consequences in before acting.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (I-JEPA) | Assran, Duval, Misra, Bojanowski et al. | 2023-01-19 | <https://arxiv.org/abs/2301.08243> | Learns by predicting the abstract representation of hidden image regions instead of pixels. | arXiv non-exclusive licence |
| I-JEPA: The first AI model based on Yann LeCun's vision for more human-like AI | Meta AI (ai.meta.com blog) | 2023-06-13 | <https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/> | Lab explainer: compare abstract representations, not raw pixels; frames JEPA as an internal model of the world. | none shown on page |
| Revisiting Feature Prediction for Learning Visual Representations from Video (V-JEPA) | Bardes, Garrido, Ponce, Chen et al. | 2024-04 (arXiv; Meta blog announcement 2024-02-15) | <https://arxiv.org/abs/2404.08471> | Applies feature prediction alone (no text, no reconstruction, no negatives) to video. | CC BY 4.0 |
| V-JEPA: The next step toward advanced machine intelligence | Meta AI (blog) | 2024-02-15 | <https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/> | Plain-language launch post for V-JEPA. | none shown on page |
| V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning | Assran, Bardes, Fan, Garrido et al. | 2025-06-11 | <https://arxiv.org/abs/2506.09985> | Adds a small amount of robot interaction data so the video model can predict action outcomes and plan. | CC BY 4.0 |
| Introducing the V-JEPA 2 world model and new benchmarks for physical reasoning | Meta AI (blog) | 2025-06-11 | <https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/> | Explains world models as understand / predict / plan; 1.2B-parameter model; zero-shot robot planning; three new physical-reasoning benchmarks. | none shown on page |
| DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning | Zhou, Pan, LeCun, Pinto | 2024-11-07 | <https://arxiv.org/abs/2411.04983> | A world model built on frozen visual features that plans toward goals without task-specific training. | CC BY 4.0 |
| World Models | Ha, Schmidhuber | 2018-03-27 | <https://arxiv.org/abs/1803.10122> | The classic 'dream inside a learned model, then act' idea in game environments. | CC BY 4.0 |
| SIMA 2: An Agent that Plays, Reasons, and Learns With You in Virtual 3D Worlds | Google DeepMind (blog) | 2025-11-13 | <https://deepmind.google/blog/sima-2-an-agent-that-plays-reasons-and-learns-with-you-in-virtual-3d-worlds/> | Agent in 3D game worlds driven by a Gemini model; a contrast case (a generalist model acting, not a JEPA). | none shown on page |

### How we'd animate it

Cast: **Masked Painter** hides patches of a picture. Two panels: *pixel painter* (generative, sweats over every blade of grass) vs *idea painter* (JEPA, sketches only 'a tree, left, tall'). Step-through: encoder turns visible patches into a vector; predictor guesses the vector for the hidden patch; loss compares vectors, not pixels. Second act: robot arm in a grid; the world model 'imagines' three candidate moves as ghost trajectories and picks the one nearest the goal image (planning).

### Open questions / what's contested

- Is predicting in embedding space really better than generating? Evidence we reached is mostly vision and robotics, not language.
- Collapse (all embeddings identical) and how it is avoided is a technical subtopic we did not source separately.
- LeCun's position paper is on OpenReview, which showed a bot check (not read).
- Rival world-model approaches (generative game-world models) exist; the DeepMind page lists Genie 3 but it was not opened.


## 4. Agents, tool use and MCP

**Idea.** An agent is a model in a loop: think, call a tool (search, code, file edit), read the result, repeat. Anthropic's useful distinction: a *workflow* follows fixed code paths; an *agent* decides its own steps. **MCP** is an open protocol so any assistant can plug into any tool server the same way (the official docs use a USB-C analogy): servers expose tools, resources and prompts; clients connect and ask.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| ReAct: Synergizing Reasoning and Acting in Language Models | Yao, Zhao, Yu, Du et al. | 2022-10-06 | <https://arxiv.org/abs/2210.03629> | Interleave 'thought' text with tool actions and observations, so the model plans while it looks things up. | CC BY 4.0 |
| Toolformer: Language Models Can Teach Themselves to Use Tools | Schick, Dwivedi-Yu, Dessi et al. | 2023-02-09 | <https://arxiv.org/abs/2302.04761> | A model learns for itself when to call calculators, search and other APIs. | arXiv non-exclusive licence |
| SWE-bench: Can Language Models Resolve Real-World GitHub Issues? | Jimenez, Yang, Wettig, Yao et al. | 2023-10-10 | <https://arxiv.org/abs/2310.06770> | Gives agents real repository bugs to fix, graded by tests. A standard agent benchmark. | CC BY 4.0 |
| Introducing the Model Context Protocol | Anthropic (blog) | 2024-11-25 | <https://www.anthropic.com/news/model-context-protocol> | Announcement of MCP as an open standard for connecting assistants to data and tools. | none shown on page |
| Building effective AI agents | Anthropic (engineering/research blog) | 2024-12-19 | <https://www.anthropic.com/research/building-effective-agents> | Splits 'workflows' (fixed code paths) from 'agents' (model steers itself); lists patterns such as prompt chaining; advises starting simple. Page carries a note that tooling has changed since. | none shown on page |
| What is the Model Context Protocol (MCP)? | modelcontextprotocol.io docs (version 2026-07-28 shown as latest) | not shown | <https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro> | Official overview: an open standard, likened to a USB-C port, linking AI apps to data sources, tools and workflows. | none shown on page |
| Specification - Model Context Protocol | modelcontextprotocol.io (version 2026-07-28) | 2026-07-28 (version id) | <https://modelcontextprotocol.io/specification/2026-07-28> | Normative spec: base protocol, transports, authorization, client features (roots, sampling, elicitation), server features (prompts, resources, tools). | none shown on page |
| SIMA 2: An Agent that Plays, Reasons, and Learns With You in Virtual 3D Worlds | Google DeepMind (blog) | 2025-11-13 | <https://deepmind.google/blog/sima-2-an-agent-that-plays-reasons-and-learns-with-you-in-virtual-3d-worlds/> | Embodied agent example for the 'agent in a world' angle. | none shown on page |

### How we'd animate it

Cast: **Courier Bot** with a backpack, a wall of **tool sockets** (plug shapes unify via MCP). Step-through: goal card arrives; thought bubble; picks a socket; MCP 'handshake' lists tools; call goes out as a JSON envelope; result returns; loop until goal met. Toggle 'before MCP' (each plug custom, N x M wires) vs 'after MCP' (N + M wires).

### Open questions / what's contested

- When is an agent worth the cost and risk vs a plain workflow? (Anthropic says start simple.)
- Security: tool permissions, prompt injection through tool results.
- MCP is evolving fast: the docs showed version 2026-07-28 as latest, so any teaching copy must pin a version.


## 5. RAG (retrieval-augmented generation)

**Idea.** Don't make the model memorise everything. Cut documents into chunks, index them, fetch the few most relevant at question time and put them in the prompt, so the answer can use fresh or private facts. Quality depends on chunking, search quality and what you hand the model. Improvements include letting the model decide when to retrieve (Self-RAG) and adding context to chunks before indexing (Anthropic's contextual retrieval).

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | Lewis, Perez, Piktus, Petroni et al. | 2020-05-22 | <https://arxiv.org/abs/2005.11401> | The paper that named RAG: a generator that pulls passages from an external index before answering. | arXiv non-exclusive licence |
| Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection | Asai, Wu, Wang, Sil et al. | 2023-10-17 | <https://arxiv.org/abs/2310.11511> | Model decides when to retrieve and critiques its own retrieved evidence. | CC BY 4.0 |
| Contextual retrieval in AI systems | Anthropic (blog) | 2024-09-19 | <https://www.anthropic.com/research/contextual-retrieval> | Practical retrieval improvements: attach context to chunks before indexing. Page reached; details not extracted. | none shown on page |
| Lost in the Middle: How Language Models Use Long Contexts | Liu, Lin, Hewitt, Paranjape et al. | 2023-07-06 | <https://arxiv.org/abs/2307.03172> | Why stuffing documents into the prompt is not the same as retrieving well; position matters. | arXiv non-exclusive licence |

### How we'd animate it

Cast: **Librarian Bot** and a shelf of glowing chunk cards. Step-through: question typed; question becomes a vector (a dot on a map); nearest cards light up; top 3 slide into the prompt; answer cites card numbers. Toggle: bad chunking splits a sentence and the right fact is missed. Reuse our existing vector/graph visual vocabulary where possible.

### Open questions / what's contested

- Long context vs RAG: when is stuffing enough?
- Retrieval failures vs generation failures are hard to tell apart.
- Anthropic's contextual retrieval page was reached but not mined for its reported numbers.


## 6. Mixture of Experts

**Idea.** Instead of every token passing through the whole feed-forward block, the layer has many 'expert' sub-networks and a small **router** picks a few per token. Total parameters are huge, active parameters per token are small, so you get capacity without paying full compute. Mixtral uses 8 experts with 2 chosen per token.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer | Shazeer, Mirhoseini, Maziarz, Davis et al. | 2017-01-23 | <https://arxiv.org/abs/1701.06538> | Origin of a gate that sends each input to a few experts, giving big capacity at modest compute. | arXiv non-exclusive licence |
| Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity | Fedus, Zoph, Shazeer | 2021-01-11 | <https://arxiv.org/abs/2101.03961> | Simplifies routing to one expert per token; scales sparse transformers. | arXiv non-exclusive licence |
| Mixtral of Experts | Jiang, Sablayrolles, Roux, Mensch et al. | 2024-01-08 | <https://arxiv.org/abs/2401.04088> | 8 experts per layer, router picks two per token: a clear, widely cited open example. | CC BY 4.0 |
| DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models | Dai, Deng, Zhao, Xu et al. | 2024-01-11 | <https://arxiv.org/abs/2401.06066> | Splits experts finer and keeps some shared, so experts specialise more cleanly. | arXiv non-exclusive licence |
| Mixture of Experts Explained | Hugging Face (blog) | 2023-12-11 | <https://huggingface.co/blog/moe> | Walk-through of what MoE is, its training quirks and serving trade-offs. | none shown on page |

### How we'd animate it

Cast: **Router Gate** (a traffic officer) and 8 **Expert booths**, each a different colour. Tokens roll in on a belt; the officer points at two booths; outputs merge. Step-through per token; a heat map shows which experts light up; a 'load balance' meter warns when one booth is jammed. Counter: 'params stored' vs 'params used'.

### Open questions / what's contested

- Do experts truly specialise by topic, or by surface patterns? (DeepSeekMoE argues for finer specialisation.)
- Serving cost: all experts must sit in memory.
- Training stability and load balancing.


## 7. Fine-tuning, LoRA/QLoRA, DPO and distillation

**Idea.** *LoRA*: freeze the big weights, learn tiny low-rank side matrices. *QLoRA*: the same, but the frozen base is squeezed to 4 bits so it fits on one GPU. *DPO*: align the model to preferences by training on (better answer, worse answer) pairs directly, without a separate reward model. *Distillation*: a small student imitates a big teacher's outputs.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| LoRA: Low-Rank Adaptation of Large Language Models | Hu, Shen, Wallis, Allen-Zhu et al. | 2021-06-17 | <https://arxiv.org/abs/2106.09685> | Freeze the base model and train small low-rank add-on matrices instead of all weights. | arXiv non-exclusive licence |
| QLoRA: Efficient Finetuning of Quantized LLMs | Dettmers, Pagnoni, Holtzman, Zettlemoyer | 2023-05-23 | <https://arxiv.org/abs/2305.14314> | LoRA on top of a 4-bit compressed base model, so large models fit on one GPU. | CC BY 4.0 |
| Direct Preference Optimization: Your Language Model is Secretly a Reward Model | Rafailov, Sharma, Mitchell, Ermon et al. | 2023-05-29 | <https://arxiv.org/abs/2305.18290> | Trains on preferred-vs-rejected pairs directly, skipping a separate reward model and RL loop. | CC BY 4.0 |
| Training language models to follow instructions with human feedback | Ouyang, Wu, Jiang, Almeida et al. | 2022-03-04 | <https://arxiv.org/abs/2203.02155> | The RLHF recipe (InstructGPT) that DPO later simplifies. | arXiv non-exclusive licence |
| Distilling the Knowledge in a Neural Network | Hinton, Vinyals, Dean | 2015-03-09 | <https://arxiv.org/abs/1503.02531> | The teacher-student idea: a small model learns from a big model's soft outputs. | arXiv non-exclusive licence |
| DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter | Sanh, Debut, Chaumond, Wolf | 2019-10-02 | <https://arxiv.org/abs/1910.01108> | A practical distillation example for shrinking a model for constrained devices. | arXiv non-exclusive licence |
| Distilling System 2 into System 1 | Yu, Xu, Weston, Kulikov | 2024-07-08 | <https://arxiv.org/abs/2407.06023> | Distillation applied to reasoning traces. | CC BY-NC-ND 4.0 |
| Tulu 3: Pushing Frontiers in Open Language Model Post-Training | Lambert et al. | 2024-11-22 | <https://arxiv.org/abs/2411.15124> | Full open post-training stack: SFT, preference tuning, verifiable-reward RL. | CC BY 4.0 |
| PEFT: Parameter-Efficient Fine-Tuning of Billion-Scale Models on Low-Resource Hardware | Hugging Face (blog) | 2023-02-10 | <https://huggingface.co/blog/peft> | Introduces the PEFT library and the case for training few parameters. | none shown on page |
| Making LLMs even more accessible with bitsandbytes, 4-bit quantization and QLoRA | Hugging Face (blog) | 2023-05-24 | <https://huggingface.co/blog/4bit-transformers-bitsandbytes> | Tooling-side explainer for 4-bit loading and QLoRA. | none shown on page |

### How we'd animate it

Cast: a giant **Frozen Statue** (base model) with a small **sticky-note patch** (LoRA adapter) attached; patches can be swapped. QLoRA step: statue shrinks to 4-bit blocks, patch stays full precision. DPO: two answer cards, thumbs up/down, a tug-of-war arrow shifts the model toward the winner. Distillation: Teacher Owl whispers soft probability bars, Student Chick copies.

### Open questions / what's contested

- LoRA vs full fine-tuning quality gap depends on task; we sourced claims only at abstract level.
- Preference data quality; DPO vs RL-based alignment is still debated.
- Licensing of teacher outputs when distilling.


## 8. Evals and benchmarks

**Idea.** A benchmark is a fixed exam. Knowledge exams (MMLU), broad multi-metric suites (HELM), coding on real repos graded by tests (SWE-bench), and human or model judges of chat quality (MT-Bench / Chatbot Arena). Long-context tests like RULER exist because simple needle-in-haystack checks overstate ability. Core worry: exams leak into training data and saturate.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Measuring Massive Multitask Language Understanding (MMLU) | Hendrycks, Burns, Basart, Zou et al. | 2020-09-07 | <https://arxiv.org/abs/2009.03300> | 57-subject multiple-choice test that became the default 'knowledge' score. | arXiv non-exclusive licence |
| Holistic Evaluation of Language Models (HELM) | Liang, Bommasani, Lee, Tsipras et al. | 2022-11-16 | <https://arxiv.org/abs/2211.09110> | Argues for many metrics and scenarios at once (accuracy plus other qualities), not one number. | CC BY 4.0 |
| Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena | Zheng, Chiang, Sheng, Zhuang et al. | 2023-06-09 | <https://arxiv.org/abs/2306.05685> | Uses a strong model to grade open-ended answers and checks it against human votes; names its biases. | arXiv non-exclusive licence |
| SWE-bench: Can Language Models Resolve Real-World GitHub Issues? | Jimenez, Yang, Wettig, Yao et al. | 2023-10-10 | <https://arxiv.org/abs/2310.06770> | Test-based, real-world coding eval. | CC BY 4.0 |
| RULER: What's the Real Context Size of Your Long-Context Language Models? | Hsieh, Sun, Kriman, Acharya et al. | 2024-04-09 | <https://arxiv.org/abs/2404.06654> | Shows simple needle-in-haystack passes overstate long-context ability. | CC BY 4.0 |
| Piloting the world's first double-blind AI evaluations | Google DeepMind (blog) | 2026-08-27 | <https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/> | Tackles trust in private model benchmarks using cryptographically secure environments. Only the page description and headings were read. | none shown on page |

### How we'd animate it

Cast: **Exam Hall** with student bots and an **Examiner**. Step-through: fixed question set; answers graded by key (MMLU), by unit tests (SWE-bench), or by a judge model (arena). Show a leaked-question stamp inflating the score. Toggle 'one number' vs 'HELM radar chart'.

### Open questions / what's contested

- Contamination and saturation.
- LLM judges carry biases (position, length, self-preference); the MT-Bench paper itself discusses limits.
- Trust in private benchmarks: DeepMind's double-blind pilot is one proposed answer (only headings and description read).


## 9a. Long context

**Idea.** Context window = how much text the model can attend to at once. Attention cost grows with length, so engineering such as FlashAttention matters. Having a million-token window is not the same as using it well: models can miss facts in the middle.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness | Dao, Fu, Ermon, Rudra et al. | 2022-05-27 | <https://arxiv.org/abs/2205.14135> | Makes exact attention fast and memory-light on long sequences by respecting GPU memory movement. | arXiv non-exclusive licence |
| Lost in the Middle: How Language Models Use Long Contexts | Liu, Lin, Hewitt, Paranjape et al. | 2023-07-06 | <https://arxiv.org/abs/2307.03172> | Models use the start and end of long inputs better than the middle. | arXiv non-exclusive licence |
| RULER: What's the Real Context Size of Your Long-Context Language Models? | Hsieh, Sun, Kriman, Acharya et al. | 2024-04-09 | <https://arxiv.org/abs/2404.06654> | Harder synthetic tests than needle-in-haystack. | CC BY 4.0 |
| Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context | Gemini Team, Google | 2024-03-08 | <https://arxiv.org/abs/2403.05530> | Reports models that recall and reason over millions of tokens including long video and audio. | CC BY 4.0 |

### How we'd animate it

Cast: **Spotlight Reader** on a long scroll. Step-through: the window slides; attention lines fan out (quadratic wires); FlashAttention shown as reading in tiles. Game: hide a needle at positions 10%, 50%, 90% and plot recall as a U-shaped curve.

### Open questions / what's contested

- Effective vs advertised context length (RULER).
- Long context vs RAG vs memory.


## 9b. Multimodal models

**Idea.** Let one model handle images, audio and video as well as text. CLIP links pictures and captions in one space; Flamingo and LLaVA connect a vision encoder to a language model; Gemini 1.5 reports native multimodality with long context.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Learning Transferable Visual Models From Natural Language Supervision (CLIP) | Radford, Kim, Hallacy, Ramesh et al. | 2021-02-26 | <https://arxiv.org/abs/2103.00020> | Aligns images and captions in one space; the base trick behind many vision-language systems. | arXiv non-exclusive licence |
| Flamingo: a Visual Language Model for Few-Shot Learning | Alayrac, Donahue, Luc, Miech et al. | 2022-04-29 | <https://arxiv.org/abs/2204.14198> | Bridges a frozen vision model and a frozen language model for few-shot image/video tasks. | arXiv non-exclusive licence |
| Visual Instruction Tuning (LLaVA) | Liu, Li, Wu, Lee | 2023-04-17 | <https://arxiv.org/abs/2304.08485> | Teaches a language model to chat about images using machine-generated instruction data. | CC BY 4.0 |
| Vision Language Models Explained | Hugging Face (blog) | 2024-04-11 | <https://huggingface.co/blog/vlms> | Beginner overview of how VLMs are built, trained and evaluated. | none shown on page |
| Gemini 1.5 (technical report) | Gemini Team, Google | 2024-03-08 | <https://arxiv.org/abs/2403.05530> | Natively multimodal with very long context. | CC BY 4.0 |

### How we'd animate it

Cast: **Translator Bot** with image tiles turning into tokens. Step-through: image cut into patches, patches become vectors, vectors sit in the same row as word tokens, the language model reads both. CLIP act: caption cards and picture cards pull together on a map.

### Open questions / what's contested

- Do models really 'see' or lean on text priors?
- Evaluation of video and audio is thin compared with text.


## 9c. Small and on-device models

**Idea.** Shrink models so they run on phones and laptops: train smaller models on better data (Phi-3), design for under a billion parameters (MobileLLM), compress weights to few bits (4-bit, ternary in BitNet b1.58), and distil from bigger teachers.

### Key primary sources

| Title | Authors / org | Date | Link | What it adds | License |
|---|---|---|---|---|---|
| Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone | Abdin et al. | 2024-04-22 | <https://arxiv.org/abs/2404.14219> | A 3.8B model trained for quality per parameter, small enough to run on a phone. | CC BY 4.0 |
| MobileLLM: Optimizing Sub-billion Parameter Language Models for On-Device Use Cases | Liu, Zhao, Iandola, Lai et al. | 2024-02-22 | <https://arxiv.org/abs/2402.14905> | Design choices that matter for sub-billion models. | arXiv non-exclusive licence |
| The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits | Ma, Wang, Ma, Wang et al. | 2024-02-27 | <https://arxiv.org/abs/2402.17764> | Ternary weights {-1,0,1} claimed to match full precision at far lower cost. | arXiv non-exclusive licence |
| Distilling the Knowledge in a Neural Network | Hinton, Vinyals, Dean | 2015-03-09 | <https://arxiv.org/abs/1503.02531> | Why small models can inherit big-model skill. | arXiv non-exclusive licence |
| DistilBERT, a distilled version of BERT | Sanh, Debut, Chaumond, Wolf | 2019-10-02 | <https://arxiv.org/abs/1910.01108> | Concrete shrinking example. | arXiv non-exclusive licence |
| Making LLMs even more accessible with bitsandbytes, 4-bit quantization and QLoRA | Hugging Face (blog) | 2023-05-24 | <https://huggingface.co/blog/4bit-transformers-bitsandbytes> | Quantization for fitting models on small hardware. | none shown on page |
| Gemma (model family page) | Google DeepMind | not shown | <https://deepmind.google/models/gemma/> | Official landing page for the open small-model family; page reached, details not extracted. | none shown on page |

### How we'd animate it

Cast: **Phone** with a tiny brain meter. Step-through: slider of precision 16-bit, 8, 4, 1.58 while a memory bar shrinks and an accuracy line barely moves, then falls. Show a distillation arrow from a Cloud Giant to the Phone Bot.

### Open questions / what's contested

- Quality ceiling for small models and benchmark gaming.
- Claims (Phi-3 matching larger models; BitNet matching full precision) come from the authors' own abstracts and should be framed as claims.


## Gaps and notes

- 'System 3': no primary source found. arXiv robots.txt disallows /search (crawl-delay 15 s; we waited 8-10 s between abs pages inside one session), and the Hugging Face papers search is script-driven and redirected to a daily list.
- OpenAI (openai.com/index/learning-to-reason-with-llms): Cloudflare 'Just a moment' check. Stopped, per guardrails. OpenReview (LeCun's position paper): Turnstile check. Stopped.
- DeepMind pages (SIMA 2, double-blind evals, Gemma, blog index) were reached but only titles, headings and descriptions were read.
- Many 'what it adds' lines come from titles and arXiv abstract-page metadata, not full-paper reading. Verify against the paper when building the lesson.
- Anthropic's agents post carries a note that its tooling picture has changed; re-check before teaching specifics.
- Source count: 43 distinct arXiv abs pages, 17 lab/docs/blog pages (Meta 3, Anthropic 3, MCP 2, Hugging Face 6 incl. one Space, DeepMind 3), plus index/robots pages (see links file).
