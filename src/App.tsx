import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { ProjectModal } from './components/ProjectModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinematicIntro } from './components/CinematicIntro';
import { NotFoundPage } from './components/NotFoundPage';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { PrivacyBanner } from './components/PrivacyBanner';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { ProjectItem } from './types';
import { safeSessionStorage } from './utils/security';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const checkIs404 = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  const hash = window.location.hash;
  const search = window.location.search;
  return (
    (path !== '/' && path !== '/index.html' && path !== '') ||
    hash.startsWith('#/404') ||
    hash === '#404' ||
    search.includes('page=404')
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [is404, setIs404] = useState<boolean>(() => checkIs404());
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [forceOpenCookieBanner, setForceOpenCookieBanner] = useState<boolean>(false);
  
  // Cinematic Intro: available via Replay trigger in footer or custom event
  const [showIntro, setShowIntro] = useState<boolean>(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Sync route and popstate
  useEffect(() => {
    const onLocationChange = () => {
      setIs404(checkIs404());
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Lock scroll while intro or privacy modal is open
  useEffect(() => {
    if (showIntro || showPrivacyModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro, showPrivacyModal]);

  // Handle replay custom event
  useEffect(() => {
    const handleReplay = () => {
      setShowIntro(true);
    };
    window.addEventListener('replay-alcove-intro', handleReplay);
    return () => {
      window.removeEventListener('replay-alcove-intro', handleReplay);
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    safeSessionStorage.setItem('alcove_cinematic_intro_seen', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Initialize Lenis smooth inertia scrolling & bind to GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projets');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToConsultation = () => {
    const el = document.getElementById('contact');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigateHome = () => {
    setIs404(false);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrigger404 = () => {
    setIs404(true);
    window.history.pushState({}, '', '/404');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If unmapped route / 404 is active, render custom 404 page
  if (is404) {
    return (
      <div className="min-h-screen bg-[#FAFBF9] text-[#0F2A1A] font-sans selection:bg-[#C4E894] selection:text-[#0F2A1A]">
        <NotFoundPage
          onNavigateHome={handleNavigateHome}
          onSelectSpace={(project) => {
            handleNavigateHome();
            setTimeout(() => {
              setSelectedProject(project);
            }, 120);
          }}
          onOpenConsultation={() => {
            handleNavigateHome();
            setTimeout(() => {
              handleScrollToConsultation();
            }, 120);
          }}
        />

        {/* Privacy Policy Pop-up Modal can still be opened from anywhere */}
        <PrivacyPolicyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-[#0F2A1A] font-sans selection:bg-[#C4E894] selection:text-[#0F2A1A]">
      {/* Cinematic Animated Brand Sequence (plays once upon page load) */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Sticky Top Navigation */}
      <Navbar onOpenConsultation={handleScrollToConsultation} />

      {/* Main Architectural Showcase */}
      <main className="relative">
        {/* 1. Interactive 3D Depth & Fluid Hero with Layer Explorer */}
        <HeroSection
          onExploreInteriors={handleScrollToProjects}
          onOpenConsultation={handleScrollToConsultation}
        />

        {/* 2. Selected Works & Coworking Spaces Showcase */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 3. Why Alcove - Verified Google Reviews & Standards (No Graphs) */}
        <WhyUsSection onOpenConsultation={handleScrollToConsultation} />

        {/* 4. Interactive Space Planner & Architectural Consultation Brief */}
        <ConsultationSection />
      </main>

      {/* Fullscreen Architectural Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => {
          setSelectedProject(null);
          handleScrollToConsultation();
        }}
      />

      {/* Privacy Policy Pop-up Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />

      {/* Website Privacy & Cookie Consent Pop-Up */}
      <PrivacyBanner
        onOpenPolicy={() => setShowPrivacyModal(true)}
        forceOpen={forceOpenCookieBanner}
        onCloseBanner={() => setForceOpenCookieBanner(false)}
      />

      {/* Architectural Studio Footer */}
      <Footer
        onReplayIntro={handleReplayIntro}
        onOpenPrivacyPolicy={() => setShowPrivacyModal(true)}
        onOpenCookieSettings={() => setForceOpenCookieBanner(true)}
        onTrigger404={handleTrigger404}
      />

      {/* Floating WhatsApp 'For More Inquiry' Button (Bottom-Right) */}
      <FloatingWhatsAppButton phoneInternational="923001407991" displayNumber="0300-1407991" />

      {/* Sticky Mobile/Tablet Bottom CTA Bar (<768px) */}
      <MobileStickyCTA onBookTour={handleScrollToConsultation} phoneDisplay="0300-1407991" phoneInternational="923001407991" />
    </div>
  );
}

