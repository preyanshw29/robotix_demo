import React from 'react'

export default function AboutSection() {
  const metrics = [
    { value: '1,200+', label: 'OPERATIVES', sub: 'Engineers & pilots' },
    { value: '₹1.5L', label: 'PRIZE PURSE', sub: 'Grants & commendations' },
    { value: '48H', label: 'TIME MATRIX', sub: 'Continuous trials' },
    { value: '50+', label: 'INSTITUTES', sub: 'Nationwide delegation' },
  ]

  return (
    <section id="about" className="relative w-full py-14 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] text-[13px] font-mono-nav">
        <span className="text-[#e0e0e0]">01 // ABOUT</span>
        <span className="text-[#646e71]">ROBOTIX.OBSERVATORY</span>
      </div>

      {/* Feature Module Heading */}
      <div className="mt-8">
        <h2 className="text-2xl sm:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
          Where mechanical rigor converges with autonomous intelligence.
        </h2>
        <p className="mt-3 text-[#828b8d] text-base leading-[1.4] max-w-[620px]">
          Robofest is the annual technical proving ground organized by ROBOTiX Club at National Institute of Technology Raipur under Anantya.
        </p>
      </div>

      {/* 4 Compact Telemetry Cards in Machine Wells */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <div
            key={m.label}
            className="p-5 rounded-2xl bg-[#16191b] border border-[#252525] flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2.4px]">
              SPEC.0{idx + 1}
            </span>
            <div className="my-4 font-mono-nav text-2xl sm:text-3xl font-medium text-[#e0e0e0]">
              {m.value}
            </div>
            <div className="pt-2 border-t border-[#252525]">
              <div className="text-[11px] font-mono-nav text-[#e0e0e0]">{m.label}</div>
              <div className="text-[11px] text-[#828b8d]">{m.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
