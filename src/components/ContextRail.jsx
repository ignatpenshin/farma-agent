import { useState } from 'react';

export default function ContextRail() {
  const [thermalOn, setThermalOn] = useState(true);

  return (
    <aside className="context-rail">
      <div className="author-block">
        <div className="text-xs mono text-muted uppercase mb-1">Author Context</div>
        <h3 className="mono" style={{ margin: '0.5rem 0', color: 'var(--text-main)', fontSize: '0.95rem' }}>
          Ignat Penshin
        </h3>
        <p className="text-xs text-muted" style={{ marginBottom: '1rem' }}>AI Engineer</p>
        <div className="text-xs text-muted" style={{ lineHeight: 1.5 }}>
          "System architecture, evaluation pipelines, calibration methodology &mdash; my direct engineering experience.
          Clinical examples researched with AI assistance and cross-referenced against public sources."
        </div>
      </div>

      <div className="diagram-box">
        <div className="text-xs mono text-muted uppercase mb-1">SYS.METRICS</div>
        <div className="metrics-grid">
          <div>
            <div className="text-xs text-muted">ECE Target</div>
            <div className="mono text-sm">&lt; 0.05</div>
          </div>
          <div>
            <div className="text-xs text-muted">EDS Target</div>
            <div className="mono text-sm">&gt; 0.85</div>
          </div>
          <div>
            <div className="text-xs text-muted">Esc. Recall</div>
            <div className="mono text-sm">&gt; 0.95</div>
          </div>
          <div>
            <div className="text-xs text-muted">Esc. Volume</div>
            <div className="mono text-sm" style={{ color: 'var(--accent-heat)' }}>&lt; 8%</div>
          </div>
        </div>
      </div>

      <div className="diagram-box mt-2">
        <div className="text-xs mono text-muted uppercase mb-1">CONFIDENCE ZONES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          {[
            { label: 'GREEN', pct: 45, color: 'var(--zone-green)' },
            { label: 'YELLOW', pct: 30, color: 'var(--zone-yellow)' },
            { label: 'ORANGE', pct: 8, color: 'var(--zone-orange)' },
            { label: 'RED', pct: 7, color: 'var(--zone-red)' },
            { label: 'GRAY', pct: 10, color: 'var(--zone-gray)' },
          ].map(z => (
            <div key={z.label}>
              <div className="flex-between">
                <span className="text-xs mono" style={{ color: z.color }}>{z.label}</span>
                <span className="text-xs mono text-dim">{z.pct}%</span>
              </div>
              <div className="heat-pipe">
                <div className="heat-pipe-fill" style={{ width: `${z.pct}%`, background: z.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs mono text-muted uppercase">View Mode</div>
        <div
          className={`toggle-switch ${thermalOn ? 'active' : ''}`}
          onClick={() => setThermalOn(!thermalOn)}
        >
          <div className="toggle-knob" />
        </div>
        <div className="text-xs text-muted mt-1">
          Thermal Overlay: {thermalOn ? 'ON' : 'OFF'}
        </div>
      </div>

      <div style={{ marginTop: '3rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
        <div>30+ scientific references</div>
        <div>All links verified</div>
        <div style={{ marginTop: '0.5rem' }}>Kiz8 &middot; AI &middot; Agentics</div>
      </div>
    </aside>
  );
}
