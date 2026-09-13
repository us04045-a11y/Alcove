import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck, X, Sliders, ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';
import { safeLocalStorage } from '../utils/security';

interface PrivacyBannerProps {
  onOpenPolicy: () => void;
  forceOpen?: boolean;
  onCloseBanner?: () => void;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({
  onOpenPolicy,
  forceOpen,
  onCloseBanner,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      return;
    }

    // Check if visitor has made a decision on website privacy / cookies
    const savedConsent = safeLocalStorage.getItem('alcove_website_privacy_consent');
    if (!savedConsent) {
      // Pop up smoothly shortly after initial page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    safeLocalStorage.setItem(
      'alcove_website_privacy_consent',
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
    if (onCloseBanner) onCloseBanner();
  };

  const handleRejectNonEssential = () => {
    safeLocalStorage.setItem(
      'alcove_website_privacy_consent',
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
    if (onCloseBanner) onCloseBanner();
  };

  const handleSaveCustom = () => {
    safeLocalStorage.setItem(
      'alcove_website_privacy_consent',
      JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        marketing: marketingConsent,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
    if (onCloseBanner) onCloseBanner();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onCloseBanner) onCloseBanner();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="false"
        aria-label="Website Privacy and Cookie Consent"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 pointer-events-auto"
      >
        <div className="bg-[#0C2415]/95 backdrop-blur-xl text-white p-5 sm:p-6 rounded-3xl border border-[#235836] shadow-2xl shadow-black/40 relative overflow-hidden">
          {/* Subtle Ambient Light Glow */}
          <div className="absolute right-0 top-0 w-44 h-44 bg-[#C4E894]/12 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#184425] border border-[#2B6A3D] flex items-center justify-center shrink-0 shadow-sm text-[#C4E894]">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono-custom font-bold uppercase tracking-wider text-[#C4E894] px-2 py-0.5 rounded-full bg-[#184425] border border-[#2B6A3D] inline-block mb-1">
                  Website Privacy & Cookies
                </span>
                <h3 className="font-cinzel font-bold text-sm sm:text-base text-white tracking-wide">
                  We Value Your Privacy
                </h3>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-[#78A182] hover:text-white transition-colors p-1.5 rounded-xl hover:bg-white/10 cursor-pointer"
              aria-label="Close privacy pop-up"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div className="mt-3 relative z-10">
            <p className="text-xs text-[#BED8C4] font-sans leading-relaxed">
              We use essential cookies and process online inquiry data to ensure our website functions securely,
              remember your workspace preferences, and facilitate tour reservations. We do not sell your personal data.
            </p>
          </div>

          {/* Expandable Preferences Drawer */}
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-3.5 border-t border-[#1C462A] space-y-3 relative z-10"
            >
              {/* Category 1: Essential */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#11311D] border border-[#1E4D2C]">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Strictly Necessary</span>
                    <span className="text-[9px] font-mono-custom bg-[#1E4D2C] text-[#C4E894] px-1.5 py-0.5 rounded">
                      Always Active
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8EAFA5] mt-0.5">
                    Essential for site security, navigation, and booking form functionality.
                  </p>
                </div>
                <div className="w-5 h-5 rounded-md bg-[#C4E894] text-[#0C2415] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#11311D] border border-[#1E4D2C]">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Analytics & Performance
                  </div>
                  <p className="text-[11px] text-[#8EAFA5] mt-0.5">
                    Aggregated metrics to optimize page load speeds and mobile layouts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnalyticsConsent(!analyticsConsent)}
                  className={`w-10 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                    analyticsConsent ? 'bg-[#C4E894] justify-end' : 'bg-[#214F30] justify-start'
                  }`}
                  aria-label="Toggle analytics cookies"
                >
                  <div className={`w-5 h-5 rounded-full ${analyticsConsent ? 'bg-[#0C2415]' : 'bg-white/70'}`} />
                </button>
              </div>

              {/* Category 3: Personalization & Inquiries */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#11311D] border border-[#1E4D2C]">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Experience & Inquiries
                  </div>
                  <p className="text-[11px] text-[#8EAFA5] mt-0.5">
                    Remembers your workspace type choices and tour schedule draft.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMarketingConsent(!marketingConsent)}
                  className={`w-10 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                    marketingConsent ? 'bg-[#C4E894] justify-end' : 'bg-[#214F30] justify-start'
                  }`}
                  aria-label="Toggle experience cookies"
                >
                  <div className={`w-5 h-5 rounded-full ${marketingConsent ? 'bg-[#0C2415]' : 'bg-white/70'}`} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Action Controls */}
          <div className="mt-4 pt-3.5 border-t border-[#1C462A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 relative z-10">
            {/* Preferences Toggle & Full Policy Link */}
            <div className="flex items-center gap-3 text-xs font-mono-custom">
              <button
                type="button"
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-[#A7C8AF] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showPreferences ? 'Hide Options' : 'Preferences'}</span>
                {showPreferences ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>

              <span className="text-[#3A6B48]">•</span>

              <button
                type="button"
                onClick={onOpenPolicy}
                className="text-[#C4E894] hover:underline font-semibold cursor-pointer flex items-center gap-1"
              >
                <span>Read Policy</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Accept / Save Buttons */}
            <div className="flex items-center gap-2">
              {showPreferences ? (
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono-custom font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/20"
                >
                  Save Choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-transparent hover:bg-white/10 text-[#BED8C4] hover:text-white font-mono-custom font-semibold text-xs transition-colors cursor-pointer border border-[#2A663D]"
                >
                  Essential Only
                </button>
              )}

              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#C4E894] hover:bg-[#D4F3AA] text-[#0C2415] font-mono-custom font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
