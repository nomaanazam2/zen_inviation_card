import { motion, AnimatePresence } from "framer-motion";
import { Mandala, Divider } from "./Ornaments";

export function Splash({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
          style={{ background: "var(--gradient-royal)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mandala className="spin-slow pointer-events-none absolute h-[130vmin] w-[130vmin] text-gold/25" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <p className="font-body text-[0.65rem] tracking-luxe text-gold-soft/80 uppercase sm:text-xs">
              Bismillahir Rahmanir Raheem
            </p>

            <h1 className="mt-6 font-script text-5xl leading-tight text-gold-gradient sm:text-7xl">
              Dawat-e-Walima
            </h1>

            <Divider className="mt-6" />

            <p className="mt-6 font-display text-2xl text-foreground/90 sm:text-3xl">
              Mohammad Zeeshan
              <span className="mx-3 font-script text-gold">&amp;</span>
              Sanobar Taj
            </p>

            <motion.button
              type="button"
              onClick={onOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.8 0.116 88 / 0%)",
                  "0 0 34px oklch(0.8 0.116 88 / 45%)",
                  "0 0 0px oklch(0.8 0.116 88 / 0%)",
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="mt-10 rounded-full bg-gold-gradient px-9 py-3.5 font-body text-xs tracking-luxe text-primary-foreground uppercase"
            >
              Tap to Open
            </motion.button>

            <p className="mt-4 font-body text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              Music will begin playing
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
