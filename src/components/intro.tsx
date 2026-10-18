import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion";

const WORDS = ["People", "Skills", "Cloud", "Software", "Data", "Transformation"];
const KEY = "act-intro-seen";

/** Fires once the opening sequence is finished (or skipped). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if ((window as unknown as { __actIntroDone?: boolean }).__actIntroDone) { setDone(true); return; }
    const on = () => setDone(true);
    window.addEventListener("act:intro-done", on);
    return () => window.removeEventListener("act:intro-done", on);
  }, []);
  return done;
}

function finish() {
  (window as unknown as { __actIntroDone?: boolean }).__actIntroDone = true;
  window.dispatchEvent(new Event("act:intro-done"));
}

/** Cinematic opening: counter, kinetic word cycle, signal line, curtain lift. Once per session. */
export function Intro() {
  const [show, setShow] = useState(true);
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(KEY) || window.location.pathname !== "/") {
      setShow(false); finish(); return;
    }
    sessionStorage.setItem(KEY, "1");
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1700);
      setN(Math.round(p * 100));
      setI(Math.min(WORDS.length - 1, Math.floor(p * WORDS.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={finish}>
      {show && (
        <motion.div
          key="intro"
          onClick={() => setShow(false)}
          className="surface-ink fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between p-6 md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex justify-between eyebrow text-muted-foreground">
            <span>Act Informatics</span><span>Initializing network</span>
          </div>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={WORDS[i]}
                initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }}
                transition={{ duration: 0.13, ease: EASE }}
                className="font-display text-[15vw] font-black leading-none font-wide md:text-[11vw]"
              >
                {WORDS[i]}<span className="text-lime">.</span>
              </motion.p>
            </AnimatePresence>
          </div>
          <div>
            <div className="h-px w-full bg-border">
              <div className="h-px bg-lime glow-lime" style={{ width: `${n}%` }} />
            </div>
            <div className="mt-3 flex justify-between eyebrow">
              <span className="text-muted-foreground">Connecting talent to technology</span>
              <span className="text-lime tabular-nums">{String(n).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
