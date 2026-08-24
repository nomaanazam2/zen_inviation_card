import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-11-14T19:00:00+05:30").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState(() => diff());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
      {Object.entries(time).map(([label, value], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.7 }}
          className="luxe-card flex aspect-square flex-col items-center justify-center rounded-full"
        >
          <span className="font-display text-2xl tabular-nums text-gold-gradient sm:text-4xl">
            {mounted ? String(value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 font-body text-[0.55rem] tracking-[0.18em] text-muted-foreground uppercase sm:text-[0.65rem]">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
