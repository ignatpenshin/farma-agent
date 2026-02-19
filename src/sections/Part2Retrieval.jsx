import Ref from '../components/Ref';
import Footnote from '../components/Footnote';

export default function Part2Retrieval() {
  return (
    <section id="part2-2">
      <h3 className="subsection-header">2.2 Uncertainty-Aware Retrieval</h3>

      <div className="task-question">
        Task: Change retrieval layer to return not just relevance but reliability signal.
      </div>

      <p className="content-p">
        <strong>Standard:</strong>{' '}
        <span className="mono text-sm">query {'\u2192'} embed {'\u2192'} top-k {'\u2192'} generate</span>
      </p>
      <p className="content-p">
        <strong>Proposed:</strong>{' '}
        <span className="mono text-sm">query {'\u2192'} embed {'\u2192'} top-k {'\u2192'} compute reliability envelope<Footnote id="reliabilityEnvelope" /> {'\u2192'} return (docs, envelope)</span>
      </p>

      <p className="content-p">Three retrieval modes combined:</p>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div className="diagram-box" style={{ flex: 1, minWidth: '150px' }}>
          <div className="text-xs mono text-muted uppercase mb-1">Dense</div>
          <div className="text-sm">Embeddings<Footnote id="embeddings" /> &mdash; semantic similarity</div>
          <div style={{ marginTop: '0.5rem' }}><Ref text="RAG, Lewis et al." url="https://arxiv.org/abs/2005.11401" /></div>
        </div>
        <div className="diagram-box" style={{ flex: 1, minWidth: '150px' }}>
          <div className="text-xs mono text-muted uppercase mb-1">Sparse</div>
          <div className="text-sm">BM25<Footnote id="bm25" /> &mdash; exact entity matching</div>
          <div style={{ marginTop: '0.5rem' }}><Ref text="Robertson & Zaragoza" url="https://dl.acm.org/doi/10.1561/1500000019" /></div>
        </div>
        <div className="diagram-box" style={{ flex: 1, minWidth: '150px' }}>
          <div className="text-xs mono text-muted uppercase mb-1">Structured</div>
          <div className="text-sm">Fact anchor &mdash; ClinicalTrials.gov, DrugBank</div>
        </div>
      </div>

      <div className="code-block" data-label="ENVELOPE">
{`{
  "reliability_envelope": {
    "source_agreement": 0.92,
    "coverage_ratio": 1.0,
    "weighted_evidence_score": 3.8,
    "temporal_evolution": false,
    "retrieval_stats": {"mean": 0.87, "std": 0.06},
    "publication_bias_flag": "2/8 registered trials unpublished"
  }
}`}
      </div>

      <p className="content-p">
        <strong>Publication bias<Footnote id="publicationBias" /> signal:</strong> Cross-reference drug/indication with ClinicalTrials.gov.
        10 registered, 6 published {'\u2192'} flag. Doesn&rsquo;t solve A3, makes it visible
        (<Ref text="Turner et al., 2008" url="https://www.nejm.org/doi/full/10.1056/NEJMsa065779" />).
      </p>
    </section>
  );
}
