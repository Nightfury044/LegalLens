import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { CTA } from './CTA';
import { Footer } from './Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero onGetStarted={onGetStarted} />
      <Features />
      <HowItWorks />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}