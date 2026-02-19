import { SIGNALS } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part2Architecture() {
  return (
    <section id="part2">
      <h2 className="section-header">02 // System Architecture</h2>

      <p className="content-p">
        Make errors <strong>predictable</strong> (know when likely wrong) and <strong>recoverable</strong> (different
        response paths by confidence). Layer on top of the existing system &mdash; no RAG pipeline replacement.
      </p>

      <h3 className="subsection-header">2.1 Knowledge Boundary Detection</h3>

      <div className="task-question">
        Task: How does the agent determine a question exceeds reliable answering?
        Not &ldquo;document not found&rdquo; &mdash; subtle cases.
      </div>

      <p className="content-p">
        Six signals computed before generation, fed into a Meta-Cognitive Classifier (~300-600ms).
        This is NOT an LLM asking &ldquo;are you confident?&rdquo; &mdash; it&rsquo;s a multi-signal assessment
        where most signals are computed without LLM calls (NLI<Footnote id="nli" /> model, statistical analysis, NER<Footnote id="ner" />).
        Avoids the recursive calibration problem identified in{' '}
        <Ref text="Kadavath et al., 2022" url="https://arxiv.org/abs/2207.05221" />.
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '140px' }}>Signal</th>
            <th>Computation</th>
            <th style={{ width: '180px' }}>Detects</th>
            <th style={{ width: '150px' }}>Reference</th>
          </tr>
        </thead>
        <tbody>
          {SIGNALS.map(s => (
            <tr key={s.name}>
              <td><strong>{s.name}</strong></td>
              <td>{s.computation}</td>
              <td>{s.detects}</td>
              <td>
                {s.refs.map((r, i) => (
                  <div key={i}><Ref text={r.text} url={r.url} /></div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="content-p" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
        Source Agreement uses DeBERTa-v3<Footnote id="deberta" /> for NLI classification.
      </p>

      <div className="arch-flow mt-4">
        <div className="text-xs mono text-muted uppercase mb-1">PIPELINE FLOW</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
          <div className="flow-node" style={{ width: '100%' }}>User Query</div>
          <div className="flow-arrow">{'\u2193'}</div>
          <div className="flow-node" style={{ width: '100%' }}>Query Complexity Classifier</div>
          <div className="flow-arrow">{'\u2193'}</div>
          <div className="flow-node" style={{ width: '100%' }}>Existing RAG Pipeline + Reliability Envelope (2.2)</div>
          <div className="flow-arrow">{'\u2193'}</div>
          <div className="flow-node" style={{ width: '100%', borderColor: 'var(--accent-heat)' }}>
            Meta-Cognitive Classifier: 6 signals {'\u2192'} zone
          </div>
          <div className="flow-arrow">{'\u2193'}</div>
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%', flexWrap: 'wrap' }}>
            {[
              { label: 'GREEN', color: 'var(--zone-green)', desc: 'Direct answer + citations' },
              { label: 'YELLOW', color: 'var(--zone-yellow)', desc: 'Answer + caveats + gaps' },
              { label: 'ORANGE', color: 'var(--zone-orange)', desc: 'Structured disagreement' },
              { label: 'RED', color: 'var(--zone-red)', desc: 'Expert escalation' },
              { label: 'GRAY', color: 'var(--zone-gray)', desc: '"Cannot answer" + why' },
            ].map(z => (
              <div key={z.label} style={{
                flex: 1,
                minWidth: '80px',
                textAlign: 'center',
                padding: '0.5rem',
                border: `1px solid ${z.color}`,
                background: 'var(--bg-panel)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
              }}>
                <div style={{ color: z.color, fontWeight: 500 }}>{z.label}</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.65rem' }}>{z.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="content-p" style={{ marginTop: '1.5rem' }}>
        <strong>Subtle case handling:</strong>
      </p>
      <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#4a4a4a', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>&ldquo;Many documents, contradictory&rdquo; {'\u2192'} Source Agreement &lt; 0.6 {'\u2192'} ORANGE zone</li>
        <li>&ldquo;Causal inference needed, not in documents&rdquo; {'\u2192'} Query Complexity = &ldquo;causal&rdquo; + Coverage &lt; 0.85 {'\u2192'} RED zone</li>
      </ul>
    </section>
  );
}
