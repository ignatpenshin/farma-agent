import { useState, useRef, useEffect } from 'react';
import FOOTNOTES from '../data/footnotes';

export default function Footnote({ id }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const note = FOOTNOTES[id];

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!note) return null;

  return (
    <span className="footnote-wrapper" ref={ref}>
      <button
        className={`footnote-trigger${open ? ' active' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label={`Footnote: ${note.term}`}
        title={note.term}
      >
        ?
      </button>
      {open && (
        <span className="footnote-panel">
          <span className="footnote-term">{note.term}</span>
          <span className="footnote-text">{note.text}</span>
        </span>
      )}
    </span>
  );
}
