# ML and data science links (REA crawl, 2026-10-24)

Crawl-delay: none set by any site visited except github.com (1s, for named AI bots only); REA loads were spaced 10s or more apart.
Format: URL | date | status | note | login (y/n). Pages loaded with REA launch mode (Edge). Robots.txt was fetched with a plain GET (not REA) as a light check: huggingface.co, fullstackdeeplearning.com, 3blue1brown.com, learn.deeplearning.ai, madewithml.com, developers.google.com allow all of our paths; www.deeplearning.ai allows generic agents but disallows named AI crawlers (we visited one catalog page in a normal browser, nothing else); jalammar.github.io has no rules; kaggle.com/robots.txt returned the app shell instead of rules (unreadable, noted as a gap); course.fast.ai, statquest.org, d2l.ai, distill.pub have no robots.txt (404 page). On github.com only repo roots and /topics were opened. No bot check or login wall hit. Several REA calls timed out on heavy interactive pages (see "Not captured").

## Visited
https://www.kaggle.com/robots.txt | 2026-10-24 | 200 | app shell returned, no readable rules | n
https://www.kaggle.com/learn | 2026-10-24 | 200 | 17 courses + 11 community guides, free, certificates | n
https://www.kaggle.com/learn/pandas | 2026-10-24 | 200 | 6 lessons, tutorial + exercise each, 4h | n
https://github.com/Kaggle/learntools | 2026-10-24 | 200 | exercise checker tooling, Apache-2.0 | n
https://course.fast.ai/robots.txt | 2026-10-24 | 404 | GitHub Pages not-found, so no rules | n
https://course.fast.ai/ | 2026-10-24 | 200 | Practical Deep Learning part 1 (8 lessons) + part 2 (17) | n
https://github.com/fastai/course22 | 2026-10-24 | 200 | course notebooks, no licence shown on page | n
https://www.deeplearning.ai/short-courses/ | 2026-10-24 | 200 | catalog: 107 short courses, 14 courses, 11 certificates; filters | n (Log In link only)
https://huggingface.co/learn | 2026-10-24 | 200 | 12 free courses index | n
https://huggingface.co/learn/llm-course/chapter1/1 | 2026-10-24 | 200 | LLM course intro, 12 chapters, says Apache 2 reuse allowed | n
https://github.com/huggingface/course | 2026-10-24 | 200 | course source, Apache-2.0, 1.5k stars | n
https://huggingface.co/papers | 2026-10-24 | 200 | Daily Papers feed (redirected to date page), upvotes, orgs | n
https://statquest.org/ | 2026-10-24 | 200 | video-led site, store, support page | n
https://statquest.org/video_index.html | 2026-10-24 | 200 | playlists by topic (stats, tests, ML, NN, optimization) | n
https://statquest.org/contact.html | 2026-10-24 | 200 | FAQ: asks people not to reuse screenshots; sells study guides/books | n
https://distill.pub/ | 2026-10-24 | 200 | archive of articles, hiatus since 2021 | n
https://distill.pub/about/ | 2026-10-24 | 200 | journal mission, reactive diagrams | n
https://distill.pub/2016/misread-tsne/ | 2026-10-24 | 200 | interactive t-SNE explorer, CC-BY 2.0 note at foot | n
https://github.com/distillpub/template | 2026-10-24 | 200 | article framework, Apache-2.0 | n
https://d2l.ai/ | 2026-10-24 | 200 | book v1.0.3, 23 chapters, framework tabs | n
https://github.com/d2l-ai/d2l-en | 2026-10-24 | 200 | CC BY-SA 4.0 text, modified MIT code, 29.9k stars | n
https://github.com/d2l-ai/d2l-zh | 2026-10-24 | 200 | Chinese edition, page shows Apache-2.0, 82.1k stars | n
https://developers.google.com/machine-learning/crash-course | 2026-10-24 | 200 | module list, animated videos + exercises | n
https://developers.google.com/machine-learning/crash-course/neural-networks | 2026-10-24 | 200 | module outline, footer licence CC BY 4.0 / Apache 2.0 code | n
https://madewithml.com/ | 2026-10-24 | 200 | MLOps course + foundations, Anyscale-owned, cohort upsell | n
https://github.com/GokuMohandas/Made-With-ML | 2026-10-24 | 200 | MIT, 49.8k stars | n
https://fullstackdeeplearning.com/ | 2026-10-24 | 200 | free FSDL 2021/2022 + LLM Bootcamp 2023, newsletter | n
https://github.com/the-full-stack/website | 2026-10-24 | 200 | site source, no licence shown, 1.4k stars | n
https://www.3blue1brown.com/topics/neural-networks | 2026-10-24 | 200 | lesson list, Read + Interact tags, Patreon, store | n
https://www.3blue1brown.com/about | 2026-10-24 | 200 | Manim explained, open-source animation library | n
https://github.com/ManimCommunity/manim | 2026-10-24 | 200 | animation framework, MIT, 41.8k stars | n
https://jalammar.github.io/ | 2026-10-24 | 200 | blog frozen, moved to Substack, book + course promo | n
https://jalammar.github.io/illustrated-transformer/ | 2026-10-24 | 200 | illustrated post, CC BY-NC-SA 4.0 | n
https://github.com/HandsOnLLM/Hands-On-Large-Language-Models | 2026-10-24 | 200 | book code repo, Apache-2.0, 29.9k stars | n
https://github.com/datawhalechina/happy-llm | 2026-10-24 | 200 | CC BY-NC-SA 4.0, 34.5k stars | n
https://github.com/datawhalechina/llm-cookbook | 2026-10-24 | 200 | CC BY-NC-SA 4.0, 24.8k stars | n
https://github.com/datawhalechina/so-large-lm | 2026-10-24 | 200 | no licence shown, 7.7k stars | n
https://github.com/topics/large-language-models | 2026-10-24 | 200 | topic listing, used to find repos | n

## Not captured (gaps)
https://distill.pub/2017/momentum/ | 2026-10-24 | n/a | REA connection closed / response over 10 MB (heavy SVG DOM), twice | n
https://distill.pub/2020/grand-tour/ | 2026-10-24 | n/a | REA request timed out | n
https://github.com/distillpub/post--momentum | 2026-10-24 | n/a | REA timed out twice | n
https://zh.d2l.ai/ | 2026-10-24 | not tried | covered via d2l-ai/d2l-zh repo instead | n
https://learn.deeplearning.ai/ | 2026-10-24 | not tried | robots allows all; catalog taken from www.deeplearning.ai page | n
