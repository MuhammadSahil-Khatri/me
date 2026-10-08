'use client';

import { Component, Suspense, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, ArrowUp, Menu, X, Plus, Minus, Send, Sun, Moon } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { certifications, experience, projects, socialLinks, technologies } from '@/lib/portfolio-data';

const TechGlobe = dynamic(() => import('@/components/tech-globe'), {
  ssr: false,
  loading: () => <div className="globe-fallback" aria-label="Technology network" />,
});

function GithubVectorIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 106 103" fill="currentColor" className={className} aria-hidden="true">
      <path d="M52.8902 4.4248e-06C23.6683 -0.011812 0 23.6446 0 52.843C0 75.9322 14.806 95.5593 35.4256 102.767C38.2024 103.464 37.7771 101.491 37.7771 100.144V90.9863C21.7422 92.8651 21.0923 82.254 20.017 80.4815C17.8428 76.7712 12.7026 75.8259 14.2388 74.0534C17.89 72.1746 21.6122 74.5261 25.9252 80.8951C29.0447 85.5153 35.1302 84.7355 38.2143 83.9674C38.8878 81.1905 40.3294 78.7091 42.3146 76.783C25.7007 73.8053 18.7763 63.6668 18.7763 51.6141C18.7763 45.7649 20.7023 40.3885 24.4836 36.0519C22.073 28.9029 24.7081 22.782 25.0626 21.8722C31.9279 21.2577 39.065 26.7878 39.6204 27.225C43.5198 26.1733 47.9746 25.618 52.9611 25.618C57.9713 25.618 62.4379 26.197 66.3728 27.2605C67.708 26.2442 74.3252 21.494 80.7061 22.0731C81.0487 22.9829 83.6247 28.962 81.356 36.0164C85.1845 40.3648 87.1342 45.7886 87.1342 51.6495C87.1342 63.7259 80.1625 73.8762 63.5014 76.8066C64.9284 78.2101 66.0616 79.8838 66.8345 81.73C67.6075 83.5763 68.0049 85.558 68.0034 87.5596V100.853C68.0979 101.917 68.0034 102.968 69.7759 102.968C90.7027 95.9138 105.769 76.1449 105.769 52.8548C105.769 23.6446 82.0886 4.4248e-06 52.8902 4.4248e-06Z" />
    </svg>
  );
}

function LinkedinVectorIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 130" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 10.7983C0.00311018 7.93535 1.14178 5.19057 3.16617 3.16618C5.19056 1.14179 7.93533 0.00312458 10.7983 1.43956e-05H118.44C119.859 -0.0023036 121.265 0.275334 122.577 0.817031C123.889 1.35873 125.081 2.15385 126.085 3.15686C127.089 4.15988 127.885 5.3511 128.428 6.66232C128.972 7.97354 129.251 9.37901 129.25 10.7983V118.44C129.25 121.306 128.112 124.055 126.086 126.082C124.06 128.109 121.312 129.248 118.446 129.25H10.7983C7.93431 129.247 5.18865 128.107 3.1641 126.082C1.13954 124.056 0.0015548 121.31 0 118.446V10.7983ZM51.1595 49.2795H68.6611V58.0685C71.1874 53.016 77.6499 48.4688 87.3613 48.4688C105.979 48.4688 110.391 58.5326 110.391 76.9978V111.202H91.5501V81.2043C91.5501 70.688 89.0239 64.7543 82.6084 64.7543C73.7077 64.7543 70.0065 71.1521 70.0065 81.2043V111.202H51.1595V49.2795ZM18.847 110.397H37.694V48.4688H18.847V110.397ZM40.3906 28.2705C40.4262 29.8842 40.139 31.4888 39.546 32.99C38.9531 34.4912 38.0662 35.8589 36.9375 37.0127C35.8088 38.1665 34.461 39.0833 32.9732 39.7092C31.4854 40.3351 29.8875 40.6575 28.2734 40.6575C26.6593 40.6575 25.0615 40.3351 23.5737 39.7092C22.0859 39.0833 20.7381 38.1665 19.6094 37.0127C18.4807 35.8589 17.5938 34.4912 17.0008 32.99C16.4079 31.4888 16.1207 29.8842 16.1562 28.2705C16.226 25.103 17.5333 22.0888 19.7981 19.8733C22.0629 17.6578 25.1052 16.4172 28.2734 16.4172C31.4417 16.4172 34.484 17.6578 36.7488 19.8733C39.0136 22.0888 40.3209 25.103 40.3906 28.2705Z" />
    </svg>
  );
}

function XVectorIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.6 0C3.40813 0 0 3.40813 0 7.6V45.6C0 49.7919 3.40813 53.2 7.6 53.2H45.6C49.7919 53.2 53.2 49.7919 53.2 45.6V7.6C53.2 3.40813 49.7919 0 45.6 0H7.6ZM42.8806 9.975L30.5544 24.0588L45.0537 43.225H33.7012L24.8188 31.5994L14.6419 43.225H9.00125L22.1825 28.1556L8.27687 9.975H19.9144L27.9537 20.6031L37.24 9.975H42.8806ZM38.3919 39.8525L18.2162 13.1694H14.8556L35.2569 39.8525H38.3919Z" />
    </svg>
  );
}

const socialIcons: Record<string, ({ size, className }: { size?: number; className?: string }) => ReactNode> = {
  GitHub: GithubVectorIcon,
  LinkedIn: LinkedinVectorIcon,
  X: XVectorIcon,
};

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SocialLinks({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={expanded ? 'social-links expanded' : 'social-links'}>
      {socialLinks.map(({ name, url }) => {
        const Icon = socialIcons[name] ?? GithubVectorIcon;
        return (
          <Button
            key={name}
            variant="ghost"
            size={expanded ? 'default' : 'icon'}
            asChild
            title={name}
            aria-label={`${name} profile`}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Icon size={16} />
              {expanded && <span>{name}</span>}
            </a>
          </Button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be unavailable. */ }
    const nextDark = saved === 'dark';
    setDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
  }, []);
  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    try { localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light'); } catch { /* Theme still works without storage. */ }
  }
  const themeSwitch = <Button variant="ghost" size="icon" className="theme-toggle" title={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</Button>;
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
      <nav aria-label="Main navigation" className="desktop-nav">{['Work', 'About', 'Contact'].map(label => <a className={active === label.toLowerCase() ? 'active' : ''} href={`#${label.toLowerCase()}`} key={label}>{label}<ArrowUpRight size={12} /></a>)}<a className="nav-resume" href="/Muhammad_Sahil_Khatri_Resume.pdf" download="Muhammad_Sahil_Khatri_Resume.pdf" target="_blank" rel="noopener noreferrer">RESUME<ArrowDown size={12} /></a></nav>
      <div className="mobile-header-controls">{themeSwitch}<Button className="mobile-menu-button" variant="ghost" size="icon" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </header>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{['Work', 'About', 'Contact'].map(label => <a href={`#${label.toLowerCase()}`} onClick={() => setOpen(false)} key={label}>{label}<ArrowUpRight /></a>)}<a href="mailto:sahilkhatri.dev@gmail.com" onClick={() => setOpen(false)}>sahilkhatri.dev@gmail.com<ArrowUpRight /></a><a href="/Muhammad_Sahil_Khatri_Resume.pdf" download="Muhammad_Sahil_Khatri_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Resume<ArrowDown /></a></nav>}
    <aside className="social-rail" aria-label="Social profiles">{themeSwitch}<div className="rail-bottom"><span className="rail-label">ELSEWHERE</span><SocialLinks /></div></aside>
  </>;
}

function TypewriterName() {
  const fullName = 'Muhammad\nSahil\nKhatri';
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

  const lines = text.split('\n');

  return (
    <span className="hero-name-wrap">
      {lines.map((line, idx) => (
        <span key={idx} className="hero-name-line">
          {line}
          {idx === 1 && line.length >= 5 && (
            <span className="hero-name-badge" aria-hidden="true">
              <img src="/me.png" alt="Muhammad Sahil Khatri" />
            </span>
          )}
          {idx === lines.length - 1 && (
            <>
              {done && <span className="name-period">.</span>}
              <span className="name-caret" aria-hidden="true" />
            </>
          )}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return <section id="home" className="hero page-inner">
    <Reveal><div className="hero-eyebrow"><span className="tiny-dot" /> BACKEND ENGINEER & SYSTEMS THINKER <span className="eyebrow-index">PROFILE — 2026</span></div>
      <h1 aria-label="Hi, I'm Muhammad Sahil Khatri."><span className="hero-greeting" aria-hidden="true">Hi, I'm</span><span aria-hidden="true"><TypewriterName /></span></h1>
      <div className="hero-bottom"><p>Backend Engineer building reliable systems,<br className="desktop-break" /> scalable infrastructure, and AI-powered workflows.</p><a className="round-link" href="#work" aria-label="Explore Recent Work Samples"><ArrowDown strokeWidth={1.2} size={28} /></a></div>
    </Reveal>
    <Reveal className="hero-footnote"><span>COMPUTER SYSTEMS ENGINEERING STUDENT @ <a className="hero-footnote-link" href="https://www.muet.edu.pk/" target="_blank" rel="noopener noreferrer">MUET<ArrowUpRight size={10} /></a></span></Reveal>
  </section>;
}

export function ProjectList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <section id="work" className="work page-inner"><Reveal><div className="section-kicker"><span>01 / MY PORTFOLIO</span><span>A FEW THINGS I'VE BEEN EXPLORING</span></div><div className="section-title-row"><h2>RECENT WORK SAMPLES<span className="title-dot">.</span></h2></div></Reveal>
    {projects.map(project => {
      const imageSrc = typeof project.image === 'string' ? project.image : (project.image as { src: string }).src;
      return (
        <Reveal key={project.number} className="project-row">
          <div className="project-visual">
            <span className="image-index">{project.number} — {project.status.toUpperCase()}</span>
            <img src={imageSrc} alt={project.imageAlt} loading="lazy" width={1440} height={1024} />
            <span className="image-caption">SYSTEM STUDY / {project.number}</span>
          </div>
          <div className="project-info">
            <div className="project-category">{project.category}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <Button variant="editorial" aria-expanded={expanded === project.number} onClick={() => setExpanded(expanded === project.number ? null : project.number)}>
              VIEW PROJECT {expanded === project.number ? <Minus size={18} /> : <ArrowUpRight size={18} />}
            </Button>
            {expanded === project.number && (
              <div className="project-detail">
                <span>PROJECT OVERVIEW</span>
                <p>{project.detail}</p>
              </div>
            )}
          </div>
        </Reveal>
      );
    })}
  </section>;
}

class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
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
  return <section id="about" className="technology"><div className="page-inner"><Reveal><div className="section-kicker"><span>02 / THE TOOLKIT</span><span>CONNECTED BY CURIOSITY</span></div><div className="tech-heading"><h2>ECOSYSTEM / 360°<span className="title-dot">.</span></h2><p>From the database to the interface.<br />The tools behind the systems.</p></div></Reveal><Reveal className="globe-stage"><div className="globe-canvas"><GlobeBoundary><Suspense fallback={<div className="globe-fallback" />}>{ready && <TechGlobe />}</Suspense></GlobeBoundary></div><div className="globe-labels">{technologies.map((tech, index) => <span key={tech} className={`tech-label tech-label-${index}`}><Plus size={10} />{tech}</span>)}</div><span className="globe-coordinate">ENGINEERING ECOSYSTEM / 360°</span></Reveal><Reveal className="tech-bottom"><span>ALWAYS LEARNING. ALWAYS ITERATING.</span><span>BACKEND · INFRASTRUCTURE · AI</span></Reveal></div></section>;
}

export function ExperienceSection() {
  return <section id="experience" className="experience page-inner"><Reveal><div className="section-kicker"><span>03 / MY EXPERIENCE</span><span>BUILDING SYSTEMS AND SHIPPING WORK</span></div><div className="section-title-row"><h2>JOURNEY<span className="title-dot">.</span></h2></div></Reveal>
    <div className="experience-list">{experience.map(item => <Reveal key={`${item.company}-${item.role}`} className="experience-row"><div className="experience-period">{item.period}</div><div><span className="experience-company">{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="experience-company-link">{item.company}<ArrowUpRight size={10} /></a> : item.company}</span><h3>{item.role}</h3></div><div><p>{item.summary}</p><div className="project-tags">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></Reveal>)}</div>
  </section>;
}

export function CertificationsSection() {
  return <section id="certifications" className="certifications page-inner"><Reveal><div className="section-kicker"><span>04 / MY CERTIFICATIONS</span><span>FORMAL MILESTONES / CONTINUOUS LEARNING</span></div><div className="certification-layout"><h2>HONOURS<span className="title-dot">.</span></h2><div className="certification-list">{certifications.map(item => <div className="certification-row" key={item.title}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.issuer}</p></div><ArrowUpRight aria-hidden="true" /></div>)}</div></div></Reveal></section>;
}

const inquirySchema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(255, 'Email is too long.'),
  description: z.string().trim().min(10, 'Please add at least 10 characters.').max(1000, 'Keep your message under 1,000 characters.'),
});

export function InquirySection() {
  const [errors, setErrors] = useState<{ email?: string; description?: string }>({});
  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = inquirySchema.safeParse({ email: data.get('email'), description: data.get('description') });
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      const nextErrors: { email?: string; description?: string } = {};
      if (fields.email?.[0]) nextErrors.email = fields.email[0];
      if (fields.description?.[0]) nextErrors.description = fields.description[0];
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio enquiry from ${result.data.email}`);
    const body = encodeURIComponent(`From: ${result.data.email}\n\n${result.data.description}`);
    window.location.href = `mailto:sahilkhatri.dev@gmail.com?subject=${subject}&body=${body}`;
  }
  return <section className="inquiry page-inner" aria-labelledby="inquiry-title"><Reveal><div className="section-kicker"><span>04 / START A CONVERSATION</span><span>TELL ME WHAT YOU'RE BUILDING</span></div><div className="inquiry-layout"><div><h2 id="inquiry-title">HAVE A PROJECT<br />IN MIND<span className="title-dot">?</span></h2><p>Share a few details and your email app will prepare the message.</p></div><form onSubmit={submitInquiry} noValidate><div className="field"><label htmlFor="inquiry-email">Your email</label><input id="inquiry-email" name="email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <span id="email-error" role="alert">{errors.email}</span>}</div><div className="field"><label htmlFor="inquiry-description">Description</label><textarea id="inquiry-description" name="description" rows={5} minLength={10} maxLength={1000} placeholder="A short description of your project, role, or idea..." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <span id="description-error" role="alert">{errors.description}</span>}</div><Button type="submit" variant="editorial" className="inquiry-submit">PREPARE EMAIL <Send size={18} /></Button></form></div></Reveal></section>;
}

export function ContactSection() {
  return <section id="contact" className="contact page-inner"><Reveal><div className="section-kicker"><span>05 / WHAT'S NEXT</span><span>GOOD WORK STARTS WITH A CONVERSATION</span></div><h2>LET'S BUILD<br />SOMETHING USEFUL<span className="title-dot">.</span></h2><div className="contact-bottom"><div><Button variant="editorial" className="contact-action" onClick={() => { window.location.href = 'mailto:sahilkhatri.dev@gmail.com'; }}>GET IN TOUCH <ArrowUpRight size={26} /></Button></div><SocialLinks expanded /></div></Reveal></section>;
}

export function Footer() {
  const reduced = useReducedMotion();
  return <motion.footer initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="footer page-inner"><a href="#home" className="wordmark">MSK<span className="logo-dot">.</span></a><span>© 2026 MUHAMMAD SAHIL KHATRI</span><a className="back-top" href="#home">BACK TO TOP <ArrowUp size={14} /></a></motion.footer>;
}