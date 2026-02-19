# Miscalibrated Confidence in Enterprise Pharma AI

Interactive technical document exploring how to build reliable pharmaceutical AI agents that accurately assess their own confidence.

**Live:** [ignatpenshin.github.io/pharma-agent](https://ignatpenshin.github.io/pharma-agent/)

## Problem

Enterprise pharma AI agents suffer from **miscalibrated confidence** — claiming high certainty on errors and low certainty on correct answers. This document presents a system architecture that makes failures **predictable** and **recoverable** rather than attempting to eliminate them.

## What's Inside

1. **Taxonomy of False Confidence** — 10 failure mechanisms across retrieval, reasoning, and epistemic blindness categories
2. **System Architecture** — Layered RAG + Meta-Cognitive Classifier with 6 pre-generation signals
3. **5-Zone Response System** — GREEN/YELLOW/ORANGE/RED/GRAY confidence zones with distinct response behaviors and human-in-the-loop routing
4. **Calibration Pipeline** — Two-stage confidence model (logistic regression → isotonic regression) with cold-start protocol
5. **Eval-for-Eval** — How to evaluate the evaluator: golden datasets, per-dimension reliability, inter-annotator agreement
6. **Hard Questions** — Honest gaps that engineering alone cannot close

30+ peer-reviewed references. All links verified.

## Features

- Interactive footnotes explaining technical terms (calibration, RAG, NLI, GRADE, AUROC, etc.)
- Scroll-tracking navigation rail
- Context sidebar with key metrics and zone distribution
- Responsive layout (desktop → tablet → phone)
- Color-coded confidence zones throughout

## Tech

React 19 · Vite · Vanilla CSS · GitHub Pages

## Run Locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Author

**Ignat Penshin** — AI Engineer
