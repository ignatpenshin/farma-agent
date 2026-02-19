import { HORIZONS } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part2Calibration() {
  return (
    <section id="part2-4">
      <h3 className="subsection-header">2.4 Calibration Loop</h3>

      <div className="task-question">
        Task: How to improve calibration over time? Ground truth in pharma arrives with months of delay.
      </div>

      <p className="content-p">Four time horizons:</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Horizon</th>
            <th>Latency</th>
            <th>Signal</th>
            <th>Trust</th>
          </tr>
        </thead>
        <tbody>
          {HORIZONS.map(h => (
            <tr key={h.name}>
              <td style={h.highlight ? { color: 'var(--accent-heat)' } : {}}>{h.name}</td>
              <td>{h.latency}</td>
              <td>{h.signal}</td>
              <td>{h.trust}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mono text-sm mt-4 mb-1 text-muted uppercase">Calibration Model &mdash; Two-Stage Pipeline</h4>

      <p className="content-p">
        <strong>Stage 1:</strong> Logistic regression &mdash; 7 signal features {'\u2192'} raw confidence score.
        Why logistic: 200-400 labels/month won&rsquo;t support complex models. Interpretable weights required
        in regulated pharma. (<Ref text="Platt, 1999" url="https://www.cs.cornell.edu/courses/cs678/2007sp/platt.pdf" /> for Platt scaling<Footnote id="platt" /> analogy)
      </p>

      <p className="content-p">
        <strong>Stage 2:</strong> Isotonic regression<Footnote id="isotonic" /> &mdash; raw score {'\u2192'} calibrated probability.
        Corrects systematic over/under-confidence.
        (<Ref text="Zadrozny & Elkan, 2002" url="https://dl.acm.org/doi/10.1145/775047.775151" />)
      </p>

      <div className="diagram-box mt-2">
        <div className="text-xs mono text-muted uppercase mb-1">COLD-START<Footnote id="coldStart" /> PROTOCOL</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
          {[
            { label: 'Weeks 1-4', desc: 'Rule-based thresholds. ~15-20% escalation. Conservative.', pct: 18 },
            { label: 'Weeks 5-8', desc: 'First model on ~300 labels. Escalation \u2192 10-15%.', pct: 12 },
            { label: 'Month 3+', desc: 'Stabilized on 600+ labels. Escalation \u2192 7-10%.', pct: 8 },
          ].map(step => (
            <div key={step.label}>
              <div className="flex-between">
                <span className="text-xs mono">{step.label}</span>
                <span className="text-xs mono text-muted">{step.pct}% escalation</span>
              </div>
              <div className="heat-pipe">
                <div className="heat-pipe-fill" style={{
                  width: `${step.pct * 4}%`,
                  background: step.pct > 15
                    ? 'var(--accent-heat)'
                    : step.pct > 10
                    ? 'var(--zone-yellow)'
                    : 'var(--zone-green)',
                }} />
              </div>
              <div className="text-xs text-muted">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="content-p mt-2">
        <strong>Circuit breaker<Footnote id="circuitBreaker" />:</strong> Domain accumulates {'\u2265'}3 S2+ errors in 14 days {'\u2192'}
        force-route all queries to RED {'\u2192'} investigate {'\u2192'} fix {'\u2192'} re-close.
      </p>

      <h4 className="mono text-sm mt-4 mb-1 text-muted uppercase">Residual Risk</h4>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mechanism</th>
            <th>Addressed?</th>
            <th>Residual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B4 Grounded Confabulation</td>
            <td style={{ color: 'var(--accent-heat)' }}><strong>No</strong></td>
            <td>Irreducible floor (~3%)</td>
          </tr>
          <tr>
            <td>A3 Publication Bias</td>
            <td>Partially (registry cross-ref)</td>
            <td>Optimistic bias remains</td>
          </tr>
          <tr>
            <td>C9 Confidence Lock-In</td>
            <td>
              Partially (prompts + <Ref text="self-consistency" url="https://arxiv.org/abs/2203.11171" /><Footnote id="selfConsistency" />)
            </td>
            <td>Reduced</td>
          </tr>
        </tbody>
      </table>

      <div className="callout mt-2">
        <strong>Client decision:</strong> Is ~3% undetectable error rate acceptable? Architecture compresses
        &ldquo;15% unpredictable&rdquo; {'\u2192'} &ldquo;~3% unpredictable + ~2-4% correctly flagged.&rdquo;
      </div>

      <h4 className="mono text-sm mt-4 mb-1 text-muted uppercase">Regulatory Constraints</h4>

      <p className="content-p">
        Not optional overhead &mdash; constrains architecture. But most requirements are good engineering practice.
      </p>

      <ul style={{ paddingLeft: '1.5rem', fontSize: '0.88rem', color: '#4a4a4a', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        <li>
          <strong>EU AI Act</strong> (<Ref text="Regulation 2024/1689" url="https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng" />):
          High-risk classification likely. Risk documentation, transparency, human oversight required.
        </li>
        <li>
          <strong>21 CFR Part 11</strong> (<Ref text="FDA" url="https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11" />):
          Audit trail, system validation, change control. Threshold adjustments need human approval.
        </li>
        <li>
          <strong>ALCOA+<Footnote id="alcoa" /> data integrity</strong>{' '}
          (<Ref text="FDA Guidance" url="https://www.fda.gov/media/119570/download" />;{' '}
          <Ref text="WHO TRS 1033" url="https://www.who.int/publications/m/item/annex-4-trs-1033" />):
          Every response traceable to specific documents, model version, threshold configuration.
        </li>
      </ul>
    </section>
  );
}
