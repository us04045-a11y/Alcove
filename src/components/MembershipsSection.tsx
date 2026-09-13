import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, ArrowRight, ShieldCheck, Clock, Users, KeyRound } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/alcoveData';
import { MembershipPlan } from '../types';

interface MembershipsSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="memberships" className="py-24 sm:py-32 bg-[#080D09] text-[#F2F5F0] relative border-t border-[#182619]">
      {/* Subtle Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#C4E894]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#182619]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121C13] border border-[#1F3120] text-xs font-mono-custom text-[#C4E894] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              MEMBERSHIP TIERS & PRIVATE STUDIOS
            </div>
            <h2 className="font-cinzel font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              WORKSPACE RESIDENCIES
            </h2>
            <p className="text-base text-[#8EAC80] font-light leading-relaxed">
              Transparent, all-inclusive memberships tailored for high-focus independent operators, founders, and growing enterprise teams.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-custom text-[#8EAC80] bg-[#0E1710] px-4 py-2.5 rounded-2xl border border-[#182619]">
            <Zap className="w-4 h-4 text-[#C4E894]" />
            <span>Multi-campus access included in Geneva, Paris & Zurich</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all ${
                plan.popular
                  ? 'bg-[#0E1810] border-[#C4E894] shadow-2xl shadow-[#C4E894]/10 ring-1 ring-[#C4E894]/30'
                  : 'bg-[#0A110B] border-[#182619] hover:border-[#223524]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C4E894] text-[#090F0A] text-[10px] font-mono-custom uppercase font-bold tracking-widest shadow-md shadow-[#C4E894]/20">
                  Most Popular Residency
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="font-cinzel font-black text-2xl text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-mono-custom text-[#8EAC80] mt-1">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pb-6 border-b border-[#182619]">
                  <span className="font-cinzel font-black text-4xl sm:text-5xl text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono-custom text-[#8EAC80]">
                    {plan.period}
                  </span>
                </div>

                {/* Ideal For */}
                <div className="p-3.5 rounded-xl bg-[#080D09] border border-[#142216] text-xs font-mono-custom text-[#A2BCA0]">
                  <strong className="text-[#C4E894] block uppercase text-[10px] mb-1 font-semibold">
                    Target Profile
                  </strong>
                  {plan.idealFor}
                </div>

                {/* Feature List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono-custom text-[#7A9672] uppercase font-semibold block">
                    Residency Inclusions
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#D0DEC8] font-light">
                      <div className="w-4 h-4 rounded-full bg-[#C4E894]/15 text-[#C4E894] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Specs Footer */}
              <div className="pt-8 mt-6 border-t border-[#182619] space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-custom text-[#7A9672] pb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C4E894]" />
                    <span className="truncate">{plan.specs.access}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C4E894]" />
                    <span className="truncate">{plan.specs.guests}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#C4E894] hover:bg-[#D4F3AA] text-[#090F0A] shadow-xl shadow-[#C4E894]/20'
                      : 'bg-[#121C13] hover:bg-[#182619] text-[#E2ECE0] border border-[#223524] hover:border-[#C4E894]'
                  }`}
                >
                  <span>Apply for Residency</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
