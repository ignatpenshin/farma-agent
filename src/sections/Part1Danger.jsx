import Footnote from '../components/Footnote';

export default function Part1Danger() {
  return (
    <section id="part1-2">
      <h2 className="section-header">01.2 // Most Dangerous: Grounded Confabulation (B4)</h2>

      <div className="task-question">
        Task: Which mechanism is most dangerous? What distinguishes &ldquo;quiet&rdquo; from &ldquo;loud&rdquo; errors?
      </div>

      <p className="content-p">
        Every other mechanism has a detection surface &mdash; metadata (A1/A2/B6), NLI<Footnote id="nli" /> (C10),
        rules (B5), coverage analysis (C7). B4 has <strong>none</strong>.
      </p>

      <div className="verification-box">
        <div style={{ marginBottom: '0.5rem' }}>
          <span className="text-xs mono text-muted uppercase">Automated verification of a B4 answer:</span>
        </div>
        <div><span className="pass">{'\u2713'}</span> <span className="label">Faithfulness</span> &nbsp;&nbsp;Each claim traceable to source &nbsp;&nbsp;<span className="pass">PASS</span></div>
        <div><span className="pass">{'\u2713'}</span> <span className="label">Source check</span> &nbsp;&nbsp;Both studies real, correctly cited &nbsp;&nbsp;<span className="pass">PASS</span></div>
        <div><span className="pass">{'\u2713'}</span> <span className="label">Relevance</span> &nbsp;&nbsp;&nbsp;&nbsp;Both about oncology and tumor reduction &nbsp;&nbsp;<span className="pass">PASS</span></div>
        <div><span className="pass">{'\u2713'}</span> <span className="label">Factual</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Numbers match source documents &nbsp;&nbsp;<span className="pass">PASS</span></div>
        <div><span className="fail">{'\u2717'}</span> <span className="label">Logic</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cross-indication causal bridge invalid &nbsp;&nbsp;<span className="fail">FAIL</span></div>
        <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          No standard eval metric checks cross-source logical validity.
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Loud Error</th>
            <th>Quiet Error (B4)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Detection cost</td>
            <td>~$0 (automated lookup)</td>
            <td style={{ color: 'var(--accent-heat)' }}>Domain expert reading full chain</td>
          </tr>
          <tr>
            <td>Example</td>
            <td>Wrong drug name</td>
            <td>Correct facts, fabricated causal inference</td>
          </tr>
          <tr>
            <td>Trust effect</td>
            <td>Reduces trust (visible)</td>
            <td style={{ color: 'var(--accent-heat)' }}><strong>Builds false trust</strong> (invisible)</td>
          </tr>
        </tbody>
      </table>

      <p className="content-p" style={{ marginTop: '1.5rem' }}>
        B4 is the error that survives all verification and increases reliance on the system.
      </p>
    </section>
  );
}
