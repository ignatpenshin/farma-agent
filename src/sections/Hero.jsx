import Footnote from '../components/Footnote';

export default function Hero() {
  return (
    <section id="intro" className="hero">
      <div className="text-xs mono text-muted uppercase" style={{ marginBottom: '1rem' }}>
        Technical Task Response &mdash; Kiz8 &middot; AI &middot; Agentics &middot; Architecture
      </div>
      <h1 style={{
        fontSize: '2.5rem',
        lineHeight: 1.1,
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontFamily: 'var(--font-mono)',
      }}>
        Miscalibrated<br />
        Confidence<br />
        <span style={{ color: 'var(--text-muted)' }}>in Enterprise Pharma AI</span>
      </h1>

      <p className="content-p" style={{ fontSize: '1.05rem', maxWidth: '60ch' }}>
        The problem is not accuracy &mdash; it&rsquo;s calibration<Footnote id="calibration" />. The agent cannot distinguish its errors
        from correct answers. The solution: make failures <strong>predictable</strong> and <strong>recoverable</strong>,
        not eliminate them.
      </p>

      <div className="callout" style={{ marginTop: '2rem' }}>
        <strong>Intellectual honesty note.</strong>{' '}
        I am an AI Engineer, not a medical professional. System architecture, evaluation pipelines,
        calibration methodology, and cost modeling &mdash; my direct engineering experience.
        Clinical examples were researched with AI assistance and cross-referenced against public sources.
      </div>

      <div className="meta-grid">
        <div className="meta-item">
          <label>Architecture</label>
          <span>Layered RAG + Meta-Cognitive</span>
        </div>
        <div className="meta-item">
          <label>Domain</label>
          <span>Clinical Pharma</span>
        </div>
        <div className="meta-item">
          <label>Status</label>
          <span style={{ color: 'var(--accent-heat)' }}>CRITICAL REVIEW</span>
        </div>
      </div>
    </section>
  );
}
