import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

/* ── asset imports ──────────────────────────────────────────────── */
import vidHero from "../assets/hero-video.mp4";
import imgAbout from "../assets/e4de151ac4efb6a07b68e90aa765bd9ebc419311.png";
import imgStatsBg from "../assets/b7ca9c77bb6f2ddc2b7d4136d174c207ab13233b.png";
import imgCtaBg from "../assets/d070c4dadb305850a004723df09ec2548b5587f4.png";
import imgBlog1 from "../assets/6fc0e4fd0e560e25fb667fc4adb833220cfbb3bc.png";
import imgBlog2 from "../assets/d0b3cf87748c6b649748a8fb3d3b02f12c7fb7f4.png";
import imgBlog3 from "../assets/3dd92a14f60469fb7a5e4faee52c85dabfbd11b6.png";
import imgP1 from "../assets/a94391ca37de22330cc779114f6b68dbb038064e.png";
import imgP2 from "../assets/fc8284dfd914ae2936fd79526b42216fa863bdc4.png";
import imgP3 from "../assets/4dc3d8d9f8ad1c7d42c3bcf1edd869cd3651b70a.png";
import imgP4 from "../assets/6b642471b9dc7fb3d322dcb425c69e42ad3bd916.png";
import imgP5 from "../assets/7bd95e7e3badc0cb4a79df67a0dbf650d9d4ce49.png";
import imgP6 from "../assets/bf51517ddf8935007382ee18f4cabab814f335b6.png";
import imgP7 from "../assets/2ed9798502957b19fad81e4b3b9ea9723199bd39.png";
import imgP8 from "../assets/168f3995cedd7374ce2eebb75fb6efa163adef25.png";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════ */
const C = {
  charcoal: "#2B2B2B",
  deep: "#1A1A1A",
  gold: "#C9A96E",
  goldLight: "#D4BC8A",
  goldDark: "#B8954F",
  cream: "#F5F0E8",
  warmWhite: "#FEFCF9",
  beige: "#EDE8E0",
  taupe: "#7A7468",
  textLight: "#A09889",
} as const;

const FONT_D = '"Cormorant Garamond", Georgia, serif';
const FONT_B = '"Outfit", system-ui, sans-serif';

/* ═══════════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, dur = 2000, go: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let v = 0;
    const step = target / (dur / 16);
    const id = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(id); }
      else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(id);
  }, [go, target, dur]);
  return n;
}

/* ── shared micro-components ────────────────────────────────────── */
function Fade({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <span className="w-8 h-px" style={{ backgroundColor: C.gold }} />
      <span style={{ color: C.gold, fontFamily: FONT_B, fontSize: ".75rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase" }}>{children}</span>
      <span className="w-8 h-px" style={{ backgroundColor: C.gold }} />
    </div>
  );
}

function Heading({ children, light, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`text-center ${className}`} style={{ fontFamily: FONT_D, fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 400, lineHeight: 1.18, color: light ? "#fff" : C.charcoal }}>{children}</h2>;
}

function GoldLine() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="w-12 h-px" style={{ background: `linear-gradient(90deg,transparent,${C.gold})` }} />
      <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: C.gold }} />
      <span className="w-12 h-px" style={{ background: `linear-gradient(90deg,${C.gold},transparent)` }} />
    </div>
  );
}

const Arrow = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Locations", href: "#locations" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 shadow-lg" : "py-5"}`} style={{ backgroundColor: scrolled ? "rgba(26,26,26,.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group" aria-label="AptInterio Home">
          <span className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: C.gold }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="#fff" /></svg>
          </span>
          <span className="text-white text-lg tracking-wider" style={{ fontFamily: FONT_D, fontWeight: 500 }}>APT<span style={{ color: C.gold }}>INTERIO</span></span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <li key={l.label}><a href={l.href} className="text-white/70 hover:text-white text-[13px] tracking-wide transition-colors" style={{ fontFamily: FONT_B }}>{l.label}</a></li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="hidden lg:inline-flex items-center gap-2 text-white text-[13px] px-6 py-2.5 tracking-wide hover:brightness-110 transition-all" style={{ backgroundColor: C.gold, fontFamily: FONT_B, fontWeight: 500, borderRadius: "8px" }}>Book Consultation</a>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden" style={{ backgroundColor: C.deep }}>
            <div className="px-6 py-5 border-t border-white/10">
              {links.map(l => <a key={l.label} href={l.href} className="block text-white/80 hover:text-white py-2.5 text-sm" onClick={() => setOpen(false)} style={{ fontFamily: FONT_B }}>{l.label}</a>)}
              <a href="#contact" className="mt-4 inline-block text-white text-sm px-6 py-2.5" style={{ backgroundColor: C.gold, fontFamily: FONT_B, fontWeight: 500, borderRadius: "8px" }} onClick={() => setOpen(false)}>Book Consultation</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover origin-top scale-110"
        >
          <source src={vidHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(26,26,26,.75),rgba(26,26,26,.40) 50%,rgba(26,26,26,.65))" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 mt-16 sm:mt-0 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .4 }} className="text-white mb-6" style={{ fontFamily: FONT_D, fontSize: "clamp(2rem,8vw,4.5rem)", lineHeight: 1.1, fontWeight: 400 }}>
          Premium Interior Design<br />for Luxury{" "}
          <span className="relative inline-block" style={{ color: C.gold, fontStyle: "italic" }}>
            Kokapet
            <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4" preserveAspectRatio="none"><path d="M0 2Q50 0 100 2T200 2" stroke={C.gold} strokeWidth="1.5" fill="none" opacity=".5" /></svg>
          </span>{" "}Homes
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .6 }} className="text-white/80 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed" style={{ fontFamily: FONT_B, fontSize: "clamp(1rem,4vw,1.15rem)", fontWeight: 300 }}>
          Transform your living spaces with bespoke, luxury turnkey interior styling. Expert interior designers serving Kokapet, Gachibowli, and the finest addresses in Hyderabad.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-2 sm:px-0">
          <a href="#contact" className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 text-white px-8 py-4 text-sm tracking-wide hover:brightness-110 hover:shadow-xl transition-all" style={{ backgroundColor: C.gold, fontFamily: FONT_B, fontWeight: 500, boxShadow: `0 8px 30px ${C.gold}30`, borderRadius: "10px" }}>
            Book a Consultation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
          <a href="#projects" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white/90 px-8 py-4 text-sm tracking-wide hover:bg-white/10 backdrop-blur-sm transition-all" style={{ border: "1px solid rgba(255,255,255,.25)", fontFamily: FONT_B, borderRadius: "10px" }}>View Our Projects</a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════════════════════════════ */
function WhyUs() {
  const items = [
    { num: "01", ico: "₹", title: "Smart Pricing", desc: "Apt Interio delivers cost-effective interior design solutions without compromising quality or style. Tailored packages and streamlined project management ensure excellent value." },
    { num: "02", ico: "◆", title: "Creative Designs", desc: "Our designers craft innovative and functional spaces tailored to modern lifestyles — creating environments that are both visually stunning and highly practical." },
    { num: "03", ico: "⬡", title: "Turnkey Execution", desc: "From concept design and 3D visualization to final installation, every stage of the project is professionally managed with complete transparency." },
    { num: "04", ico: "★", title: "Experienced Team", desc: "15+ years of experience creating residential and commercial interior spaces across Hyderabad with an impeccable track record of on-time delivery." },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.warmWhite }} id="why-us">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-16">
          <Tag>Why AptInterio</Tag>
          <Heading>Why Choose AptInterio</Heading>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>Trusted by homeowners across Hyderabad for premium interiors delivered with precision, creativity, and care.</p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((v, i) => (
            <Fade key={i} delay={i * .1}>
              <div className="group relative p-8 h-full border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer" style={{ backgroundColor: "#fff", borderColor: `${C.gold}15`, borderRadius: "16px" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.gold}50`)} onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.gold}15`)}>
                <div className="mb-5 select-none" style={{ fontFamily: FONT_D, fontSize: "3rem", fontWeight: 700, lineHeight: 1, color: C.gold, textShadow: `0 0 30px ${C.gold}40` }}>{v.num}</div>
                <div className="w-10 h-10 flex items-center justify-center mb-5 text-lg" style={{ backgroundColor: `${C.gold}10`, color: C.gold, borderRadius: "8px" }}>{v.ico}</div>
                <h3 style={{ fontFamily: FONT_D, fontSize: "1.3rem", fontWeight: 500, color: C.charcoal, marginBottom: 10 }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.taupe, fontFamily: FONT_B, fontWeight: 300 }}>{v.desc}</p>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500" style={{ backgroundColor: C.gold }} />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════════ */
function About() {
  const caps = ["Residential Interiors", "Commercial Interiors", "3D & 2D Designing", "Turnkey Management"];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.cream }} id="about">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <Fade>
            <div className="relative">
              <div className="overflow-hidden shadow-2xl" style={{ borderRadius: "16px" }}><img src={imgAbout} alt="AptInterio luxury interior design project in Hyderabad" className="w-full h-[500px] object-cover" loading="lazy" /></div>
              <motion.div initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="absolute -bottom-6 -right-4 px-7 py-5 shadow-xl" style={{ backgroundColor: C.gold, borderRadius: "12px" }}>
                <div className="text-white text-3xl" style={{ fontFamily: FONT_D, fontWeight: 600 }}>15+</div>
                <div className="text-white/80 text-xs tracking-wider mt-1" style={{ fontFamily: FONT_B }}>Years of Excellence</div>
              </motion.div>
              <div className="absolute -top-4 -left-4 w-20 h-20" style={{ border: `2px solid ${C.gold}25` }} aria-hidden="true" />
            </div>
          </Fade>

          {/* Text */}
          <Fade delay={.15}>
            <div>
              <Tag>About Us</Tag>
              <h2 className="mt-2 mb-6" style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, lineHeight: 1.2, color: C.charcoal }}>
                Inspire Your Space Through <br /><span style={{ color: C.gold, fontStyle: "italic" }}>Art &amp; Design</span>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>
                AptInterio is a creative interior design firm dedicated to transforming spaces with innovation, style, and timeless elegance. Our designers and architects collaborate closely with clients to deliver personalized residential and commercial interiors that reflect lifestyle, comfort, and sophistication.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>
                From conceptualization to final handover, our team manages every detail with precision. Our process is collaborative, transparent, and driven by your vision.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {caps.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#fff", border: `1px solid ${C.gold}20`, borderRadius: "8px" }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
                    <span className="text-sm" style={{ color: C.charcoal, fontFamily: FONT_B, fontWeight: 400 }}>{c}</span>
                  </div>
                ))}
              </div>
              <a href="#services" className="inline-flex items-center gap-2 text-sm tracking-wide" style={{ color: C.gold, fontFamily: FONT_B, fontWeight: 500 }}>Explore Our Services {Arrow}</a>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════════════ */
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const a = useCountUp(88, 1800, go);
  const b = useCountUp(82, 1800, go);
  const c = useCountUp(48, 1800, go);
  const d = useCountUp(15, 1800, go);

  const data = [
    { v: a, s: "+", l: "Projects Completed" },
    { v: b, s: "+", l: "Happy Clients" },
    { v: (c / 10).toFixed(1), s: "", l: "Company Rating", dec: true },
    { v: d, s: "+", l: "Years Experience" },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgStatsBg} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ backgroundColor: `${C.deep}ee` }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {data.map((s, i) => (
          <div key={i}>
            <div className="mb-2" style={{ fontFamily: FONT_D, fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 300, lineHeight: 1, color: "#fff" }}>{s.v}<span style={{ color: C.gold }}>{s.s}</span></div>
            <span className="block w-6 h-px mx-auto mb-3" style={{ backgroundColor: C.gold }} />
            <span className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,.5)", fontFamily: FONT_B, fontWeight: 300 }}>{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════════════ */
function Services() {
  const svc: { t: string; d: string; ico: ReactNode }[] = [
    { t: "Residential Interiors", d: "Design and execution of apartments, villas, 2BHK and 3BHK flats, modular kitchens, wardrobes, and complete home interiors in Hyderabad.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 10.5L14 3.5l10.5 7v13a1.17 1.17 0 01-1.17 1.17H4.67A1.17 1.17 0 013.5 23.5z" /><path d="M10.5 24.5V14h7v10.5" /></svg> },
    { t: "Commercial Interiors", d: "Office interiors, retail showrooms, and workspace environments designed for productivity and brand identity.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 24.5h21M5.83 24.5V5.83L16.33 3.5v21M16.33 24.5h5.83V10.5l-5.83-1.17" /><path d="M9.33 9.33h2.33M9.33 14h2.33M9.33 18.67h2.33" /></svg> },
    { t: "3D & 2D Visualization", d: "Detailed architectural layouts and realistic 3D renderings to visualize spaces before execution.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24.5 18.667V9.333a2.333 2.333 0 00-1.167-2.02l-8.166-4.666a2.333 2.333 0 00-2.334 0L4.667 7.313A2.333 2.333 0 003.5 9.333v9.334a2.333 2.333 0 001.167 2.02l8.166 4.666a2.333 2.333 0 002.334 0l8.166-4.666A2.333 2.333 0 0024.5 18.667z" /><path d="M3.85 8.167L14 14.012l10.15-5.845M14 25.48V14" /></svg> },
    { t: "Lighting Design", d: "Customized ambient, task, and accent lighting solutions that enhance aesthetics and functionality.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.5 24.5h7M11.67 21h4.66M14 3.5A7 7 0 0017.5 16.8v1.87a1.17 1.17 0 01-1.17 1.17h-4.66a1.17 1.17 0 01-1.17-1.17V16.8A7 7 0 0014 3.5z" /></svg> },
    { t: "Home Automation", d: "Smart home solutions integrating lighting control, climate management, and security systems.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 10.5L14 3.5l10.5 7v13a1.17 1.17 0 01-1.17 1.17H4.67A1.17 1.17 0 013.5 23.5z" /><circle cx="14" cy="16.33" r="3.5" /><path d="M14 12.83v-2.33" /></svg> },
    { t: "Turnkey Management", d: "End-to-end execution including civil work, furniture, electrical, plumbing, and finishing.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18.67 3.5h2.33a2.33 2.33 0 012.33 2.33v17.5a2.33 2.33 0 01-2.33 2.33H7a2.33 2.33 0 01-2.33-2.33V5.83A2.33 2.33 0 017 3.5h2.33" /><rect x="9.33" y="2.33" width="9.33" height="4.67" rx="1.17" /><path d="M9.33 14h9.34M9.33 18.67h5.84" /></svg> },
    { t: "Custom Furniture", d: "Bespoke furniture such as TV units, wardrobes, kitchens, and luxury cabinetry crafted to perfection.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.67 15.17V9.33a3.5 3.5 0 013.5-3.5h11.66a3.5 3.5 0 013.5 3.5v5.84" /><path d="M2.33 15.17a2.33 2.33 0 014.67 0v3.5h14v-3.5a2.33 2.33 0 014.67 0v5.83H2.33v-5.83z" /><path d="M5.83 22.17v2.33M22.17 22.17v2.33" /></svg> },
    { t: "Interior Renovations", d: "Complete home renovation services including kitchen remodeling, bedroom upgrades, and flat transformations.", ico: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16.86 4.38a5.83 5.83 0 00-7.53 7.53l-5.55 5.55a2.07 2.07 0 002.92 2.92l5.55-5.55a5.83 5.83 0 007.53-7.53l-3.4 3.4-2.42-.81-.81-2.42 3.4-3.4z" /></svg> },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-16">
          <Tag>What We Offer</Tag>
          <Heading>Our Interior Design Services</Heading>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>Comprehensive interior design solutions crafted with meticulous attention to detail and delivered with excellence.</p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {svc.map((s, i) => (
            <Fade key={i} delay={i * .05}>
              <div className="group relative p-6 border transition-all duration-400 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer h-full" style={{ borderColor: `${C.gold}12`, borderRadius: "16px" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.gold}50`)} onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.gold}12`)}>
                <div className="w-14 h-14 flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: `${C.gold}08`, color: C.gold, borderRadius: "12px" }}>{s.ico}</div>
                <h3 style={{ fontFamily: FONT_D, fontSize: "1.15rem", fontWeight: 500, color: C.charcoal, marginBottom: 10 }}>{s.t}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C.taupe, fontFamily: FONT_B, fontWeight: 300 }}>{s.d}</p>
                <span className="block mt-5 w-5 h-px group-hover:w-10 transition-all duration-400" style={{ backgroundColor: C.gold }} />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════════ */
function Projects() {
  const all = [
    { img: imgP1, title: "3BHK – Ananda Drizzle", loc: "Alkapur Township", sq: "2000 SQFT", tag: "Residential" },
    { img: imgP2, title: "4BHK Villa – Raaga", loc: "Kollur", sq: "4200 SQFT", tag: "Residential" },
    { img: imgP3, title: "Farmhouse", loc: "Chevella", sq: "4500 SQFT", tag: "Residential" },
    { img: imgP4, title: "3BHK – Prestige Tranquilla", loc: "Kokapet", sq: "1800 SQFT", tag: "Residential" },
    { img: imgP5, title: "3BHK – Skyrena", loc: "Narsingi", sq: "2200 SQFT", tag: "Residential" },
    { img: imgP6, title: "Modern Office Suite", loc: "Gachibowli", sq: "3000 SQFT", tag: "Commercial" },
    { img: imgP7, title: "Tech Workspace", loc: "Gachibowli", sq: "5000 SQFT", tag: "Commercial" },
    { img: imgP8, title: "Minimalist Dining", loc: "Manikonda", sq: "1200 SQFT", tag: "Residential" },
  ];

  const [f, setF] = useState("All");
  const shown = f === "All" ? all : all.filter(p => p.tag === f);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.cream }} id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-12">
          <Tag>Our Work</Tag>
          <Heading>Featured Projects</Heading>
          <div className="flex items-center justify-center gap-3 mt-8">
            {["All", "Residential", "Commercial"].map(x => (
              <button key={x} onClick={() => setF(x)} className="px-6 py-2 text-sm tracking-wide transition-all" style={{ backgroundColor: f === x ? C.gold : "#fff", color: f === x ? "#fff" : C.taupe, border: `1px solid ${f === x ? C.gold : C.beige}`, fontFamily: FONT_B, fontWeight: f === x ? 500 : 400, borderRadius: "8px" }}>{x}</button>
            ))}
          </div>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map(p => (
              <motion.div key={p.title} layout initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }} transition={{ duration: .4 }} className="group relative overflow-hidden cursor-pointer" style={{ boxShadow: "0 4px 20px rgba(0,0,0,.08)", borderRadius: "14px" }}>
                <img src={p.img} alt={`${p.title} interior design in ${p.loc} by AptInterio`} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top,${C.deep}cc,transparent 60%)` }} />
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs tracking-wider" style={{ color: C.gold, fontFamily: FONT_B }}>{p.sq} · {p.loc}</span>
                  <p className="text-white mt-1" style={{ fontFamily: FONT_D, fontSize: "1.1rem", fontWeight: 500 }}>{p.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Fade className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-wide transition-all hover:shadow-lg"
            style={{ border: `1px solid ${C.gold}`, color: C.gold, fontFamily: FONT_B, fontWeight: 500, borderRadius: "8px" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.gold; }}>
            View All Projects {Arrow}
          </a>
        </Fade>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════════════════════════════ */
function Cta() {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgCtaBg} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${C.deep}dd,${C.charcoal}cc)` }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Fade>
          <GoldLine />
          <h2 className="text-white mt-6 mb-6" style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, lineHeight: 1.2, fontStyle: "italic" }}>
            Transform Your Space Into<br />a Masterpiece of Design
          </h2>
          <p className="max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,.6)", fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>
            Let AptInterio bring your vision to life. Book a complimentary design consultation and take the first step towards your dream interior.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-white px-10 py-4 text-sm tracking-wide hover:brightness-110 transition-all" style={{ backgroundColor: C.gold, fontFamily: FONT_B, fontWeight: 500, boxShadow: `0 8px 30px ${C.gold}30`, borderRadius: "10px" }}>Start Your Journey</a>
        </Fade>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const Star = <svg width="14" height="14" viewBox="0 0 16 16" fill={C.gold}><path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.63l-3.52 1.85.67-3.93L2.3 5.77l3.94-.57z" /></svg>;

  const data = [
    { text: "AptInterio transformed our 3BHK in Kokapet into an absolutely stunning space. Their attention to detail and understanding of our vision was exceptional. Every room feels perfectly curated, from the modular kitchen to the master bedroom.", name: "Priya Sharma", role: "Homeowner, Kokapet" },
    { text: "The team delivered our office renovation on time and within budget. The space now inspires creativity and productivity. Their commercial design expertise is truly unmatched in Hyderabad.", name: "Rahul Mehta", role: "CEO, Tech Startup, Gachibowli" },
    { text: "From the initial 3D consultation to final handover, the experience was seamless. AptInterio understood exactly what we wanted for our villa in Narsingi and delivered beyond expectations. Material quality was premium.", name: "Ananya Reddy", role: "Homeowner, Narsingi" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-16">
          <Tag>Client Stories</Tag>
          <Heading>What Our Clients Say</Heading>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((t, i) => (
            <Fade key={i} delay={i * .1}>
              <div className="relative p-8 border h-full flex flex-col hover:shadow-lg transition-shadow" style={{ backgroundColor: C.warmWhite, borderColor: `${C.gold}12`, borderRadius: "16px" }}>
                <div className="absolute top-6 right-6 opacity-[.06]">
                  <svg width="40" height="36" viewBox="0 0 40 36" fill={C.charcoal}><path d="M0 21.6c0-4.4 1.1-8.2 3.3-11.3C5.5 7.2 8.6 4.4 12.7 2L16 6c-2.7 1.6-4.7 3.3-6 5.1-1.3 1.8-2 3.6-2 5.4h5.6V36H0V21.6zm22.4 0c0-4.4 1.1-8.2 3.3-11.3 2.2-3.1 5.3-5.9 9.3-8.3l3.3 4c-2.7 1.6-4.7 3.3-6 5.1-1.3 1.8-2 3.6-2 5.4H36V36H22.4V21.6z" /></svg>
                </div>
                <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, j) => <span key={j}>{Star}</span>)}</div>
                <p className="leading-relaxed mb-6 flex-1" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".9rem", fontWeight: 300, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: `1px solid ${C.gold}15` }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: C.charcoal, fontFamily: FONT_D, fontWeight: 500 }}>{t.name[0]}</span>
                  <div>
                    <div className="text-sm" style={{ color: C.charcoal, fontFamily: FONT_B, fontWeight: 500 }}>{t.name}</div>
                    <div className="text-xs" style={{ color: C.textLight, fontFamily: FONT_B }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOCATIONS (LOCAL SEO)
   ═══════════════════════════════════════════════════════════════════ */
function Locations() {
  const areas = ["Kokapet", "Gachibowli", "Narsingi", "Kollur", "Tellapur", "Manikonda", "Lingampally", "Alkapur Township"];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.deep }} id="locations">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-14">
          <Tag>Locations We Serve</Tag>
          <Heading light>Interior Design Expertise Across West Hyderabad</Heading>
          <p className="mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,.5)", fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>
            AptInterio delivers premium interior design services across Gachibowli, Kokapet, Narsingi, Kollur, Tellapur, Lingampally, and Manikonda. We specialize in luxury apartment interiors, villa interiors, and modern office spaces tailored to contemporary lifestyles.
          </p>
        </Fade>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((a, i) => (
            <Fade key={i} delay={i * .04}>
              <a href={`#loc-${a.toLowerCase().replace(/\s/g, "-")}`} className="group block p-5 border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,.08)", backgroundColor: "rgba(255,255,255,.03)", borderRadius: "12px" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}50`; e.currentTarget.style.backgroundColor = `${C.gold}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,.03)"; }}
                title={`Best interior designers in ${a}`}>
                <span className="flex items-center gap-2 mb-2" style={{ color: C.gold }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16.67 8.33c0 5.84-6.67 10-6.67 10s-6.67-4.16-6.67-10a6.67 6.67 0 1113.34 0z" /><circle cx="10" cy="8.33" r="2.5" /></svg>
                  <span className="text-xs tracking-wider uppercase" style={{ fontFamily: FONT_B, fontWeight: 500 }}>{a}</span>
                </span>
                <p className="text-xs" style={{ color: "rgba(255,255,255,.4)", fontFamily: FONT_B, fontWeight: 300 }}>Interior Designers in {a}</p>
              </a>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOG
   ═══════════════════════════════════════════════════════════════════ */
function Blog() {
  const posts = [
    { title: "Interior Design Cost for 3BHK in Hyderabad – Complete Guide 2026", excerpt: "Discover the real costs of interior design for a 3BHK flat in Hyderabad, from budget-friendly to luxury options.", date: "Feb 28, 2026", cat: "Cost Guide", img: imgBlog1 },
    { title: "Modern Interior Design Trends in Hyderabad Homes", excerpt: "Explore the latest interior design trends transforming Hyderabad homes – from japandi minimalism to maximalist living.", date: "Feb 15, 2026", cat: "Trends", img: imgBlog2 },
    { title: "Best Interior Designers in Kokapet – Complete Guide", excerpt: "Looking for interior designers in Kokapet? Here's what to look for and why AptInterio is the top choice.", date: "Jan 30, 2026", cat: "Location", img: imgBlog3 },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.cream }} id="blog">
      <div className="max-w-6xl mx-auto px-6">
        <Fade className="text-center mb-14">
          <Tag>Insights &amp; Ideas</Tag>
          <Heading>Our Blog</Heading>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: C.taupe, fontFamily: FONT_B, fontSize: ".95rem", fontWeight: 300 }}>Expert insights on interior design trends, cost guides, and inspiration for Hyderabad homes.</p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((b, i) => (
            <Fade key={i} delay={i * .1}>
              <article className="group overflow-hidden border h-full flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer" style={{ backgroundColor: "#fff", borderColor: `${C.gold}12`, borderRadius: "16px" }}>
                <div className="overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-wider uppercase px-2 py-1" style={{ backgroundColor: `${C.gold}12`, color: C.gold, fontFamily: FONT_B, fontWeight: 500, borderRadius: "4px" }}>{b.cat}</span>
                    <span className="text-xs" style={{ color: C.textLight, fontFamily: FONT_B }}>{b.date}</span>
                  </div>
                  <h3 className="mb-3" style={{ fontFamily: FONT_D, fontSize: "1.15rem", fontWeight: 500, color: C.charcoal, lineHeight: 1.3 }}>{b.title}</h3>
                  <p className="text-[13px] leading-relaxed flex-1" style={{ color: C.taupe, fontFamily: FONT_B, fontWeight: 300 }}>{b.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm" style={{ color: C.gold, fontFamily: FONT_B, fontWeight: 500 }}>Read More {Arrow}</span>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════════ */
function Contact() {
  const [sent, setSent] = useState(false);
  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  const inp: CSSProperties = { fontFamily: FONT_B, fontSize: ".875rem", padding: "12px 16px", border: `1px solid ${C.beige}`, backgroundColor: "#fff", color: C.charcoal, outline: "none", width: "100%", transition: "border-color .3s", borderRadius: "8px" };
  const lbl: CSSProperties = { fontFamily: FONT_B, fontSize: ".7rem", fontWeight: 500, color: C.taupe, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6, display: "block" };

  const locs = ["Kokapet", "Gachibowli", "Narsingi", "Kollur", "Tellapur", "Manikonda", "Lingampally", "Alkapur Township", "Other"];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: C.warmWhite }} id="contact">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <Fade>
          <div>
            <Tag>Get in Touch</Tag>
            <h2 className="text-left mt-2 mb-6" style={{ fontFamily: FONT_D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, lineHeight: 1.2, color: C.charcoal }}>
              Book Your Free <span style={{ color: C.gold, fontStyle: "italic" }}>Consultation</span>
            </h2>
            <p className="leading-relaxed mb-10" style={{ color: C.taupe, fontFamily: FONT_B, fontWeight: 300, fontSize: ".95rem", maxWidth: 440 }}>
              Take the first step towards your dream interior. Our design consultants are ready to understand your vision and provide expert guidance.
            </p>

            <div className="space-y-5">
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>, label: "Phone", value: "+91 89191 79795", href: "tel:+918919179795" },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: "Email", value: "hello@aptinterio.com", href: "mailto:hello@aptinterio.com" },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: "Location", value: "Hyderabad, Telangana", href: "#" },
              ].map((c, i) => (
                <a key={i} href={c.href} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 flex items-center justify-center mt-0.5" style={{ backgroundColor: C.cream }}>{c.icon}</span>
                  <span>
                    <span className="block text-xs tracking-wider uppercase mb-1" style={{ color: C.textLight, fontFamily: FONT_B }}>{c.label}</span>
                    <span className="text-sm" style={{ color: C.charcoal, fontFamily: FONT_B, fontWeight: 400 }}>{c.value}</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4 p-4" style={{ backgroundColor: `${C.gold}08`, border: `1px solid ${C.gold}15`, borderRadius: "12px" }}>
              <div className="flex -space-x-2">
                {["P", "R", "A"].map((ch, i) => <span key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: C.charcoal, border: `2px solid ${C.warmWhite}` }}>{ch}</span>)}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">{[1, 2, 3, 4, 5].map(n => <svg key={n} width="12" height="12" viewBox="0 0 16 16" fill={C.gold}><path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.63l-3.52 1.85.67-3.93L2.3 5.77l3.94-.57z" /></svg>)}</div>
                <p className="text-xs" style={{ color: C.taupe, fontFamily: FONT_B }}>Rated 4.8/5 by 82+ happy clients</p>
              </div>
            </div>
          </div>
        </Fade>

        {/* Right - Form */}
        <Fade delay={.15}>
          <form onSubmit={handle} className="p-8 md:p-10" style={{ backgroundColor: "#fff", boxShadow: "0 4px 30px rgba(0,0,0,.06)", borderRadius: "20px" }}>
            <h3 className="text-xl mb-1" style={{ fontFamily: FONT_D, fontWeight: 600, color: C.charcoal }}>Request a Consultation</h3>
            <p className="mb-8 text-sm" style={{ color: C.textLight, fontFamily: FONT_B, fontWeight: 300 }}>We respond within 2 hours during business hours.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div><label style={lbl}>First Name</label><input style={inp} required placeholder="Priya" onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)} /></div>
              <div><label style={lbl}>Last Name</label><input style={inp} required placeholder="Sharma" onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div><label style={lbl}>Email</label><input type="email" style={inp} required placeholder="you@email.com" onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)} /></div>
              <div><label style={lbl}>Phone</label><input type="tel" style={inp} required placeholder="+91 XXXXX XXXXX" onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div><label style={lbl}>Project Type</label><select style={{ ...inp, appearance: "none" as const }} onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)}><option>Residential</option><option>Commercial</option><option>Villa</option><option>Renovation</option><option>3D Design Only</option></select></div>
              <div><label style={lbl}>Property Location</label><select style={{ ...inp, appearance: "none" as const }} onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)}><option value="">Select Area</option>{locs.map(l => <option key={l}>{l}</option>)}</select></div>
            </div>
            <div className="mb-6"><label style={lbl}>Message</label><textarea rows={4} style={{ ...inp, resize: "vertical" as const }} placeholder="Tell us about your project..." onFocus={e => (e.target.style.borderColor = C.gold)} onBlur={e => (e.target.style.borderColor = C.beige)} /></div>

            <button type="submit" className="w-full py-4 text-sm tracking-wide transition-all hover:brightness-110 cursor-pointer" style={{ backgroundColor: C.gold, color: "#fff", fontFamily: FONT_B, fontWeight: 500, border: "none", boxShadow: `0 4px 20px ${C.gold}30`, borderRadius: "10px" }}>
              {sent ? "Thank You! We'll Contact You Soon" : "Book Free Consultation"}
            </button>
          </form>
        </Fade>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  const svcLinks = ["Residential Interiors", "Commercial Interiors", "3D & 2D Designing", "Lighting Design", "Home Automation", "Turnkey Management", "Custom Furniture", "Interior Renovations"];
  const coLinks = ["About Us", "Portfolio", "Testimonials", "Careers", "Blog", "Privacy Policy"];
  const locLinks = ["Kokapet", "Gachibowli", "Narsingi", "Kollur", "Tellapur", "Manikonda"];

  const fLink = (text: string, href = "#") => (
    <li key={text}>
      <a href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,.4)", fontFamily: FONT_B, fontWeight: 300 }}
        onMouseEnter={e => ((e.target as HTMLElement).style.color = C.gold)} onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.4)")}>
        {text}
      </a>
    </li>
  );

  return (
    <footer style={{ backgroundColor: C.deep }}>
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: C.gold }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="#fff" /></svg>
              </span>
              <span className="text-white text-lg tracking-wider" style={{ fontFamily: FONT_D, fontWeight: 500 }}>APT<span style={{ color: C.gold }}>INTERIO</span></span>
            </div>
            <p className="leading-relaxed max-w-xs mb-6" style={{ color: "rgba(255,255,255,.4)", fontFamily: FONT_B, fontSize: ".9rem", fontWeight: 300 }}>
              Premium turnkey interior designer in Hyderabad delivering bespoke residential and commercial interiors across Kokapet, Gachibowli, Narsingi, Kollur, Tellapur and surrounding premium locations.
            </p>
            <div className="space-y-2">
              <a href="tel:+918919179795" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,.45)", fontFamily: FONT_B }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                +91 89191 79795
              </a>
              <a href="mailto:hello@aptinterio.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,.45)", fontFamily: FONT_B }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                hello@aptinterio.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm mb-5 tracking-wider uppercase" style={{ color: C.gold, fontFamily: FONT_B, fontWeight: 500 }}>Services</h4>
            <ul className="space-y-2.5">{svcLinks.map(s => fLink(s, "#services"))}</ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm mb-5 tracking-wider uppercase" style={{ color: C.gold, fontFamily: FONT_B, fontWeight: 500 }}>Company</h4>
            <ul className="space-y-2.5">{coLinks.map(s => fLink(s))}</ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm mb-5 tracking-wider uppercase" style={{ color: C.gold, fontFamily: FONT_B, fontWeight: 500 }}>Locations</h4>
            <ul className="space-y-2.5">{locLinks.map(s => fLink(`Interior Designers in ${s}`, "#locations"))}</ul>
          </div>
        </div>

        <GoldLine />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,.25)", fontFamily: FONT_B }}>&copy; 2026 AptInterio. All rights reserved. | Best Interior Designers in Hyderabad</p>
          <div className="flex gap-5">
            {["Instagram", "Pinterest", "LinkedIn", "YouTube"].map(s => (
              <a key={s} href="#" className="text-xs transition-colors" style={{ color: "rgba(255,255,255,.25)", fontFamily: FONT_B }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = C.gold)} onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,.25)")} aria-label={`AptInterio on ${s}`}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



/* ═══════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.warmWhite }}>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Cta />
        <Testimonials />
        <Locations />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
