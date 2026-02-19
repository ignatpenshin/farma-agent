import { METRICS } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part1Metrics() {
  return (
    <section id="part1-3">
      <h2 className="section-header">01.3 // Redefining &ldquo;15% Errors&rdquo;</h2>

      <div className="task-question">
        Task: What is the client measuring? How to make it actionable?
      </div>

      <p className="content-p">
        <strong>What they measure:</strong> Experts spot-check ~200 responses, flag ~30 wrong. Single rate,
        no decomposition. No severity weighting, no calibration signal, no failure-type breakdown.
      </p>

      <p className="content-p">
        <strong>Four replacement metrics:</strong>
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Metric</th>
            <th>Definition</th>
            <th>Why It Matters</th>
            <th style={{ width: '90px' }}>Min</th>
            <th style={{ width: '90px' }}>Mature</th>
          </tr>
        </thead>
        <tbody>
          {METRICS.map(m => (
            <tr key={m.abbr}>
              <td>
                <span className="badge hot" style={{ margin: 0 }}>{m.abbr}</span>
              </td>
              <td>
                {m.definition}
                {m.refs.length > 0 && (
                  <div style={{ marginTop: '0.25rem' }}>
                    {m.refs.map((r, i) => (
                      <span key={i}>
                        {i > 0 && ' '}
                        <Ref text={r.text} url={r.url} />
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td>{m.why}</td>
              <td className="mono">{m.min}</td>
              <td className="mono">{m.mature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout" style={{ marginTop: '2rem' }}>
        <strong>Target shift:</strong> From &ldquo;reduce 15% error rate&rdquo; &rarr;
        &ldquo;achieve EDS<Footnote id="auroc" /> &gt; 0.85 and Escalation Recall &gt; 0.90 on S2+S3.&rdquo;
      </div>

      <div className="diagram-box mt-2">
        <div className="flex-between mb-1">
          <span className="text-xs mono uppercase text-muted">Miscalibrated (Current)</span>
          <span className="text-xs mono" style={{ color: 'var(--accent-heat)' }}>ECE = 0.135</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Says &ldquo;95% sure&rdquo; but right only 80% of the time
        </div>
        <div className="heat-pipe">
          <div className="heat-pipe-fill" style={{
            width: '80%',
            background: 'linear-gradient(90deg, var(--accent-heat-dim), var(--accent-heat))',
            boxShadow: '0 0 10px var(--accent-heat-glow)',
          }} />
        </div>

        <div className="flex-between mb-1" style={{ marginTop: '1.5rem' }}>
          <span className="text-xs mono uppercase text-muted">Well-Calibrated (Target)</span>
          <span className="text-xs mono" style={{ color: 'var(--zone-green)' }}>ECE = 0.020</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Same 85% accuracy &mdash; system <em>knows when</em> it doesn&rsquo;t know
        </div>
        <div className="heat-pipe">
          <div className="heat-pipe-fill" style={{ width: '85%', background: 'var(--zone-green)' }} />
        </div>
      </div>
    </section>
  );
}
