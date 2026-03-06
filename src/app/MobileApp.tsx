import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

/* ── asset imports ──────────────────────────────────────────────── */
import vidHero from "../assets/hero-video.mp4";
import imgP1 from "../assets/a94391ca37de22330cc779114f6b68dbb038064e.png";
import imgP2 from "../assets/fc8284dfd914ae2936fd79526b42216fa863bdc4.png";
import imgP3 from "../assets/4dc3d8d9f8ad1c7d42c3bcf1edd869cd3651b70a.png";
import imgP4 from "../assets/6b642471b9dc7fb3d322dcb425c69e42ad3bd916.png";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS & UTILS
   ═══════════════════════════════════════════════════════════════════ */
const C = {
  charcoal: "#2B2B2B",
  deep: "#1A1A1A",
  gold: "#C9A96E",
  goldLight: "#D4BC8A",
  cream: "#F5F0E8",
  warmWhite: "#FEFCF9",
  beige: "#EDE8E0",
  taupe: "#7A7468",
  textLight: "#A09889",
} as const;

const FONT_D = '"Cormorant Garamond", Georgia, serif';
const FONT_B = '"Outfit", system-ui, sans-serif';

function Fade({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-px" style={{ backgroundColor: C.gold }} />
      <span style={{ color: C.gold, fontFamily: FONT_B, fontSize: "10px", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`leading-tight ${className}`} style={{ fontFamily: FONT_D, fontSize: "2.1rem", fontWeight: 400, color: C.charcoal }}>{children}</h2>;
}

const Arrow = <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;

/* ═══════════════════════════════════════════════════════════════════
   MOBILE NAVBAR
   ═══════════════════════════════════════════════════════════════════ */
function MobileNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3 shadow-md" : "py-4"}`} style={{ backgroundColor: scrolled ? "rgba(26,26,26,.97)" : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none" }}>
      <div className="px-5 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 z-50">
          <span className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: C.gold }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="#fff" /></svg>
          </span>
          <span className="text-white text-base tracking-widest" style={{ fontFamily: FONT_D, fontWeight: 500 }}>APT<span style={{ color: C.gold }}>INTERIO</span></span>
        </a>
        <button className="text-white z-50 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100vh" }} exit={{ opacity: 0, height: 0 }} className="fixed inset-0 z-40 pt-24 px-6" style={{ backgroundColor: C.deep }}>
            <div className="flex flex-col gap-6">
              {["Home", "Services", "Projects", "Locations"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-white text-2xl" style={{ fontFamily: FONT_D }}>{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE HERO
   ═══════════════════════════════════════════════════════════════════ */
function MobileHero() {
  return (
    <section id="hero" className="relative h-[90vh] flex items-end pb-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover origin-top scale-110">
          <source src={vidHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(26,26,26,.8) 100%)" }} />
      </div>

      <div className="relative z-10 px-5 w-full">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="text-white mb-4" style={{ fontFamily: FONT_D, fontSize: "clamp(2.5rem,10vw,3.5rem)", lineHeight: 1.1, fontWeight: 400 }}>
          Luxury Interiors<br />for <span style={{ color: C.gold, fontStyle: "italic" }}>Kokapet</span> Homes
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }} className="text-white/80 mb-6 leading-relaxed text-sm" style={{ fontFamily: FONT_B, fontWeight: 300 }}>
          Bespoke turnkey interior styling for premium residences in West Hyderabad.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPACT ABOUT & STATS
   ═══════════════════════════════════════════════════════════════════ */
function MobileAbout() {
  return (
    <section className="py-12 px-5" style={{ backgroundColor: C.warmWhite }}>
      <Fade>
        <Tag>Why Choose Us</Tag>
        <Heading>15+ Years of Design Excellence</Heading>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: C.taupe, fontFamily: FONT_B }}>We transform spaces with innovation and timeless elegance. Managing every detail from 3D concept to turnkey execution seamlessly.</p>
      </Fade>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {[{ n: "88+", l: "Projects" }, { n: "4.8", l: "Rating" }].map(s => (
          <Fade key={s.l} className="p-4 border text-center" style={{ backgroundColor: "#fff", borderColor: `${C.gold}20`, borderRadius: "12px" }}>
            <div className="text-2xl mb-1" style={{ fontFamily: FONT_D, color: C.gold, fontWeight: 600 }}>{s.n}</div>
            <div className="text-[11px] uppercase tracking-wider" style={{ color: C.charcoal, fontFamily: FONT_B }}>{s.l}</div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPACT SERVICES (2 GRID)
   ═══════════════════════════════════════════════════════════════════ */
function MobileServices() {
  const svc = [
    { t: "Residential", d: "Luxury home interiors" },
    { t: "Commercial", d: "Office workspaces" },
    { t: "Turnkey Works", d: "End-to-end execution" },
    { t: "3D Design", d: "Realistic renderings" }
  ];
  return (
    <section className="py-12 px-5 bg-white" id="services">
      <Fade>
        <Tag>Our Services</Tag>
        <Heading className="mb-8">What We Do</Heading>
        <div className="grid grid-cols-2 gap-3">
          {svc.map((s, i) => (
            <div key={i} className="p-4 border" style={{ borderColor: `${C.gold}15`, borderRadius: "12px", backgroundColor: C.warmWhite }}>
              <h3 className="mb-1 text-[15px]" style={{ fontFamily: FONT_D, fontWeight: 600, color: C.charcoal }}>{s.t}</h3>
              <p className="text-[12px]" style={{ color: C.taupe, fontFamily: FONT_B }}>{s.d}</p>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HORIZONTAL SCROLL PROJECTS
   ═══════════════════════════════════════════════════════════════════ */
function MobileProjects() {
  const proj = [
    { img: imgP1, t: "3BHK Kokapet" },
    { img: imgP2, t: "Villa Narsingi" },
    { img: imgP3, t: "Farmhouse" },
    { img: imgP4, t: "Office Gachibowli" },
  ];
  return (
    <section className="py-12" style={{ backgroundColor: C.cream }} id="projects">
      <div className="px-5 mb-6">
        <Tag>Portfolio</Tag>
        <Heading>Recent Projects</Heading>
      </div>
      {/* Horizontal snap scroll container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 pb-4 gap-4" style={{ scrollbarWidth: "none" }}>
        {proj.map((p, i) => (
          <div key={i} className="snap-start flex-shrink-0 w-[80vw] relative rounded-xl overflow-hidden shadow-sm shadow-black/5">
            <img src={p.img} className="w-full h-56 object-cover" alt={p.t} loading="lazy" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top,${C.deep}ee,transparent 50%)` }} />
            <div className="absolute bottom-4 left-4">
              <span className="text-white text-lg block" style={{ fontFamily: FONT_D, fontWeight: 500 }}>{p.t}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPACT TESTIMONIAL
   ═══════════════════════════════════════════════════════════════════ */
function MobileTestimonial() {
  return (
    <section className="py-12 px-5 bg-white">
      <Fade>
        <div className="p-6 border relative" style={{ borderColor: `${C.gold}20`, borderRadius: "16px", backgroundColor: C.warmWhite }}>
          <div className="absolute top-4 right-4 opacity-10">
            <svg width="24" height="24" viewBox="0 0 40 36" fill={C.charcoal}><path d="M0 21.6c0-4.4 1.1-8.2 3.3-11.3C5.5 7.2 8.6 4.4 12.7 2L16 6c-2.7 1.6-4.7 3.3-6 5.1-1.3 1.8-2 3.6-2 5.4h5.6V36H0V21.6zm22.4 0c0-4.4 1.1-8.2 3.3-11.3 2.2-3.1 5.3-5.9 9.3-8.3l3.3 4c-2.7 1.6-4.7 3.3-6 5.1-1.3 1.8-2 3.6-2 5.4H36V36H22.4V21.6z" /></svg>
          </div>
          <p className="text-sm italic leading-relaxed mb-4 text-balance" style={{ color: C.taupe, fontFamily: FONT_B }}>"AptInterio transformed our 3BHK in Kokapet perfectly. The turnkey process was seamless and the luxury finish is identical to the 3D designs."</p>
          <div className="text-xs font-medium" style={{ color: C.charcoal, fontFamily: FONT_B }}>- Priya Sharma, Kokapet</div>
        </div>
      </Fade>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STICKY BOTTOM CTA
   ═══════════════════════════════════════════════════════════════════ */
function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 p-3 z-50 bg-white border-t" style={{ borderColor: "rgba(0,0,0,.05)", boxShadow: "0 -4px 20px rgba(0,0,0,0.04)" }}>
      <a href="tel:+918919179795" className="flex items-center justify-center gap-2 w-full py-3.5 text-white text-sm" style={{ backgroundColor: C.gold, fontFamily: FONT_B, fontWeight: 500, borderRadius: "8px" }}>
        Book a Free Consultation
        {Arrow}
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE APP ROUTER
   ═══════════════════════════════════════════════════════════════════ */
export default function MobileApp() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: C.warmWhite }}>
      <MobileNavbar />
      <main>
        <MobileHero />
        <MobileAbout />
        <MobileServices />
        <MobileProjects />
        <MobileTestimonial />
      </main>
      <StickyCTA />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
