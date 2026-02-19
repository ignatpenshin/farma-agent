const FOOTNOTES = {
  calibration: {
    term: 'Calibration',
    text: 'A calibration problem is distinct from an accuracy problem. The issue is not that the agent makes errors\u2009\u2014\u2009it\u2019s that errors and correct answers are indistinguishable from the outside. A well-calibrated system with 85% accuracy is safer than a miscalibrated one with 90%: it says "95% sure" only when it\u2019s actually right 95% of the time. ECE becomes measurable only after the system produces explicit confidence scores.',
  },
  rag: {
    term: 'RAG',
    text: 'Retrieval-Augmented Generation\u2009\u2014\u2009the agent doesn\u2019t answer from memory alone. It first retrieves relevant documents from a knowledge base (embed the query, find similar chunks), then generates a response grounded in those documents. The pipeline: query \u2192 embed \u2192 top-k retrieval \u2192 generate. Errors can enter at any stage.',
  },
  embeddings: {
    term: 'Embeddings',
    text: 'Dense vector representations that map text into a high-dimensional space where semantically similar texts are close together. The problem: "similar" is defined by language patterns, not domain logic. "Pembrolizumab in NSCLC" and "pembrolizumab in melanoma" are close in embedding space (same drug, overlapping language) despite having completely different efficacy data. The retrieval score can be 0.91 for the wrong indication.',
  },
  nli: {
    term: 'NLI',
    text: 'Natural Language Inference\u2009\u2014\u2009a classification task: given two texts (premise and hypothesis), determine if the relationship is entailment, contradiction, or neutral. Used here to detect whether retrieved documents agree or disagree. The practical pipeline runs pairwise NLI on retrieved chunks using a cross-encoder model, catching explicit contradictions like "Drug X improved OS" vs. "Drug X showed no OS benefit."',
  },
  grade: {
    term: 'GRADE',
    text: 'Grading of Recommendations, Assessment, Development and Evaluations\u2009\u2014\u2009the standard framework for rating evidence quality in medicine. Hierarchy: systematic review (highest) > Phase III RCT > Phase II > cohort study > case series > expert opinion. A single negative Phase III RCT (n=1,800) outweighs five positive case series (n=35 total). The agent must respect this hierarchy, not count publications.',
  },
  autoregressive: {
    term: 'Autoregressive generation',
    text: 'LLMs generate text one token at a time, each conditioned on all previous tokens. Once the model starts with confident framing ("Based on the available evidence, Drug X demonstrates..."), subsequent tokens are statistically pulled toward maintaining that confident tone\u2009\u2014\u2009regardless of actual evidence strength. This is a mechanical property of the architecture, not a reasoning failure.',
  },
  auroc: {
    term: 'AUROC',
    text: 'Area Under the Receiver Operating Characteristic curve. Measures how well a score (here: the system\u2019s confidence) separates two classes (correct vs. incorrect answers). AUROC = 0.50 means the confidence score is random noise; 0.85 means when the system says "high confidence," it\u2019s reliably correct, and when it says "low confidence," it\u2019s reliably wrong. This is what EDS measures.',
  },
  isotonic: {
    term: 'Isotonic regression',
    text: 'A non-parametric calibration method that fits a monotonically increasing piecewise-constant function mapping raw scores to calibrated probabilities. Unlike parametric approaches, it makes no distributional assumptions\u2009\u2014\u2009it simply ensures that if the raw score is higher, the calibrated probability is at least as high. Trained on (raw_score, binary_correctness) pairs from expert reviews to correct systematic over- or under-confidence.',
  },
  platt: {
    term: 'Platt scaling',
    text: 'A calibration technique that fits a logistic regression on model outputs to produce calibrated probabilities. Originally designed for SVMs (Platt, 1999). Here the analogy applies to Stage 1: logistic regression maps 7 signal features to a raw confidence score. Chosen because 200\u2013400 labeled samples per month won\u2019t support more complex models, and interpretable weights are required in regulated pharma.',
  },
  bm25: {
    term: 'BM25',
    text: 'Best Matching 25\u2009\u2014\u2009a classical sparse retrieval algorithm based on term frequency. Unlike dense embeddings which capture semantic similarity, BM25 matches exact terms. Critical in pharma for drug names (pembrolizumab), gene names (EGFR), and trial IDs (NCT numbers) where a single-character difference means a completely different entity. Used alongside dense retrieval as a complementary signal.',
  },
  ner: {
    term: 'Medical NER',
    text: 'Named Entity Recognition\u2009\u2014\u2009extracting structured entities (drug names, diseases, genes, endpoints) from unstructured text. SciSpacy\u2019s en_core_sci_lg model is used here. Limitation: ~85% F1, meaning the coverage ratio signal is noisy. A 4-concept query could report 0.75 coverage when true coverage is 1.0 (NER missed a concept that IS present). Thresholds include margin for this noise.',
  },
  deberta: {
    term: 'DeBERTa-v3',
    text: 'Decoding-enhanced BERT with disentangled attention (v3). A 184M-parameter cross-encoder model (cross-encoder/nli-deberta-v3-base) used for NLI classification. Latency: ~100\u2013200ms for k=10 chunks (45 pairs, batched on GPU). Catches ~60\u201370% of real disagreements at chunk level. When ambiguous (agreement 0.5\u20130.7), the system escalates to conclusion-focused re-retrieval or claim-level NLI.',
  },
  kappa: {
    term: "Cohen\u2019s Kappa",
    text: 'A statistical measure of inter-rater agreement that accounts for chance agreement. Kappa = 1 means perfect agreement, 0 means agreement no better than random chance. Used here to measure per-dimension agreement between the LLM judge and human experts. No pharma-specific LLM-judge benchmarks exist for these dimensions\u2009\u2014\u2009building this measurement IS the work.',
  },
  alcoa: {
    term: 'ALCOA+',
    text: 'FDA data integrity framework: Attributable (who created it), Legible (readable), Contemporaneous (recorded at the time), Original (first record), Accurate (correct). The "+" adds: Complete, Consistent, Enduring, Available. Every agent response must be traceable to the specific documents, model version, and threshold configuration that produced it. Not optional in pharma\u2009\u2014\u2009audit failure can halt operations.',
  },
  activeLearning: {
    term: 'Active learning',
    text: 'A machine learning paradigm where the model selects which examples to send for human labeling, prioritizing uncertain or high-value cases. Here applied to evaluation: instead of randomly sampling responses for expert review, the system strategically selects cases where the judge is least confident or where calibration data is most needed. Minimizes expert cost while maximizing calibration improvement.',
  },
  selfConsistency: {
    term: 'Self-consistency',
    text: 'Generate N=5 responses at temperature=0.7 and measure agreement between conclusions. If all five converge on the same answer, confidence is high. If they diverge, the query triggers genuine uncertainty. Catches C10 (contradiction suppression)\u2009\u2014\u2009different runs resolve contradictions differently. Does NOT catch B4 (all runs may make the same confabulation). Costs 5x in LLM calls.',
  },
  mechInterp: {
    term: 'Mechanistic interpretability',
    text: 'Research into understanding the internal computational mechanisms of neural networks\u2009\u2014\u2009finding representations that separate "the model knows X" from "the model is pattern-completing plausible text." CCS probes for latent knowledge without supervision; representation engineering manipulates model behavior through representation space; ITI intervenes at inference time on truthfulness directions. If generalized to RAG, this would provide an intrinsic confidence signal, making the Meta-Cognitive Classifier obsolete.',
  },
  circuitBreaker: {
    term: 'Circuit breaker',
    text: 'A safety pattern borrowed from electrical engineering. If a domain accumulates \u22653 severity S2+ errors within a 14-day window, ALL queries in that domain are force-routed to RED (expert review required). The system stays in this state until operations investigates the root cause, applies a fix, and manually re-closes the circuit. Prevents systematic failure from silently compounding.',
  },
  coldStart: {
    term: 'Cold start',
    text: 'The initial deployment period when the calibration model has no training data. Weeks 1\u20134: rule-based zone assignment with conservative thresholds, ~15\u201320% of queries escalated. Weeks 5\u20138: first model trained on ~300 expert labels, escalation drops to 10\u201315%. Month 3+: model stabilizes on 600+ labels, reaching target 7\u201310% escalation. The client must accept initial over-escalation as the system learns.',
  },
  publicationBias: {
    term: 'Publication bias',
    text: 'Positive studies are more likely to be published than negative ones. If 10 trials are conducted but only the 6 positive ones get published, the knowledge base presents a structurally distorted picture. The agent sees 100% positive results; the true success rate may be ~43%. Registry cross-reference (ClinicalTrials.gov) can flag: "4 registered trials have no published results"\u2009\u2014\u2009doesn\u2019t solve the bias, but makes it visible.',
  },
  reliabilityEnvelope: {
    term: 'Reliability envelope',
    text: 'A structured metadata package computed on retrieved documents BEFORE the LLM generates a response. Contains: source agreement score (do documents agree?), coverage ratio (are all query concepts addressed?), evidence level distribution (quality of sources), temporal profile (evolving evidence?), retrieval statistics (confidence in retrieval quality), and publication bias flags. This envelope feeds the Meta-Cognitive Classifier for zone assignment.',
  },
  hitl: {
    term: 'HITL',
    text: 'Human-In-The-Loop\u2009\u2014\u2009routing certain queries to human experts for review. The architecture targets 7\u201310% human involvement at maturity. Critical insight: HITL is not a failure of automation but a design feature. For ORANGE/RED zones, the system prepares a structured briefing that reduces expert decision time from hours to minutes. The goal is not zero human involvement\u2009\u2014\u2009it\u2019s maximizing the value of each human review.',
  },
};

export default FOOTNOTES;
