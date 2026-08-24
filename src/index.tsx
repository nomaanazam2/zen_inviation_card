import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Heart, Sparkles } from "lucide-react";

import { Splash } from "./component/Splash";
import { MusicPlayer } from "./component/Musicplayer";
import { Countdown } from "./component/Countdown";
import {
  Reveal,
  ScrollProgress,
  Section,
  SectionTitle,
} from "./component/Reveal";
import { CornerFlourish, Mandala, Divider } from "./component/Ornaments";
import { Gallery } from "./component/Gallery";

export default function WalimaPage() {
  return <Invitation />;
}

const VENUE_QUERY = "Blessings Banquet Hall, Doharra Mafi, Aligarh 202001";

const GALLERY = [
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551454/IMG-20260823-WA0015.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551454/IMG-20260823-WA0016_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0023.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0011.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0019.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0012_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0006_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0005.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0008.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551453/IMG-20260823-WA0009_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551452/IMG-20260823-WA0034.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551452/IMG-20260823-WA0004.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551452/IMG-20260823-WA0030_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551452/IMG-20260823-WA0027_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551452/IMG-20260823-WA0000_1.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551451/IMG-20260823-WA0002.jpg",
  "https://res.cloudinary.com/m82ighev/image/upload/v1787551451/IMG-20260321-WA0067.jpg",
];

const RSVP = ["Abdul Mannan", "Abdul Dayyan", "Reyazul Hasan", "Qausar Umar"];
const WBCF = [
  "Mohd Shariq",
  "Shafe-ul-hoda",
  "Haider Azam",
  "Mohammad Shayaan",
  "Relatives & Friends",
];

// function downloadIcs() {
//   const ics = [
//     "BEGIN:VCALENDAR",
//     "VERSION:2.0",
//     "PRODID:-//Walima//Invitation//EN",
//     "BEGIN:VEVENT",
//     "UID:walima-zeeshan-sanobar@invite",
//     "DTSTART:20261114T133000Z",
//     "DTEND:20261114T173000Z",
//     "SUMMARY:Dawat-e-Walima — Mohammad Zeeshan & Sanobar Taj",
//     `LOCATION:${VENUE_QUERY}`,
//     "DESCRIPTION:With warm regards, we request the pleasure of your company.",
//     "END:VEVENT",
//     "END:VCALENDAR",
//   ].join("\r\n");
//   const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "dawat-e-walima.ics";
//   a.click();
//   URL.revokeObjectURL(url);
// }

function GoldButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3 font-body text-[0.7rem] tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-95";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Splash open={opened} onOpen={() => setOpened(true)} />
      {opened && <ScrollProgress />}
      {opened && <MusicPlayer shouldPlay />}

      {/* Hero */}
      <header className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <Mandala className="spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-gold/12" />
        <CornerFlourish className="absolute top-5 left-5 h-14 w-14 text-gold/70 sm:h-20 sm:w-20" />
        <CornerFlourish className="absolute top-5 right-5 h-14 w-14 scale-x-[-1] text-gold/70 sm:h-20 sm:w-20" />
        <CornerFlourish className="absolute bottom-5 left-5 h-14 w-14 scale-y-[-1] text-gold/70 sm:h-20 sm:w-20" />
        <CornerFlourish className="absolute right-5 bottom-5 h-14 w-14 scale-[-1] text-gold/70 sm:h-20 sm:w-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative"
        >
          <p className="font-script text-3xl text-gold-gradient sm:text-4xl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-[0.7rem] leading-relaxed tracking-[0.16em] text-muted-foreground uppercase">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </motion.div>

        <Divider className="my-8 sm:my-10" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto max-w-md font-display text-lg leading-relaxed text-foreground/85 sm:text-xl"
        >
          Mrs &amp; Mr. Mohd. Abdul Hannan
          <span className="block font-body text-[0.65rem] tracking-luxe text-muted-foreground uppercase">
            cordially invite you to the Dawat-e-Walima of
          </span>
        </motion.p>

        <div className="mt-9 flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-script text-5xl leading-tight text-gold-gradient sm:text-7xl">
              Mohammad Zeeshan
            </h1>
            <p className="mt-2 font-body text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
              Grand s/o Late Mr. Abdul Jabbar
            </p>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="font-script text-4xl text-gold shimmer"
          >
            &amp;
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-script text-5xl leading-tight text-gold-gradient sm:text-7xl">
              Sanobar Taj
            </h2>
            <p className="mt-2 font-body text-[0.6rem] leading-relaxed tracking-[0.2em] text-muted-foreground uppercase">
              D/o Mr. Md. Tajuddin
              <br />
              Grand D/o Late Mr. Anzarul Hasan
            </p>
          </motion.div>
        </div>
      </header>

      {/* Event & Countdown */}
      <Section>
        <Reveal>
          <SectionTitle>The Celebration</SectionTitle>
          <Divider className="mt-5" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="luxe-card rounded-3xl px-6 py-9 text-center sm:px-12">
            <p className="font-body text-[0.65rem] tracking-luxe text-gold-soft uppercase">
              Program
            </p>
            <p className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
              Dawat-e-Walima
            </p>
            <span className="gold-rule mx-auto mt-6 block w-40" />
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="font-display text-xl text-gold-gradient sm:text-2xl">
                Saturday, 14 November 2026
              </p>
              <p className="inline-flex items-center gap-2 font-body text-sm tracking-[0.16em] text-muted-foreground">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                7:00 PM onwards
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Countdown />
        </div>

        {/* <Reveal delay={0.15} className="mt-10 flex justify-center">
          <GoldButton onClick={downloadIcs}>
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Add to Calendar
          </GoldButton>
        </Reveal> */}
      </Section>

      {/* Venue */}
      <Section>
        <Reveal>
          <SectionTitle>The Venue</SectionTitle>
          <Divider className="mt-5" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="luxe-card overflow-hidden rounded-3xl">
            <div className="px-6 py-8 text-center sm:px-10">
              <MapPin
                className="mx-auto h-6 w-6 text-gold"
                aria-hidden="true"
              />
              <p className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                Blessings Banquet Hall
              </p>
              <p className="mt-2 font-body text-sm tracking-[0.12em] text-muted-foreground">
                Doharra Mafi, Aligarh - 202001
              </p>
            </div>
            <div className="border-t border-border/60">
              <iframe
                title="Map to Blessings Banquet Hall"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  VENUE_QUERY
                )}&output=embed`}
                loading="lazy"
                className="h-64 w-full grayscale-[0.35] contrast-[1.05] sm:h-80"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <GoldButton
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              VENUE_QUERY
            )}`}
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </GoldButton>
        </Reveal>
      </Section>

      {/* Gallery */}
      <Section>
        <Reveal>
          <SectionTitle>Moments &amp; Memories</SectionTitle>
          <Divider className="mt-5" />
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <Gallery photos={GALLERY} />
        </Reveal>
      </Section>

      {/* RSVP & WBCF */}
      <Section>
        <Reveal>
          <SectionTitle>With Warm Regards</SectionTitle>
          <Divider className="mt-5" />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
          <Reveal className="luxe-card rounded-3xl px-4 py-8 text-center sm:px-8">
            <Sparkles
              className="mx-auto h-5 w-5 text-gold"
              aria-hidden="true"
            />
            <h3 className="mt-3 font-body text-[0.7rem] tracking-luxe text-gold-soft uppercase">
              RSVP
            </h3>
            <span className="gold-rule mx-auto mt-4 block w-16" />
            <ul className="mt-5 space-y-2.5">
              {RSVP.map((n) => (
                <li
                  key={n}
                  className="font-display text-base text-foreground/90 sm:text-lg"
                >
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.12}
            className="luxe-card rounded-3xl px-4 py-8 text-center sm:px-8"
          >
            <Heart className="mx-auto h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="mt-3 font-body text-[0.7rem] tracking-luxe text-gold-soft uppercase">
              WBCF
            </h3>
            <span className="gold-rule mx-auto mt-4 block w-16" />
            <ul className="mt-5 space-y-2.5">
              {WBCF.map((n) => (
                <li
                  key={n}
                  className="font-display text-base text-foreground/90 sm:text-lg"
                >
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative px-6 pt-6 pb-20 text-center">
        <Divider />
        <Reveal className="mt-8">
          <p className="mx-auto max-w-md font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl">
            Your presence would be the greatest blessing upon our celebration.
          </p>
          <p className="mt-4 font-script text-3xl text-gold-gradient sm:text-4xl">
            Jazak Allahu Khairan
          </p>
          <p className="mt-6 font-body text-[0.6rem] tracking-luxe text-muted-foreground uppercase">
            Zeeshan &amp; Sanobar · 14 . 11 . 2026
          </p>
        </Reveal>
      </footer>
    </main>
  );
}
