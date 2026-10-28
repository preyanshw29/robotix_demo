import React from 'react'

export default function AboutSection() {
  const metrics = [
    { value: '1,200+', label: 'OPERATIVES', sub: 'Engineers & pilots', spec: 'SPEC.01' },
    { value: '₹1.5L', label: 'PRIZE PURSE', sub: 'Grants & awards', spec: 'SPEC.02' },
    { value: '48H', label: 'TIME MATRIX', sub: 'Continuous trials', spec: 'SPEC.03' },
    { value: '50+', label: 'INSTITUTES', sub: 'Nationwide delegation', spec: 'SPEC.04' },
  ]

  return (
    <section id="about" className="relative w-full py-20 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] text-[13px] font-mono-nav">
        <span className="text-[#e0e0e0]">01 // ABOUT</span>
        <span className="text-[#646e71]">ROBOTIX.OBSERVATORY</span>
      </div>

      {/* Feature Module Heading & Narrative (Aligned 2-Column Editorial Balance) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline pb-2">
        <div className="md:col-span-7">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#e0e0e0] font-display leading-[1.1] tracking-[-0.02em]">
            Where mechanical rigor converges with autonomous intelligence.
          </h2>
        </div>
        <div className="md:col-span-5 md:pl-4">
          <p className="text-[#828b8d] text-sm sm:text-base leading-[1.5] font-normal">
            Robofest is the annual technical proving ground organized by ROBOTiX Club at National Institute of Technology Raipur under Anantya.
          </p>
        </div>
      </div>

      {/* 4 True Squares with Springy Bulge-out Animation */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="group relative aspect-[4/3] sm:aspect-square rounded-2xl bg-[#16191b] border border-[#252525] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:-translate-y-2 hover:border-[#646e71] hover:shadow-[0_20px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.06)] hover:z-20 cursor-default select-none"
          >
            {/* Top Row: Spec & Status Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2.4px] group-hover:text-[#e0e0e0] transition-colors">
                {m.spec}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#252525] group-hover:bg-[#e0e0e0] group-hover:scale-125 transition-all" />
            </div>

            {/* Center: Monumental Stat Metric */}
            <div className="my-auto text-center">
              <span className="font-display text-4xl sm:text-5xl font-medium text-[#e0e0e0] group-hover:text-white tracking-tight transition-all duration-200 inline-block group-hover:scale-105">
                {m.value}
              </span>
            </div>

            {/* Bottom Row: Label & Subtext */}
            <div className="pt-3 border-t border-[#252525] group-hover:border-[#38383c] transition-colors">
              <div className="text-[11px] font-mono-nav text-[#e0e0e0] font-normal tracking-[1.04px]">
                {m.label}
              </div>
              <div className="text-[11px] text-[#828b8d] mt-0.5 leading-snug">
                {m.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
