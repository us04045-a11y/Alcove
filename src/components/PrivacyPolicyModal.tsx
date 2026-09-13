import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Shield,
  Cookie,
  Lock,
  Globe,
  FileText,
  Search,
  CheckCircle2,
  Printer,
  ChevronDown,
  Mail,
  ExternalLink,
  Users,
  EyeOff,
  Server,
} from 'lucide-react';
import { AlcoveLogo } from './AlcoveLogo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PolicySection {
  id: string;
  category: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  summary: string;
  details: string[];
}

const WEBSITE_POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'overview',
    category: 'Scope & Agreement',
    title: '1. Overview & Application',
    icon: Globe,
    badge: 'Website & Digital Services',
    summary:
      'This Privacy Policy outlines how Alcove Spaces ("Alcove", "we", "us", or "our") collects, uses, and safeguards your personal information when you navigate alcove-spaces.com, submit tour inquiries, or utilize our digital services.',
    details: [
      'This policy applies exclusively to visitors of our website, prospective members requesting tours, and users communicating through our digital concierge channels.',
      'By accessing our website or submitting online forms, you consent to the data collection and usage practices described in this policy.',
      'We operate under the fundamental principle of data minimization: we only collect information essential for scheduling workspace walkthroughs, responding to inquiries, and delivering a secure web experience.',
      'Last updated: September 2026. Reviewed quarterly by the Alcove Information Governance Team.',
    ],
  },
  {
    id: 'collection',
    category: 'Data Collection',
    title: '2. Information We Collect Online',
    icon: FileText,
    badge: 'Voluntary & Technical',
    summary:
      'We collect information directly provided by you through online inquiry forms, as well as limited technical telemetry required to deliver the website reliably.',
    details: [
      'Inquiry & Tour Submissions: When you request a private walkthrough or day pass, we collect your Full Name, Corporate or Personal Email Address, Phone/WhatsApp Number, Team Size, Desired Move-In Date, and any specific architectural or acoustic requirements you specify.',
      'Communications Metadata: If you connect with our concierge via WhatsApp or email, we retain the chat log and contact details solely to manage your inquiry and reservation history.',
      'Technical & Browser Data: Our web servers automatically collect standard technical metrics, including IP address, browser type and version, operating system, approximate geographical location (city level), referring URL, and page interaction timestamps.',
      'Zero Sensitive Data: We do not collect, process, or store financial credit card numbers, government IDs, or sensitive personal demographics through this public website.',
    ],
  },
  {
    id: 'cookies',
    category: 'Cookie Policy',
    title: '3. Cookies & Tracking Technologies',
    icon: Cookie,
    badge: 'Transparent Controls',
    summary:
      'We use cookies—small text files saved on your device—to ensure seamless navigation, preserve your preferences, and maintain website security.',
    details: [
      'Strictly Necessary Cookies: Essential for the operation of the website, including managing security tokens, preventing CSRF attacks, and maintaining booking draft states. These cannot be disabled.',
      'Performance & Analytics Cookies: Anonymized metrics that help us understand which pages and workspace floor plans are most visited, allowing us to optimize loading speeds and responsive layouts.',
      'Preference Cookies: Local storage tokens that remember whether you have acknowledged our privacy pop-up and your selected viewing preferences.',
      'Managing Your Preferences: You can modify or withdraw your cookie consent at any time via the "Cookie Preferences" link in the website footer or by adjusting your browser cookie settings.',
    ],
  },
  {
    id: 'usage',
    category: 'Data Usage',
    title: '4. How We Use Your Information',
    icon: Users,
    badge: 'Zero Commercial Sale',
    summary:
      'Your information is used strictly to provide you with workspace information, facilitate tours, and maintain the integrity of our digital services.',
    details: [
      'Fulfilling Tour Requests: Scheduling and confirming private tours at our campus located at Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi.',
      'Concierge Communications: Providing customized pricing proposals, enterprise office availability, and meeting room reservation confirmations via WhatsApp or email.',
      'Security & Spam Prevention: Protecting our website infrastructure, contact endpoints, and members against malicious traffic, automated bots, and unauthorized penetration attempts.',
      'Strict No-Sale Guarantee: Alcove will never sell, rent, monetize, or barter your contact information, email address, or phone number to third-party marketing brokers or advertisers.',
    ],
  },
  {
    id: 'integrations',
    category: 'Third-Party Services',
    title: '5. Third-Party Integrations & Links',
    icon: Server,
    badge: 'Secure Partners',
    summary:
      'We integrate reputable third-party services to enhance site functionality. These services operate under strict data protection agreements.',
    details: [
      'WhatsApp Business API: When clicking "WhatsApp Us" or submitting a tour request via WhatsApp, you are redirected to WhatsApp/Meta servers subject to WhatsApp’s standard privacy agreement.',
      'Google Maps & Location Services: Our website embeds and links to Google Maps (share.google/1qecLhF0A7mw9mna7) to help you navigate to our Clifton campus.',
      'Hosting & CDN Infrastructure: Hosted on secure containerized cloud infrastructure with automated DDoS mitigation and 256-bit TLS/SSL encryption across all endpoints.',
      'No External Trackers: We do not deploy third-party advertising retargeting pixels (e.g. Facebook Pixel, TikTok Pixel) on this website.',
    ],
  },
  {
    id: 'security',
    category: 'Storage & Retention',
    title: '6. Data Protection & Retention Periods',
    icon: Lock,
    badge: 'AES-256 & TLS 1.3',
    summary:
      'We implement institutional-grade physical and digital security protocols to ensure your data is protected against unauthorized access, loss, or alteration.',
    details: [
      'In-Transit Encryption: All traffic between your browser and our servers is secured via 256-bit TLS 1.3 encryption.',
      'Restricted Personnel Access: Only vetted members of our senior management and on-site concierge team have access to tour booking entries and contact submissions.',
      'Retention Timeline: Prospective member inquiry submissions are retained for up to 90 days. If an inquiry does not result in an active membership agreement, contact records are purged upon request.',
    ],
  },
  {
    id: 'rights',
    category: 'Your Legal Rights',
    title: '7. Your Data Rights & Choices',
    icon: Shield,
    badge: 'GDPR & PECA Compliant',
    summary:
      'You maintain full ownership and sovereignty over your personal data under applicable data privacy laws, including GDPR and Pakistan’s Prevention of Electronic Crimes Act (PECA).',
    details: [
      'Right of Access: You have the right to request a complete copy of all personal records we hold about you.',
      'Right to Rectification: You may ask us to correct inaccurate or outdated contact information at any time.',
      'Right of Erasure ("Right to be Forgotten"): You may request that we permanently delete your inquiry records and contact history from our databases.',
      'Right to Withdraw Consent: You can withdraw your consent for future email or WhatsApp communications with immediate effect by notifying us.',
    ],
  },
  {
    id: 'spatial',
    category: 'Physical Privacy',
    title: '8. Spatial & Acoustic Privacy on Campus',
    icon: EyeOff,
    badge: 'Acoustic Sanctuary',
    summary:
      'For visitors transitioning into resident members, Alcove guarantees sound-isolated workspaces and strict privacy standards across our physical campus.',
    details: [
      'Zero Audio Surveillance: Alcove strictly forbids microphones, speech recognition devices, or smart speakers within private offices, focus pods, and bookable meeting rooms.',
      'Acoustic Speech Isolation: Wall systems, sound airlocks, and acoustic timber ceilings provide STC 48dB – 54dB speech attenuation.',
      'Perimeter CCTV Only: Physical security cameras are restricted exclusively to exterior gates, building perimeters, and public entrance atriums.',
    ],
  },
  {
    id: 'contact',
    category: 'Inquiries',
    title: '9. Contact Our Data Protection Officer',
    icon: Mail,
    badge: 'Direct Assistance',
    summary:
      'If you have any questions, requests, or concerns regarding this Website Privacy Policy, please reach out directly to our management team.',
    details: [
      'Physical Address: Alcove Crafted Spaces, Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi, Sindh, Pakistan.',
      'Privacy Email: privacy@alcove-spaces.com / karachi@alcove-spaces.com',
      'Direct Phone & WhatsApp: 0300-1407991 (+92 300 1407991)',
      'Response Time: All data access or deletion requests are acknowledged and fulfilled within 5 business days.',
    ],
  },
];

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<{ [id: string]: boolean }>({
    overview: true,
    collection: true,
    cookies: true,
  });
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const summaryText = `ALCOVE CRAFTED SPACES — Official Website Privacy Policy Summary
Campus: Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi
- We collect inquiry data (name, email, phone) solely to schedule workspace tours.
- Essential cookies ensure website security and functionality.
- We never sell or share your personal data with commercial brokers or ad networks.
- Users have full rights to access, modify, or permanently delete their data.
Contact: privacy@alcove-spaces.com • Phone: 0300-1407991`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const filteredSections = WEBSITE_POLICY_SECTIONS.filter((section) => {
    const matchesTab = activeTab === 'all' || section.id === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07170E]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D5E5D8] overflow-hidden flex flex-col max-h-[90vh] my-auto z-10"
        >
          {/* Header Banner */}
          <div className="bg-[#0D2416] text-white p-6 sm:p-8 border-b border-[#1C452B] relative overflow-hidden shrink-0">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 rounded-full bg-[#C4E894]/10 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C4E894] p-2 flex items-center justify-center shrink-0 shadow-lg shadow-[#C4E894]/20 hidden sm:flex">
                  <AlcoveLogo size={28} color="#0D2416" strokeWidth={3} showWordmark={false} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#1A4228] border border-[#2D6841] text-[10px] font-mono-custom text-[#C4E894] uppercase tracking-wider font-bold mb-2">
                    <Shield className="w-3 h-3 text-[#C4E894]" />
                    <span>Official Website Privacy & Cookie Policy</span>
                  </div>
                  <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-white tracking-wide">
                    Website Privacy Policy
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A6C4AE] font-sans mt-1 max-w-2xl leading-relaxed">
                    How Alcove Crafted Spaces protects your digital privacy, handles online inquiry forms,
                    and manages website cookies.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-[#173C24] hover:bg-[#C4E894] hover:text-[#0D2416] text-white transition-colors cursor-pointer shrink-0"
                title="Close Privacy Policy"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions & Search Bar */}
            <div className="mt-6 pt-5 border-t border-[#1C452B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78A182]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policy (e.g. cookies, WhatsApp, deletion, rights)..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#143520] border border-[#235635] text-xs font-sans text-white placeholder:text-[#6C9476] focus:outline-none focus:border-[#C4E894] transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-xl bg-[#163B23] hover:bg-[#205131] text-[#C4E894] text-xs font-mono-custom font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#28603B]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Summary Copied!' : 'Copy Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-[#163B23] hover:bg-[#205131] text-white text-xs font-mono-custom font-semibold hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer border border-[#28603B]"
                  title="Print official policy documentation"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar text-xs font-mono-custom">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-[#C4E894] text-[#0D2416] font-bold'
                    : 'bg-[#153822] text-[#A6C4AE] hover:text-white'
                }`}
              >
                All Sections ({WEBSITE_POLICY_SECTIONS.length})
              </button>
              {WEBSITE_POLICY_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeTab === sec.id
                      ? 'bg-[#C4E894] text-[#0D2416] font-bold'
                      : 'bg-[#153822] text-[#A6C4AE] hover:text-white'
                  }`}
                >
                  {sec.category}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Policy Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-[#FAFBF9]">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12 text-[#567A60]">
                <p className="font-sans text-sm">No policy sections match your search "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="mt-3 text-xs font-mono-custom text-[#173C24] underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredSections.map((section) => {
                const IconComponent = section.icon;
                const isExpanded = expandedSections[section.id] ?? false;

                return (
                  <article
                    key={section.id}
                    className="bg-white rounded-2xl border border-[#D5E5D8] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Section Top Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EDF6EF] border border-[#CFE4D2] flex items-center justify-center text-[#1E4D2B] shrink-0">
                          <IconComponent className="w-5 h-5 text-[#2E6F40]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono-custom text-[#3B6647] font-semibold uppercase tracking-wider">
                              {section.category}
                            </span>
                            <span className="text-[10px] font-mono-custom px-2 py-0.5 rounded-md bg-[#EDF6EF] text-[#1E4D2B] border border-[#CFE4D2] font-semibold">
                              {section.badge}
                            </span>
                          </div>
                          <h3 className="font-cinzel font-bold text-lg sm:text-xl text-[#0F2A1A] mt-0.5">
                            {section.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="p-1.5 rounded-lg text-[#567A60] hover:bg-[#F0F5F1] transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse section' : 'Expand section'}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Executive Summary */}
                    <p className="mt-3.5 text-xs sm:text-sm text-[#35583E] leading-relaxed font-sans font-medium">
                      {section.summary}
                    </p>

                    {/* Expandable Clauses */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#EEF5EF] space-y-2.5">
                        {section.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#44684E] font-sans">
                            <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })
            )}

            {/* Bottom Contact & Compliance Footer */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#EDF6EF] border border-[#CFE4D2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-[#2A5236]">
              <div>
                <span className="font-bold font-mono-custom text-[#0F2A1A] uppercase tracking-wider block">
                  Alcove Crafted Spaces • Data Protection Officer
                </span>
                <span className="text-[#4E7558] mt-0.5 block">
                  Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi • Email: privacy@alcove-spaces.com
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="mailto:privacy@alcove-spaces.com?subject=Website%20Privacy%20Inquiry%20-%20Alcove"
                  className="px-4 py-2 rounded-xl bg-[#122E1C] hover:bg-[#1E4D2B] text-white font-mono-custom text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C4E894]" />
                  <span>Email DPO</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F7FAF7] text-[#122E1C] border border-[#CFE4D2] font-mono-custom text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
