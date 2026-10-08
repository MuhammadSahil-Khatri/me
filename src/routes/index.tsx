import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Hero, ProjectList, Technology, ExperienceSection, CertificationsSection, InquirySection, ContactSection, Footer } from '@/components/portfolio';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Muhammad Sahil Khatri — Backend Engineer' },
    { name: 'description', content: 'Muhammad Sahil Khatri, backend engineer and Computer Systems Engineering student. Exploring reliable systems, infrastructure, and AI-powered workflows.' },
    { property: 'og:title', content: 'Muhammad Sahil Khatri — Backend Engineer' },
    { property: 'og:description', content: 'An engineering portfolio exploring reliable backend systems, scalable infrastructure, and intelligent workflows.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  return <><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main" className="portfolio-main"><Hero /><ProjectList /><Technology /><ExperienceSection /><CertificationsSection /><InquirySection /><ContactSection /><Footer /></main></>;
}
