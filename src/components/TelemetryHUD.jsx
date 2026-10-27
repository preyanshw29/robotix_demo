import React, { useState } from 'react'
import { Terminal, Shield, Award, Users, Cpu, Radio, ChevronRight } from 'lucide-react'

export default function TelemetryHUD({ playBeep }) {
  const [activeTab, setActiveTab] = useState('legacy')

  const stats = [
    { label: 'CUMULATIVE PRIZE POOL', value: '₹1,50,000+', detail: 'Cash grants & industry sponsorship' },
    { label: 'BOT PILOTS & RESEARCHERS', value: '1,200+', detail: 'Undergraduates, hackers & makers' },
    { label: 'CONTINUOUS SPRINT DURATION', value: '48 HOURS', detail: 'Combat heats & simulation matrix' },
    { label: 'REPRESENTED INSTITUTIONS', value: '50+ COLLEGES', detail: 'IITs, NITs, IIITs & premier colleges' },
  ]

  const pillars = {
    legacy: {
      tag: 'ORIGIN & HERITAGE',
      title: 'Born in the heart of Central India’s premier technical institute.',
      text: 'Robofest stands as the annual flagship robotics congregation organized by the ROBOTiX Club of National Institute of Technology (NIT) Raipur. Conducted under Anantya—NIT Raipur’s premier techno-entrepreneurial summit—Robofest has evolved from local microcontroller showcases into a nationally recognized stage for high-voltage combat and autonomous engineering.',
      bullets: [
        'Organized entirely by student engineers and researchers from ROBOTiX Club.',
        'Mentored by NIT Raipur faculty and domain specialists in robotics and mechatronics.',
        'Endorsed by national technical bodies, alumni mentors, and robotics industries.',
      ],
    },
    arena: {
      tag: 'BATTLESPACE & HARDWARE',
      title: 'Engineered for extreme durability, RF scrutiny, and safety.',
      text: 'The physical combat grounds feature an armored 8mm polycarbonate and steel mesh containment cell rated for high-RPM kinetic spinners and pneumatic combat bots up to 60kg. Meanwhile, our autonomous indoor aerial courses feature optical laser gates and simulated subterranean obstacle runs.',
      bullets: [
        'Standardized 2.4GHz fail-safe RF frequency spectrum monitoring.',
        'Certified pneumatic pressure & battery containment safety checks.',
        'Precision optical sensor scoring with millimeter laser beam gates.',
      ],
    },
    research: {
      tag: 'SIMULATION & AUTONOMY',
      title: 'Tackling the frontier of GPS-denied and swarm robotics.',
      text: 'Through the flagship 24-hour Robothon sprint, Robofest pioneers problems beyond traditional hardware kits. Participants tackle real-world defense and industrial hurdles using ROS 2, Gazebo, and Isaac Sim—from subterranean search-and-rescue to autonomous drone swarm formation in GPS-denied environments.',
      bullets: [
        'ROS 2 / Gazebo multi-agent simulation environments.',
        'Real-world problem statements derived from aerospace and industrial robotics.',
        'Mentorship sprints with computational robotics researchers.',
      ],
    },
  }

  return (
    <section id="about" className="relative w-full py-16 px-4 sm:px-6 max-w-[940px] mx-auto scroll-mt-24">
      
      {/* Process Step Header (Strict AWE Component Rule) */}
      <div className="flex flex-col gap-2 pb-4 border-b border-[#252525]">
        <div className="flex items-center justify-between text-[13px] font-mono-tech">
          <div className="flex items-center gap-2 text-[#e0e0e0]">
            <span className="text-[#00e5ff]">[01]</span>
            <span className="tracking-[1.04px]">ABOUT ROBOFEST</span>
          </div>
          <span className="text-[#646e71] uppercase tracking-[1.04px]">
            SYS_DOC // NITRR.ROBOTIX
          </span>
        </div>
      </div>

      {/* Feature Module Heading */}
      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
          Where mechanical rigor converges with autonomous software intelligence.
        </h2>
        <p className="mt-4 text-[#828b8d] text-base leading-[1.4] max-w-[800px]">
          Robofest is more than a robotics tournament; it is a live laboratory where students build, stress-test, and deploy machines designed to dominate arenas and solve complex simulation challenges.
        </p>
      </div>

      {/* 4-Column Instrument Telemetry Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-[#16191b] border border-[#252525] flex flex-col justify-between group hover:border-[#444444] transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono-tech text-[#646e71] tracking-[2.4px] uppercase">
                METRIC.0{i + 1}
              </div>
              <div className="mt-3 font-mono-tech text-2xl font-semibold text-[#e0e0e0] tracking-tight group-hover:text-[#00e5ff] transition-colors">
                {stat.value}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#252525]">
              <div className="text-[11px] font-mono-tech text-[#e0e0e0] font-medium uppercase">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#828b8d] mt-0.5 leading-snug">
                {stat.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Pillar Tabs */}
      <div className="mt-12 rounded-2xl border border-[#252525] bg-[#16191b] p-6 sm:p-8">
        
        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#252525]">
          {[
            { id: 'legacy', label: 'THE LEGACY', counter: '01' },
            { id: 'arena', label: 'ARENA SPECIFICATIONS', counter: '02' },
            { id: 'research', label: 'AUTONOMY & SIMULATION', counter: '03' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playBeep?.(800, 0.04)
                setActiveTab(tab.id)
              }}
              className={`px-4 py-2 rounded-[100px] text-[13px] font-mono-tech tracking-[1.04px] flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#444444]'
                  : 'text-[#646e71] hover:text-[#e0e0e0] hover:bg-[#1f1f23]/50'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[11px] text-[#646e71]">({tab.counter})</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="flex-1">
            <span className="text-[10px] font-mono-tech text-[#00e5ff] tracking-[2.4px] uppercase font-semibold">
              {pillars[activeTab].tag}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-[#e0e0e0] leading-snug">
              {pillars[activeTab].title}
            </h3>
            <p className="mt-3 text-sm text-[#828b8d] leading-relaxed">
              {pillars[activeTab].text}
            </p>
          </div>

          <div className="md:w-[320px] bg-[#010101] p-5 rounded-xl border border-[#252525]">
            <span className="text-[10px] font-mono-tech text-[#646e71] uppercase tracking-wider block mb-3">
              STANDARDS & RIGOR
            </span>
            <ul className="flex flex-col gap-2.5">
              {pillars[activeTab].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#e0e0e0]">
                  <ChevronRight className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
