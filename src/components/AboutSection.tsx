/**
 * ============================================================================
 * ABOUT SECTION COMPONENT
 * File: src/components/AboutSection.tsx
 * Technology: React 19 + Tailwind CSS + GhostFlameBorder
 * Description:
 *   Editorial overview of Robofest '26 technical proving ground.
 *   Features a balanced 2-column narrative layout paired with 4 geometric
 *   metric square cards featuring springy bulge-out physics and undulating
 *   Ghost Purple flame borders with scattering dust embers.
 * ============================================================================
 */

import React from 'react'
import GhostFlameBorder from './GhostFlameBorder'

export default function AboutSection() {
  const metrics = [
    { value: '1,200+', label: 'OPERATIVES', sub: 'Engineers & pilots', spec: 'SPEC.01' },
    { value: '₹1.5L', label: 'PRIZE PURSE', sub: 'Grants & awards', spec: 'SPEC.02' },
    { value: '48H', label: 'TIME MATRIX', sub: 'Continuous trials', spec: 'SPEC.03' },
    { value: '50+', label: 'INSTITUTES', sub: 'Nationwide delegation', spec: 'SPEC.04' },
  ]

  return (
    <section id="about" className="relative w-full py-20 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header with High-Contrast Ghost Purple Glow */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3b0764]/60 text-[13px] font-mono-nav">
        <span className="text-[#fae8ff] drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">01 // ABOUT</span>
        <span className="text-[#c084fc]">ROBOTIX.OBSERVATORY</span>
      </div>

      {/* Feature Module Heading & Narrative (Aligned 2-Column Editorial Balance) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline pb-2">
        <div className="md:col-span-7">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#fae8ff] font-display leading-[1.1] tracking-[-0.02em] drop-shadow-[0_0_20px_rgba(192,38,211,0.25)]">
            Where mechanical rigor converges with autonomous intelligence.
          </h2>
        </div>
        <div className="md:col-span-5 md:pl-4">
          <p className="text-[#a89cb8] text-sm sm:text-base leading-[1.5] font-normal">
            Robofest is the annual technical proving ground organized by ROBOTiX Club at National Institute of Technology Raipur under Anantya.
          </p>
        </div>
      </div>

      {/* 4 True Squares with Springy Bulge-out Animation & Animated Licking Flames with Scattering Dust Embers */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <GhostFlameBorder key={m.label} radius={16} intensity="high" showEmbers={true}>
            <div
              className="group relative aspect-[4/3] sm:aspect-square rounded-2xl bg-gradient-to-b from-[#180e28] via-[#10081c] to-[#07040d] border border-[#a855f7]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:-translate-y-2 hover:border-[#e879f9] hover:shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_30px_rgba(232,121,249,0.35),inset_0_0_20px_rgba(192,38,211,0.25)] hover:z-20 cursor-default select-none overflow-hidden"
            >
              {/* Ethereal degrading flame glow behind card */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,70,239,0.2)_0%,rgba(112,26,117,0.08)_50%,transparent_80%)] opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top Row: Spec & Status Indicator */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono-nav text-[#c084fc] uppercase tracking-[2.4px] group-hover:text-[#fae8ff] transition-colors">
                  {m.spec}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#701a75] group-hover:bg-[#e879f9] group-hover:shadow-[0_0_10px_#e879f9] group-hover:scale-125 transition-all" />
              </div>

              {/* Center: Monumental Stat Metric with Vivid Ghost Purple Gradient Glow */}
              <div className="my-auto text-center relative z-10">
                <span className="font-display text-4xl sm:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fae8ff] to-[#e879f9] tracking-tight transition-all duration-200 inline-block group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(232,121,249,0.6)]">
                  {m.value}
                </span>
              </div>

              {/* Bottom Row: Label & Subtext */}
              <div className="pt-3 border-t border-[#3b0764]/60 group-hover:border-[#c026d3]/60 transition-colors relative z-10">
                <div className="text-[11px] font-mono-nav text-[#f5d0fe] font-normal tracking-[1.04px] group-hover:text-white transition-colors">
                  {m.label}
                </div>
                <div className="text-[11px] text-[#a89cb8] mt-0.5 leading-snug">
                  {m.sub}
                </div>
              </div>
            </div>
          </GhostFlameBorder>
        ))}
      </div>
    </section>
  )
}
