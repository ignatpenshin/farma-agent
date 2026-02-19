import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part4Hard() {
  return (
    <section id="part4">
      <h2 className="section-header">04 // Hard Questions</h2>

      <div className="task-question">
        Task: Position + one sentence. No elaborate answers.
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h4 className="subsection-header">4.1 When would I refuse to deploy?</h4>
        <p className="content-p">
          If Escalation Recall for S3 errors (drug safety) &lt; 0.80 &mdash; meaning &gt;1 in 5 safety-critical errors
          passes without flagging. A system where humans stop checking is worse than no system where humans do all the work.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h4 className="subsection-header">4.2 Which architectural decision is most vulnerable?</h4>
        <p className="content-p">
          Zone assignment thresholds (agreement &lt; 0.6 {'\u2192'} Orange, coverage &lt; 0.7 {'\u2192'} Yellow) &mdash;
          engineering guesses, wrong on day 1. Left as interpretable rules because: no training data at cold start<Footnote id="coldStart" />,
          rules are auditable in regulated pharma
          (<Ref text="21 CFR Part 11" url="https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11" />);
          the calibration loop
          (<Ref text="Zadrozny & Elkan, 2002" url="https://dl.acm.org/doi/10.1145/775047.775151" />) corrects them
          by week 8, but the gap risks losing client trust.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h4 className="subsection-header">4.3 Unlimited research budget?</h4>
        <p className="content-p">
          Mechanistic interpretability<Footnote id="mechInterp" /> of epistemic states in transformers &mdash; internal representations
          separating &ldquo;knows X&rdquo; from &ldquo;pattern-completing plausible text.&rdquo;{' '}
          <Ref text="CCS (Burns et al., 2022)" url="https://arxiv.org/abs/2212.03827" />,{' '}
          <Ref text="representation engineering (Zou et al., 2023)" url="https://arxiv.org/abs/2310.01405" />, and{' '}
          <Ref text="ITI (Li et al., 2023)" url="https://arxiv.org/abs/2306.03341" /> show this is tractable narrowly.
          Generalized to RAG<Footnote id="rag" />, it gives an <em>intrinsic</em> confidence signal &mdash; making the Meta-Cognitive
          Classifier obsolete and collapsing the B4 residual risk.
        </p>
      </div>
    </section>
  );
}
