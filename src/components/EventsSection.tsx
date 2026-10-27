import React, { useState } from 'react'
import { ArrowUpRight, Radio, Compass, Cpu, Eye, Shield, Target } from 'lucide-react'

export const CONTESTS = [
  {
    id: 'aerovision',
    tag: 'AERIAL EDGE AI',
    title: 'AeroVision',
    role: 'Autonomous AI Drone Grand Prix',
    summary: 'Zero human pilots. Micro-drones with on-board edge AI navigate high-speed neon optical gate circuits autonomously.',
    telemetry: [
      { label: 'COMPUTE', val: 'Jetson Nano / RPi 5' },
      { label: 'PAYLOAD', val: 'Max 800g flight mass' },
      { label: 'CONTROL', val: '100% Computer Vision' },
      { label: 'PURSE', val: '₹30,000' },
    ],
    radarLabel: 'OPTICAL RING SEQUENCING',
    scanPoints: [
      { x: '25%', y: '30%', label: 'GATE_01' },
      { x: '70%', y: '25%', label: 'GATE_02' },
      { x: '60%', y: '75%', label: 'GATE_03' },
      { x: '30%', y: '65%', label: 'LANDING_PAD' },
    ],
  },
  {
    id: 'mechagauntlet',
    tag: 'KINEMATICS & LEGGED BOTS',
    title: 'Mecha Gauntlet',
    role: 'Quadruped & Bipedal Agility Trial',
    summary: 'Inspired by Boston Dynamics. Legged robots conquer stairs, balance beams, gravel pits, and dynamic side-impact recovery.',
    telemetry: [
      { label: 'KINEMATICS', val: 'Compliant Quadruped / Biped' },
      { label: 'TERRAIN', val: 'Multi-Surface Course' },
      { label: 'BONUS', val: '1.5x Autonomous Gait' },
      { label: 'PURSE', val: '₹35,000' },
    ],
    radarLabel: 'BALANCE & STABILITY GAUNTLET',
    scanPoints: [
      { x: '20%', y: '40%', label: 'INCLINE_RAMP' },
      { x: '50%', y: '30%', label: 'GRAVEL_BED' },
      { x: '75%', y: '60%', label: 'STAIR_RISERS' },
      { x: '40%', y: '80%', label: 'BALANCE_BEAM' },
    ],
  },
  {
    id: 'neurobotix',
    tag: 'HUMAN-ROBOT INTERACTION',
    title: 'NeuroBotix',
    role: 'Mind-Controlled & Gesture Tele-Op',
    summary: 'Control precision robotic arms and rovers using EEG brainwave headsets and camera hand gestures. Zero gamepads allowed.',
    telemetry: [
      { label: 'INTERFACE', val: 'OpenBCI EEG / Gesture' },
      { label: 'MECHANISM', val: '6-DOF Tabletop Arm' },
      { label: 'CRITERIA', val: 'Latency & Steady Placement' },
      { label: 'PURSE', val: '₹25,000' },
    ],
    radarLabel: 'NEURAL CONCENTRATION THRESHOLD',
    scanPoints: [
      { x: '35%', y: '25%', label: 'ALPHA_BAND' },
      { x: '65%', y: '35%', label: 'BETA_STABILITY' },
      { x: '50%', y: '65%', label: 'PEG_ASSEMBLY' },
      { x: '25%', y: '75%', label: 'SORTING_TRAY' },
    ],
  },
  {
    id: 'cyberneticsalvage',
    tag: 'SEARCH & RESCUE SLAM',
    title: 'Cyber Salvage',
    role: 'Disaster Subterranean SLAM',
    summary: 'Search-and-rescue rover deployed in a dark, zero-visibility labyrinth guided solely by 2D/3D LiDAR and thermal telemetry feeds.',
    telemetry: [
      { label: 'SENSORS', val: 'LiDAR + FLIR Thermal' },
      { label: 'MAZE', val: 'Zero-Visibility Smoked Bay' },
      { label: 'OBJECTIVE', val: 'Occupancy Grid + Recovery' },
      { label: 'PURSE', val: '₹30,000' },
    ],
    radarLabel: 'LIDAR OCCUPANCY GRID MAPPING',
    scanPoints: [
      { x: '30%', y: '20%', label: 'SECTOR_A_HAZARD' },
      { x: '75%', y: '40%', label: 'THERMAL_BEACON' },
      { x: '45%', y: '70%', label: 'COLLAPSED_ARCH' },
      { x: '20%', y: '60%', label: 'EXTRACTION_ZONE' },
    ],
  },
]

export default function EventsSection({ onRegisterClick, playBeep }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = CONTESTS[activeIdx]

  return (
    <section id="contests" className="relative w-full py-14 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] text-[13px] font-mono-nav">
        <span className="text-[#e0e0e0]">02 // CONTESTS</span>
        <span className="text-[#646e71]">04 ACTIVE PROTOCOLS</span>
      </div>

      {/* Feature Module Heading */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
            Engineered gauntlets.
          </h2>
          <p className="mt-2 text-[#828b8d] text-base leading-[1.4] max-w-[500px]">
            Autonomous vision drones, legged kinematics, BCI neuro-controls, and subterranean LiDAR rescue.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-1.5">
          {CONTESTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                playBeep?.(850, 0.04)
                setActiveIdx(idx)
              }}
              className={`h-[34px] px-3.5 rounded-[100px] text-[12px] font-mono-nav tracking-[1.04px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeIdx === idx
                  ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#444444]'
                  : 'bg-transparent text-[#646e71] hover:text-[#e0e0e0]'
              }`}
            >
              <span>0{idx + 1}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contained Media Well (16px radius, #16191b well, 1px #252525 hairline border) */}
      <div className="mt-8 rounded-2xl bg-[#16191b] border border-[#252525] p-6 sm:p-8">
        
        {/* Top Tag & Title */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
          <div>
            <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2.4px]">
              {current.tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#e0e0e0] mt-0.5">
              {current.title} — <span className="font-normal text-[#828b8d]">{current.role}</span>
            </h3>
          </div>

          <button
            onClick={() => {
              playBeep?.(1000, 0.06)
              onRegisterClick(current.title)
            }}
            className="h-[36px] px-4 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] border border-[#252525] text-[#e0e0e0] text-[12px] font-mono-nav tracking-[1.04px] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3 h-3 text-[#646e71]" />
          </button>
        </div>

        {/* Short Summary */}
        <p className="mt-5 text-[#828b8d] text-sm sm:text-base leading-[1.4] max-w-[680px]">
          {current.summary}
        </p>

        {/* Interactive Radar Telemetry Canvas Mockup */}
        <div className="mt-6 relative h-[220px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Grid crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-[#252525]" />
            <div className="h-full w-px bg-[#252525] absolute" />
            <div className="w-48 h-48 rounded-full border border-[#252525]/60 absolute" />
            <div className="w-24 h-24 rounded-full border border-[#252525]/40 absolute" />
          </div>

          {/* Interactive waypoint nodes */}
          {current.scanPoints.map((pt, i) => (
            <div
              key={i}
              style={{ left: pt.x, top: pt.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#e0e0e0] group-hover:scale-150 transition-transform" />
              <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors">
                {pt.label}
              </span>
            </div>
          ))}

          {/* Radar Overlay Label */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono-nav text-[#646e71]">
            RADAR MATRIX // {current.radarLabel}
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono-nav text-[#646e71]">
            INTERACTIVE SCHEMATIC
          </div>
        </div>

        {/* 4-Item Telemetry Matrix */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#252525]">
          {current.telemetry.map((t) => (
            <div key={t.label}>
              <div className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-wider">
                {t.label}
              </div>
              <div className="text-xs sm:text-sm font-mono-nav text-[#e0e0e0] mt-0.5">
                {t.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
