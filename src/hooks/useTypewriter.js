import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useTypewriter(phrases, speed = 55, pause = 2000) {
  const reduced = useReducedMotion();
  const phrasesRef = useRef(phrases);

  const [state, setState] = useState({
    text: "",
    idx: 0,
    pos: 0,
    deleting: false,
  });

  useEffect(() => {
    if (reduced) return;

    const { pos, idx, deleting } = state;
    const target = phrasesRef.current[idx];

    if (!deleting) {
      if (pos < target.length) {
        const t = setTimeout(
          () => setState((s) => ({ ...s, text: target.slice(0, s.pos + 1), pos: s.pos + 1 })),
          speed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setState((s) => ({ ...s, deleting: true })),
        pause
      );
      return () => clearTimeout(t);
    } else {
      if (pos > 0) {
        const t = setTimeout(
          () => setState((s) => ({ ...s, text: target.slice(0, s.pos - 1), pos: s.pos - 1 })),
          Math.round(speed / 2)
        );
        return () => clearTimeout(t);
      }
      setState((s) => ({
        text: "",
        idx: (s.idx + 1) % phrasesRef.current.length,
        pos: 0,
        deleting: false,
      }));
    }
  }, [state, speed, pause, reduced]);

  return reduced ? phrases[0] : state.text;
}
