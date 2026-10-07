import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, ArrowUp, Github, Linkedin, Menu, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, technologies } from '@/lib/portfolio-data';

const TechGlobe = lazy(() => import('@/components/tech-globe'));
const socialItems = [{ name: 'GitHub', Icon: Github }, { name: 'LinkedIn', Icon: Linkedin }, { name: 'X', Icon: X }];

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SocialLinks({ expanded = false }: { expanded?: boolean }) {
  const [notice, setNotice] = useState('');
  return <div className={expanded ? 'social-links expanded' : 'social-links'}>
    {socialItems.map(({ name, Icon }) => <Button key={name} variant="ghost" size={expanded ? 'default' : 'icon'} title={`${name} — profile link pending`} aria-label={`${name} profile`} onClick={() => setNotice(`${name} profile link is not available yet.`)}><Icon size={16} />{expanded && <span>{name}</span>}</Button>)}
    {notice && <div role="status" className="social-notice" onClick={() => setNotice('')}>{notice}</div>}
  </div>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <>
    <header className="site-header"><a className="wordmark" href="#home" aria-label="MSK home">MSK<span className="logo-dot">.</span></a>
      <a className="nav-email" href="mailto:sahilkhatri.dev@gmail.com">sahilkhatri.dev@gmail.com</a>
      <nav aria-label="Main navigation" className="desktop-nav">{['Work', 'About', 'Contact'].map(label => <a className={active === label.toLowerCase() ? 'active' : ''} href={`#${label.toLowerCase()}`} key={label}>{label}<ArrowUpRight size={12} /></a>)}<a className="nav-resume" href="/resume.pdf" download="Muhammad-Sahil-Khatri-Resume.pdf">RESUME<ArrowDown size={12} /></a></nav>
      <Button className="mobile-menu-button" variant="ghost" size="icon" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </header>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{['Work', 'About', 'Contact'].map(label => <a href={`#${label.toLowerCase()}`} onClick={() => setOpen(false)} key={label}>{label}<ArrowUpRight /></a>)}<a href="mailto:sahilkhatri.dev@gmail.com" onClick={() => setOpen(false)}>sahilkhatri.dev@gmail.com<ArrowUpRight /></a><a href="/resume.pdf" download="Muhammad-Sahil-Khatri-Resume.pdf" onClick={() => setOpen(false)}>Resume<ArrowDown /></a></nav>}
    <aside className="social-rail" aria-label="Social profiles"><span className="rail-label">ELSEWHERE</span><SocialLinks /><span className="rail-line" /><span className="rail-bottom">MSK — 2026</span></aside>
  </>;
}

function TypewriterName() {
  const fullName = 'Muhammad Sahil Khatri';
  const reduced = useReducedMotion();
  const [text, setText] = useState('');
  const done = text.length >= fullName.length;
  useEffect(() => {
    if (reduced) { setText(fullName); return; }
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setText(fullName.slice(0, index));
      if (index >= fullName.length) clearInterval(timer);
    }, 90);
    return () => clearInterval(timer);
  }, [reduced]);
  return <>{text}{done && <span className="name-period">.</span>}<span className="name-caret" aria-hidden="true" /></>;
}

export function Hero() {
  return <section id="home" className="hero page-inner">
    <Reveal><div className="hero-eyebrow"><span className="tiny-dot" /> BACKEND ENGINEER & SYSTEMS THINKER <span className="eyebrow-index">PORTFOLIO — 2026</span></div>
      <h1 aria-label="Hi, I'm Muhammad Sahil Khatri."><span className="hero-greeting" aria-hidden="true">Hi, I'm</span><span aria-hidden="true"><TypewriterName /></span></h1>
      <div className="hero-bottom"><p>Backend Engineer building reliable systems,<br className="desktop-break" /> scalable infrastructure, and AI-powered workflows.</p><a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDown strokeWidth={1.2} size={28} /></a></div>
    </Reveal>
    <div className="hero-footnote"><span>COMPUTER SYSTEMS ENGINEERING STUDENT</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
  </section>;
}

export function ProjectList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <section id="work" className="work page-inner"><Reveal><div className="section-kicker"><span>01 / SELECTED WORK</span><span>A FEW THINGS I'VE BEEN EXPLORING</span></div><div className="section-title-row"><h2>Selected work<span className="title-dot">.</span></h2><span className="project-count">(02)</span></div></Reveal>
    {projects.map(project => <Reveal key={project.number} className="project-row"><div className="project-visual"><span className="image-index">{project.number} — {project.status.toUpperCase()}</span><img src={project.image} alt={project.imageAlt} loading="lazy" width={1440} height={1024} /><span className="image-caption">SYSTEM STUDY / {project.number}</span></div><div className="project-info"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Button variant="editorial" aria-expanded={expanded === project.number} onClick={() => setExpanded(expanded === project.number ? null : project.number)}>VIEW PROJECT {expanded === project.number ? <Minus size={18} /> : <ArrowUpRight size={18} />}</Button>{expanded === project.number && <div className="project-detail"><span>PROJECT OVERVIEW</span><p>{project.detail}</p></div>}</div></Reveal>)}
  </section>;
}

class GlobeBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  override state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  override render() { return this.state.failed ? <div className="globe-fallback" aria-label="Technology network" /> : this.props.children; }
}

export function Technology() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = document.getElementById('about');
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '350px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section id="about" className="technology"><div className="page-inner"><Reveal><div className="section-kicker"><span>02 / THE TOOLKIT</span><span>CONNECTED BY CURIOSITY</span></div><div className="tech-heading"><h2>Built on good<br />foundations<span className="title-dot">.</span></h2><p>From the database to the interface.<br />The tools behind the systems.</p></div></Reveal><div className="globe-stage"><div className="globe-canvas"><GlobeBoundary><Suspense fallback={<div className="globe-fallback" />}>{ready && <TechGlobe />}</Suspense></GlobeBoundary></div><div className="globe-labels">{technologies.map((tech, index) => <span key={tech} className={`tech-label tech-label-${index}`}><Plus size={10} />{tech}</span>)}</div><span className="globe-coordinate">ENGINEERING ECOSYSTEM / 360°</span></div><div className="tech-bottom"><span>ALWAYS LEARNING. ALWAYS ITERATING.</span><span>BACKEND · INFRASTRUCTURE · AI</span></div></div></section>;
}

export function ContactSection() {
  return <section id="contact" className="contact page-inner"><Reveal><div className="section-kicker"><span>03 / WHAT'S NEXT</span><span>GOOD WORK STARTS WITH A CONVERSATION</span></div><h2>Let's build<br />something useful<span className="title-dot">.</span></h2><div className="contact-bottom"><div><Button variant="editorial" className="contact-action" onClick={() => { window.location.href = 'mailto:sahilkhatri.dev@gmail.com'; }}>GET IN TOUCH <ArrowUpRight size={26} /></Button></div><SocialLinks expanded /></div></Reveal></section>;
}

export function Footer() {
  return <footer className="footer page-inner"><a href="#home" className="wordmark">MSK<span className="logo-dot">.</span></a><span>© 2026 MUHAMMAD SAHIL KHATRI</span><a className="back-top" href="#home">BACK TO TOP <ArrowUp size={14} /></a></footer>;
}