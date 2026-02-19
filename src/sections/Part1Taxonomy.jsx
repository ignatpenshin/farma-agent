import { TAXONOMY } from '../data/content';
import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

function TaxRow({ item }) {
  const isVeryLow = item.detectability === 'Very Low';
  return (
    <tr>
      <td>
        <span className="mono" style={{ color: item.dangerous ? 'var(--accent-heat)' : 'var(--text-main)' }}>
          {item.id}
        </span>
      </td>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td style={{ fontSize: '0.83rem', lineHeight: 1.5 }}>
        {item.desc}
        {item.ref && (
          <> (<Ref text={item.ref.text} url={item.ref.url} />)</>
        )}
        {item.refs && (
          <> ({item.refs.map((r, i) => (
            <span key={i}>
              {i > 0 && '; '}
              <Ref text={r.text} url={r.url} />
            </span>
          ))})</>
        )}
      </td>
      <td>
        <span className={`badge ${isVeryLow ? 'hot' : ''}`} style={{ margin: 0 }}>
          {item.detectability}
        </span>
      </td>
    </tr>
  );
}

export default function Part1Taxonomy() {
  return (
    <section id="part1">
      <h2 className="section-header">01 // Taxonomy of False Confidence</h2>

      <div className="task-question">
        Task: Name and classify all mechanisms through which the agent arrives at false confidence.
      </div>

      <p className="content-p">
        Ten mechanisms, three root categories. This list is intentionally framed as
        incomplete &mdash; deployment will reveal others.
      </p>

      <h3 className="subsection-header">A. Retrieval Failures &mdash; The agent finds the wrong evidence<Footnote id="rag" /></h3>
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th style={{ width: '180px' }}>Mechanism</th>
            <th>Description</th>
            <th style={{ width: '100px' }}>Detect.</th>
          </tr>
        </thead>
        <tbody>
          {TAXONOMY.retrieval.map(item => <TaxRow key={item.id} item={item} />)}
        </tbody>
      </table>

      <h3 className="subsection-header">B. Reasoning Failures &mdash; The agent misuses correct evidence</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th style={{ width: '180px' }}>Mechanism</th>
            <th>Description</th>
            <th style={{ width: '100px' }}>Detect.</th>
          </tr>
        </thead>
        <tbody>
          {TAXONOMY.reasoning.map(item => <TaxRow key={item.id} item={item} />)}
        </tbody>
      </table>

      <h3 className="subsection-header">C. Epistemic Blindness &mdash; The agent doesn&rsquo;t know what it doesn&rsquo;t know</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th style={{ width: '180px' }}>Mechanism</th>
            <th>Description</th>
            <th style={{ width: '100px' }}>Detect.</th>
          </tr>
        </thead>
        <tbody>
          {TAXONOMY.epistemic.map(item => <TaxRow key={item.id} item={item} />)}
        </tbody>
      </table>

      <div className="callout" style={{ marginTop: '2rem' }}>
        <strong>Engineering ceiling:</strong> B4, A3, C9<Footnote id="autoregressive" /> have no reliable automated mitigation.
        This sets the upper bound on what any architecture achieves without human review on every response.
      </div>
    </section>
  );
}
