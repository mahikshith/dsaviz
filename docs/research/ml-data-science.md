# Machine learning and data science learning: research for DSAMaxxing

Date: 2026-10-24. Purpose: shape an ML and data science section for DSAMaxxing, in the same visual, story-driven style as the DSA side. All observations are from live public pages, in my own words. Links: `links/ml-data-science.md`. Credit list: `ATTRIBUTION.md`, section "Machine learning and data science".

## Method

- Loaded each page with the REA MCP server (launch mode, Edge), one page per call (multi-page calls kept timing out or dropping the connection on heavy interactive pages), parsed to text, and read the parsed text. No web search, no memory as a basis.
- Robots.txt checked first with a plain GET. Nothing blocked us. No Crawl-delay is set on any site visited except github.com (1 second, aimed at named AI crawlers); our page loads were at least several seconds apart anyway. www.deeplearning.ai disallows named AI crawlers, so only one catalog page was opened in a normal browser. Kaggle's robots.txt returned its app shell, so it is unreadable (gap). On GitHub only repo roots and /topics were opened.
- No login, no bot check, no rate limit seen. Pages that could not be captured (Distill momentum and grand-tour, one Distill repo) are listed as gaps in the links file.
- Licences were read from the page text or repo sidebar. Where none was shown I treat the material as all rights reserved. Cross-referenced, not repeated: ML-For-Beginners, nn-zero-to-hero, llm-course (see `github-en.md`).

## Sources

Licence key: **Permissive** = can be adapted with credit. **Facts only** = NC, ND, SA, none shown, or all rights reserved.

### Kaggle Learn (kaggle.com/learn)
- Covers: Python, Pandas, SQL (intro and advanced), data viz, data cleaning, feature engineering, intro and intermediate ML, explainability, deep learning (Keras), computer vision, time series, geospatial, AI ethics, game AI and RL. A second shelf of community guides (NLP series, model evaluation, 5-day GenAI and agent intensives with Google).
- Format: short hands-on courses; every lesson is a tutorial notebook plus a graded exercise, run in Kaggle notebooks. Hours are stated per course (Pandas about 4h). Certificates exist.
- Structure: strict prerequisite chain shown on each course page ("Builds on", "Preparation for").
- Business model: free; the funnel feeds competitions and the data hub of a Google-owned platform.
- Licence: no content licence shown. The exercise-checker repo (Kaggle/learntools) is **Permissive** (Apache-2.0); lesson text is **Facts only**.

### fast.ai Practical Deep Learning (course.fast.ai)
- Covers: part 1 (8 lessons: image classifier, deployment, net foundations, NLP, from-scratch model, random forests, collaborative filtering, CNNs, plus data ethics), part 2 (17 lessons from matrix multiplication and backprop up to diffusion, attention and transformers).
- Format: long lecture videos, Jupyter notebooks, a free online book. Top-down: build and deploy something by lesson 2, then open the box.
- Business model: free; print book; compute partners linked.
- Licence: course22 repo page shows none. **Facts only.**

### DeepLearning.AI (deeplearning.ai)
- Covers: catalog showed 107 short courses, 14 courses, 11 professional certificates; filters by level, topic (GenAI apps, agents, RAG, MLOps, fine-tuning, transformers, data engineering) and partner (Google Cloud, Hugging Face, LangChain, Anthropic, and many more).
- Format: roughly one-hour video-plus-notebook courses co-built with a vendor; longer certificate tracks.
- Business model: short courses free to start; paid membership, business plans, certificates; vendors fund the free content.
- Licence: all rights reserved. **Facts only.** Lesson: vendor-sponsored free micro-courses as a growth loop.

### Hugging Face Learn (huggingface.co/learn)
- Covers: 12 courses (LLM, agents, deep RL, audio, diffusion, computer vision, 3D, games, robotics, post-training, context engineering, an open-source cookbook). The LLM course has 12 chapters: transformers, using them, fine-tuning, sharing, Datasets, Tokenizers, classic NLP tasks, demos, dataset curation, LLM fine-tuning, reasoning models.
- Format: web docs with run-in-Colab notebooks, quizzes at chapter ends, a certification exam, about 25 languages.
- Business model: free and ad-free; pulls users to the Hub (models, datasets, paid inference and enterprise).
- Licence: the course page states it is Apache 2 and asks for credit, a licence link and a note of changes; repo huggingface/course shows Apache-2.0. **Permissive.**
- Daily Papers (huggingface.co/papers): community-curated feed, one date page per day, each paper with upvotes, org and submitter. A model for a "this week in ML" strip. Metadata only; abstracts belong to authors.

### StatQuest (statquest.org)
- Covers: statistics fundamentals, tests, machine learning, neural networks and AI, optimization, on one video index ordered basic to advanced.
- Format: narrated hand-drawn-style videos on YouTube, illustrated books, PDF study guides.
- Business model: store (books, study guides), support page, named supporters on the home page.
- Licence: copyright StatQuest; the FAQ asks people not to reuse screenshots. **Facts only.** The lesson is the rhythm (main idea first, details second, recurring catchphrase), which cannot be copied.

### Distill (distill.pub)
- Covers: about 30 articles 2016-2021 on neural nets, GNNs, interpretability, optimization, t-SNE, Gaussian processes, RL. On hiatus.
- Format: long visual essays with live widgets in the reading flow; sliders, play/pause and step controls beside the text; hover-reactive figures.
- Business model: none now; was a prize-funded journal.
- Licence: text and diagrams CC-BY (the t-SNE page says CC-BY 2.0 and excludes figures taken from elsewhere, marked in captions). Article framework repo is Apache-2.0 (copyright 2018 The Distill Template Authors). **Permissive**; check each article's reuse note and skip externally sourced figures.

### Dive into Deep Learning (d2l.ai, d2l-ai/d2l-en, d2l-ai/d2l-zh)
- Covers: preliminaries (data, linear algebra, calculus, autodiff, probability), linear nets, MLPs, builders' guide, CNNs and modern CNNs, RNNs, attention and transformers, optimization, performance, vision, NLP pretraining and applications.
- Format: online book; every section is prose, math and runnable code with framework tabs (PyTorch, MXNet, and others) and a discussion thread per page.
- Business model: free; printed book; university adoption (500+). The Chinese edition's repo is larger (82.1k stars vs 29.9k).
- Licence: English repo says text CC BY-SA 4.0 and sample code modified MIT. Adapting the prose would make our derivative share-alike, so **Facts only** for text. The Chinese repo sidebar shows Apache-2.0, conflicting with the English repo: **needs verification** from its LICENSE file.

### Google Machine Learning Crash Course (developers.google.com/machine-learning/crash-course)
- Covers: linear and logistic regression, classification metrics, numerical and categorical data, datasets and overfitting, neural networks, embeddings, intro to LLMs, production ML systems, AutoML, fairness. Minutes are listed per lesson (neural networks 75 min, datasets and overfitting 105).
- Format: short text pages, animated videos, interactive visualizations, programming exercises, quiz per module.
- Business model: free; leads to Google Cloud and TensorFlow.
- Licence: footer states content CC BY 4.0 and code Apache 2.0 "except as otherwise noted". **Permissive**, with credit.

### Made With ML (madewithml.com)
- Covers: production ML in 8 steps (design, data, model, develop, utilities, test, reproducibility, production), then foundations (Python, NumPy, Pandas, PyTorch, regression, neural nets, CNN, embeddings, RNN, attention, transformers).
- Format: long text lessons plus notebooks around one end-to-end LLM fine-tuning project.
- Business model: free course, newsletter, live paid cohort upsell; now part of Anyscale (cloud-credit banner).
- Licence: repo GokuMohandas/Made-With-ML is MIT (49.8k stars). Site prose licence not shown, so only repo code is **Permissive**.

### Full Stack Deep Learning (fullstackdeeplearning.com)
- Covers: 2022 course (when to use ML, tooling, troubleshooting, data, deployment, continual learning, foundation models, teams, ethics), 2021 fundamentals with labs, 2023 LLM Bootcamp (prompting, augmented models, LLMOps, UX).
- Format: lecture videos with notes, lab notebooks, MkDocs site.
- Business model: free, newsletter.
- Licence: website repo shows none. **Facts only.**

### 3Blue1Brown (3blue1brown.com)
- Covers: neural networks, gradient descent, backpropagation, LLMs, transformers, attention, how MLP layers may store facts, cross-entropy, diffusion.
- Format: video essays; some lessons also have a "Read + Interact" page with script text beside the video and small widgets.
- Business model: Patreon supporters (early access, name in a video), merchandise store, a talent/hiring partnership ("virtual career fair"), mailing list.
- Licence: footer "(c) 2026 Grant Sanderson". **Facts only.** The animation library Manim (ManimCommunity/manim, MIT, 41.8k stars) is **Permissive** and is the reusable asset; the About page points newcomers to the community edition.

### Jay Alammar (jalammar.github.io)
- Covers: Illustrated Transformer, Stable Diffusion, attention and more. Blog frozen, moved to Substack. Book "Hands-On Large Language Models" (about 300 custom figures) and a short course on how transformer LLMs work.
- Format: one long post of stepped frames, tensors drawn as small labelled grids, consistent colour per object.
- Business model: book, course, newsletter.
- Licence: posts CC BY-NC-SA 4.0 so **facts only**. Companion code repo HandsOnLLM/Hands-On-Large-Language-Models is Apache-2.0 (29.9k stars): code **Permissive**, book text and figures not included.

### Chinese ML notes (GitHub repo roots and /topics)
- datawhalechina/happy-llm (34.5k stars): 8 chapters from NLP basics and Transformer through pretraining, building a LLaMA2 from scratch, training, RAG and agents, plus a recent Agentic RL chapter. CC BY-NC-SA 4.0: **facts only**.
- datawhalechina/llm-cookbook (24.8k): Chinese reproduction of 11 DeepLearning.AI LLM short courses, split into required and elective. CC BY-NC-SA 4.0, derived from third-party courses: **facts only**.
- datawhalechina/so-large-lm (7.7k): LLM foundations outline with video links and a glossary. No licence shown: **facts only**.
- d2l-ai/d2l-zh (above); GitHub topic "large-language-models" gave reference lists (LLMs-from-scratch, awesome AI guides). Reference only.
- Patterns worth copying: bilingual README, online-reading site, required vs elective split, a chapter status column.

## Which visual explainers work best

Techniques only.

1. **Distill-style live figures.** The reader moves a slider, picks a preset, or presses play and the same chart settles into a new shape next to the paragraph that explains it. A strip of tiny presets lets people compare cases in two clicks. Strength: builds intuition for hyperparameters. Cost: heavy pages (several would not even load headless), so keep widgets small and lazy. Best for optimizers, regularization, bias and variance, k-means, PCA, t-SNE.
2. **3B1B-style animation.** One continuous transformation where shapes morph, numbers flow, colour marks what changed, and only one new idea appears at a time. Narration carries the logic. A "read" mode with the script as text is a good accessibility twin. Best for backprop, gradient descent on a surface, attention as lookup, matrix multiplication as a geometric change. For us this is a scripted timeline in our own animation layer, or pre-rendered clips from Manim.
3. **Alammar-style illustrated diagrams.** A long page of still frames, each adding one element to the last, with the same colour for the same object throughout and tensors drawn as small labelled grids. Best for architecture walk-throughs and data flow. Cheapest to produce, works as a static page on mobile.
4. **StatQuest rhythm.** Main idea first, details second: model this as two-tier lessons, a 90-second story then a deep dive.
5. **Google crash-course mix.** Short animation, then an interactive playground, then a quiz, roughly ten minutes per page. Good model for module length and exercise cadence.

Recommendation: Alammar-style stepped diagrams by default, Distill-style sliders where one parameter really matters, and one scripted 3B1B-style animation as the flagship of each module.

## Proposed DSAMaxxing ML and data science curriculum

One animated story visual per module. Seeds are permissive only (credit on site); facts-only sources just confirm the topic list.

| # | Module | Topics | Animated story visual | Permissive seed (credit) |
|---|---|---|---|---|
| 1 | Math refreshers | vectors, matrices, derivatives, chain rule, probability, expectation | "The Mapmaker": a street grid is stretched, rotated and sheared by a matrix and landmarks show where they land; then a ball on a hill shows slope as derivative | Google crash course regression lessons (CC BY 4.0); d2l.ai preliminaries for topic order only (SA) |
| 2 | Data science: pandas and SQL | tables, indexing, group by, joins, missing values, cleaning | "The Warehouse Clerk": rows are crates on a conveyor; filters, joins and group-bys are gates that split or merge crates; a SQL query and the pandas line animate side by side | Kaggle/learntools tooling (Apache-2.0); write fresh exercises since lesson text is facts only |
| 3 | Classical ML | linear and logistic regression, trees, forests, k-means, PCA, evaluation, overfitting | "The Line Drawer": points, a fitted line, then an over-wiggly curve that fails on new points; a threshold slides along a confusion matrix | Google crash course (CC BY 4.0 text, Apache-2.0 code) |
| 4 | Deep learning | neurons, layers, activations, backprop, optimizers, CNNs, regularization | "The Signal Relay": a message passes forward through workers, then blame travels back and each worker nudges a dial; optimizer variants race down a landscape | Made-With-ML repo code (MIT); Distill-licensed ideas (CC-BY) with credit |
| 5 | NLP and transformers | tokens, embeddings, attention, encoder and decoder, positional information | "The Library Search": each word sends out a question, every other word holds a label, strongest matches light up; stepped frames | huggingface/course (Apache-2.0) chapters 1 and 6; Hands-On-LLM notebooks (Apache-2.0) |
| 6 | LLMs | pretraining, scaling, fine-tuning, RAG, agents, evaluation, safety | "The Apprentice": a model reads a library, then an instructor shows it how to reply; RAG is the apprentice running to a shelf before answering | huggingface/course ch. 11-12 (Apache-2.0); mlabonne/llm-course (Apache-2.0, already in ATTRIBUTION) |
| 7 | MLOps | data versioning, experiment tracking, testing, serving, monitoring, drift | "The Factory Line": a model leaves the lab on a truck, passes quality gates, a gauge watches for drift, an alarm sends it back | Made-With-ML (MIT) code and lesson order; FSDL topic order as facts only |
| 8 | Practice and capstones | mini-competitions, SQL drills, an end-to-end project | "The Season": a map where each module unlocks a stadium and the learner climbs a leaderboard | own content, with Kaggle's prerequisite-chain idea |

Order: 1, 2, 3, 4, 5, 6, 7, with 2 and 3 in parallel. Each module ships: the story visual, one interactive widget, a short quiz.

## Open questions

- Distill: confirm exact CC-BY version (2.0 on the one page seen) on each article before adapting.
- d2l-zh Apache-2.0 vs d2l-en CC BY-SA: read the LICENSE files.
- Kaggle robots.txt unreadable via REA; manual check advised.
- Monetization shapes seen in this niche: vendor-sponsored free micro-courses (DeepLearning.AI), supporter perks and early access (3B1B), live cohort upsell (Made With ML), study-guide and book sales (StatQuest).
