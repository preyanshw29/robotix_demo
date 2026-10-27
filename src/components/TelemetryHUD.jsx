import React, { useState } from 'react'
import { Terminal, Shield, Award, Users, Cpu, Radio, ChevronRight, Activity, Zap } from 'lucide-react'

export default function TelemetryHUD({ playBeep }) {
  const [activeTab, setActiveTab] = useState('legacy')

  const stats = [
    { label: 'TOTAL PRIZE POOL', value: '₹1,50,000+', detail: 'Cash grants & unstop prizes' },
    { label: 'ROBOT PILOTS & RESEARCHERS', value: '1,200+', detail: 'Makers, coders & bot builders' },
    { label: 'CONTINUOUS SPRINT MATRIX', value: '48 HOURS', detail: 'Combat heats & 24h simulation' },
    { label: 'PREMIER COLLEGES', value: '50+ INSTITUTES', detail: 'IITs, NITs, IIITs nationwide' },
  ]

  const pillars = {
    legacy: {
      tag: 'HERITAGE // NIT RAIPUR',
      title: 'Forged in Central India’s premier institute of technology.',
      text: 'Robofest is the flagship annual robotics celebration organized by the student-led ROBOTiX Club of National Institute of Technology (NIT) Raipur. Conducted under Anantya—NIT Raipur’s annual techno-entrepreneurial confluence—Robofest brings together hardware engineers, coders, and bot pilots from across India to challenge the boundaries of autonomous systems and combat robotics.',
      bullets: [
        'Organized and engineered entirely by student innovators from ROBOTiX Club.',
        'Mentored by NIT Raipur faculty and domain researchers in mechatronics.',
        'Supported by leading robotics industries, alumni founders, and tech platforms.',
      ],
    },
    arena: {
      tag: 'BATTLESPACE RIGOR',
      title: 'Engineered for extreme kinetic combat, RF scrutiny & safety.',
      text: 'The physical combat grounds feature an armored 8mm polycarbonate and steel containment cell rated for high-RPM kinetic spinners and pneumatic combat bots up to 60kg. Meanwhile, our autonomous indoor aerial courses feature optical laser gates and simulated subterranean obstacle runs.',
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
    <section id="about" className="relative w-full py-20 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
          <Activity className="w-3.5 h-3.5" />
          <span>ABOUT ROBOFEST // ROBOTiX CLUB</span>
        </div>
        <span className="text-xs font-mono-tech text-gray-400">
          ANANTYA '26 PROTOCOL
        </span>
      </div>

      {/* Module Heading */}
      <div className="mt-8">
        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white text-glow-cyan leading-tight">
          WHERE RIGOR CONVERGES WITH AUTONOMY.
        </h2>
        <p className="mt-4 text-gray-300 text-sm sm:text-base font-exo max-w-[800px] leading-relaxed">
          Robofest is the epic center-stage where mechanical engineering, firmware optimization, and algorithmic intelligence collide to solve complex challenges.
        </p>
      </div>

      {/* 4-Column Stat Cards with Neon Glow */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-[#0a0f1e]/80 border border-cyan-500/25 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-400 transition-all hover:-translate-y-1 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.2)]"
          >
            <div>
              <div className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest">
                METRIC.0{i + 1}
              </div>
              <div className="mt-3 font-orbitron text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-cyan-500/15">
              <div className="text-xs font-orbitron text-gray-200 uppercase font-semibold">
                {stat.label}
              </div>
              <div className="text-xs font-exo text-gray-400 mt-1 leading-snug">
                {stat.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Pillar Tabs */}
      <div className="mt-12 rounded-3xl border border-cyan-500/30 bg-[#0a0f1e]/85 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(0,212,255,0.12)]">
        
        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-cyan-500/20">
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
              className={`px-5 py-2 rounded-full text-xs font-orbitron tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070b17] font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'bg-[#070b17] border border-cyan-500/20 text-gray-400 hover:text-cyan-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={activeTab === tab.id ? 'text-[#070b17]/80 text-[10px]' : 'text-cyan-400 text-[10px]'}>
                ({tab.counter})
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="flex-1">
            <span className="text-xs font-orbitron text-cyan-400 tracking-[0.2em] uppercase font-bold">
              {pillars[activeTab].tag}
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-orbitron font-bold text-white leading-snug">
              {pillars[activeTab].title}
            </h3>
            <p className="mt-3 text-sm text-gray-300 font-exo leading-relaxed">
              {pillars[activeTab].text}
            </p>
          </div>

          <div className="md:w-[340px] bg-[#070b17] p-5 rounded-2xl border border-cyan-500/20">
            <span className="text-[10px] font-orbitron text-cyan-400 uppercase tracking-widest block mb-3">
              STANDARDS & RIGOR
            </span>
            <ul className="flex flex-col gap-3">
              {pillars[activeTab].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-exo">
                  <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
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
