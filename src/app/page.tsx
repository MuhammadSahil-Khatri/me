import {
  Navbar,
  Hero,
  ProjectList,
  Technology,
  ExperienceSection,
  CertificationsSection,
  InquirySection,
  ContactSection,
  Footer,
} from '@/components/portfolio';

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="portfolio-main">
        <Hero />
        <ProjectList />
        <Technology />
        <ExperienceSection />
        <CertificationsSection />
        <InquirySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
