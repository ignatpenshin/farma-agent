import { ZONES, DISTRIBUTION } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part2Zones() {
  return (
    <section id="part2-3">
      <h3 className="subsection-header">2.3 Failure Taxonomy in Architecture</h3>

      <div className="task-question">
        Task: Classification of failure types. For each &mdash; different response path. Minimum 4 classes.
      </div>

      <p className="content-p">Five zones, five behaviors:</p>

      <div style={{ marginBottom: '2rem' }}>
        {ZONES.map(z => (
          <div className="zone-row" key={z.name}>
            <div>
              <span className={`badge ${z.color}`} style={{ margin: 0 }}>{z.name}</span>
            </div>
            <div>
              <div style={{ fontSize: '0.83rem', color: '#4a4a4a', marginBottom: '0.25rem' }}>
                <strong>Trigger:</strong> {z.trigger}
              </div>
              <div style={{ fontSize: '0.83rem', color: '#4a4a4a', marginBottom: '0.25rem' }}>
                <strong>Response:</strong> {z.response}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <strong>HITL:</strong> {z.hitl}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="callout">
        <strong>ORANGE zone detail</strong> (going beyond &ldquo;show both opinions&rdquo;):<br />
        1. <strong>Extract</strong> from each source: design, n, population, endpoint + result + CI<br />
        2. <strong>Weight</strong> by evidence hierarchy<Footnote id="grade" /> {'\u00d7'} sample size {'\u00d7'} recency (<Ref text="GRADE" url="https://pmc.ncbi.nlm.nih.gov/articles/PMC2335261/" />)<br />
        3. <strong>Score</strong> positions: Position A = {'\u03a3'} weights supporting. Position B = {'\u03a3'} weights opposing<br />
        4. <strong>Analyze</strong> WHY studies disagree &mdash; dose? population? endpoint?<br />
        5. <strong>State boundary:</strong> Engineering ends where causal reasoning beyond evidence begins
      </div>

      <h4 className="mono text-sm mt-4 mb-1 text-muted uppercase">Expected Distribution</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Cold Start</th>
            <th>Mature</th>
          </tr>
        </thead>
        <tbody>
          {DISTRIBUTION.map(d => (
            <tr key={d.zone} style={d.highlight ? { borderTop: '2px solid var(--line-dim)' } : {}}>
              <td style={d.highlight ? { fontWeight: 500, color: 'var(--text-main)' } : {}}>
                {d.zone}
              </td>
              <td>{d.cold}</td>
              <td>{d.mature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="content-p" style={{ marginTop: '1rem' }}>
        Client constraint met: 7-10% routed to humans<Footnote id="hitl" /> at maturity (within the 5-10% budget).
      </p>
    </section>
  );
}
