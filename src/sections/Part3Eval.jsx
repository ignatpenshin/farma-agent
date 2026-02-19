import { EVAL_DIMENSIONS } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part3Eval() {
  return (
    <section id="part3">
      <h2 className="section-header">03 // Eval for Eval</h2>

      <div className="task-question">
        Task (Variant B): LLM-as-a-judge evaluates agent answers. Judge is also an LLM with the same
        calibration problems. How to validate the judge?
      </div>

      <h4 className="subsection-header">The Paradox</h4>

      <p className="content-p">
        The judge has the same failure modes. Research shows LLM judges exhibit: verbosity bias,
        position bias, self-enhancement bias, surface feature bias
        (<Ref text="Zheng et al., 2023" url="https://arxiv.org/abs/2306.05685" />).
        In pharma, a judge rewarding confident well-structured answers <strong>optimizes for
        the failure mode</strong> we&rsquo;re trying to prevent.
      </p>

      <h4 className="subsection-header">Solution: Decompose, Anchor, Route</h4>

      <p className="content-p">
        <strong>Step 1 &mdash; Decompose evaluation into dimensions</strong> with different reliability profiles.
        Principle: don&rsquo;t ask the LLM to evaluate where it demonstrably fails.
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>LLM Judge Reliability</th>
            <th>Best Evaluator</th>
          </tr>
        </thead>
        <tbody>
          {EVAL_DIMENSIONS.map(d => (
            <tr key={d.dimension}>
              <td>
                {d.dimension}
                {d.refUrl && (
                  <> <Ref text={d.refText} url={d.refUrl} /></>
                )}
              </td>
              <td style={d.dangerous ? { color: 'var(--accent-heat)' } : {}}>
                {d.reliability}
              </td>
              <td>{d.evaluator}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="content-p">
        <strong>Step 2 &mdash; Build Epistemic Anchor (Golden Dataset):</strong> 500 expert-annotated tuples,
        3 months. Including <strong>50 adversarial cases</strong> &mdash; grounded confabulations and statistical
        misinterpretations designed to fool the judge. If judge scores these highly {'\u2192'} systematic blind spot discovered.
      </p>

      <div className="diagram-box">
        <div className="flex-between mb-1">
          <span className="text-xs mono text-muted uppercase">Golden Dataset Cost</span>
          <span className="text-xs mono" style={{ color: 'var(--accent-heat)' }}>$19K-$75K</span>
        </div>
        <div className="text-xs text-muted">Non-negotiable. Without it, evaluation is built on sand.</div>
      </div>

      <p className="content-p">
        <strong>Step 3 &mdash; Measure judge per dimension:</strong> Run 3 configurations (different models {'\u00d7'} prompting strategies).
        Per-dimension{' '}
        <Ref text="Cohen's Kappa" url="https://journals.sagepub.com/doi/10.1177/001316446002000104" /><Footnote id="kappa" /> vs. expert.
        No pharma-specific LLM-judge benchmarks exist &mdash; building this measurement IS the work.
      </p>

      <p className="content-p">
        <strong>Step 4 &mdash; Route by reliability:</strong>
      </p>

      <div className="code-block" data-label="ROUTING">
{`FAITHFULNESS         → Judge ensemble (automated)
SOURCE ACCURACY      → Deterministic checker (automated)
COMPLETENESS         → Judge ensemble (automated)
LOGICAL VALIDITY     → Human expert (ORANGE/RED + 10% YELLOW)
STATISTICAL INTERP.  → Rule-based + human for edge cases
CLINICAL APPROP.     → Human expert for non-GREEN`}
      </div>

      <p className="content-p">
        Judge runs <strong>asynchronously</strong> on every response &mdash; monitoring tool, not real-time gate.
        Real-time prevention comes from Meta-Cognitive Classifier (Layer 1).
      </p>

      <p className="content-p">
        <strong>Step 5 &mdash; Continuous monitoring:</strong> Weekly, 25 responses evaluated by both judge and expert.
        Rolling agreement window (4 weeks). Drift alert if per-dimension agreement drops.
      </p>

      <h4 className="subsection-header">Three-Layer Confidence Architecture</h4>

      <div className="arch-flow">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flow-node" style={{ borderColor: 'var(--accent-heat)' }}>
            <div className="text-xs mono uppercase" style={{ color: 'var(--accent-heat)' }}>Layer 1</div>
            <div>Meta-Cognitive Classifier (real-time, ~400ms)</div>
            <div className="text-xs text-muted">6 signals {'\u2192'} zone assignment {'\u2192'} user sees response</div>
          </div>
          <div className="flow-node">
            <div className="text-xs mono uppercase text-muted">Layer 2</div>
            <div>LLM Judge (async, post-hoc, every response)</div>
            <div className="text-xs text-muted">Faithfulness + source accuracy + completeness</div>
          </div>
          <div className="flow-node">
            <div className="text-xs mono uppercase text-muted">Layer 3</div>
            <div>Reliability Map (offline, updated weekly)</div>
            <div className="text-xs text-muted">Per-dimension judge trustworthiness from golden dataset</div>
          </div>
          <div style={{
            padding: '0.75rem 1rem',
            border: '1px dashed var(--line-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}>
            FEEDBACK: Layer 2 {'\u2192'} Layer 1 calibration &nbsp;|&nbsp;
            Layer 3 {'\u2192'} Layer 2 routing &nbsp;|&nbsp;
            Expert reviews {'\u2192'} golden dataset {'\u2192'} all layers
          </div>
        </div>
      </div>

      <p className="content-p">
        <strong>Recursion terminates at:</strong> human ground truth (golden dataset), deterministic checks
        (source verification, stat rules), real-world outcomes (trial results). Minimizing human effort while
        maximizing automated coverage is an{' '}
        <Ref text="active learning" url="https://burrsettles.com/pub/settles.activelearning.pdf" /><Footnote id="activeLearning" /> problem.
      </p>

      <div className="diagram-box">
        <div className="flex-between">
          <span className="text-xs mono text-muted uppercase">Automated eval cost</span>
          <span className="text-xs mono">~$90-300/month at 1,000 responses/month</span>
        </div>
      </div>
    </section>
  );
}
