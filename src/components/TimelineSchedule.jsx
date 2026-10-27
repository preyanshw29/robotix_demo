import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Zap, Shield, Sparkles } from 'lucide-react'

export default function TimelineSchedule({ playBeep }) {
  const [activeDay, setActiveDay] = useState(1)

  const daysData = {
    1: {
      date: 'DAY 01 // MARCH 20, 2026',
      title: 'Scrutineering, Time Trials & Simulation Kickoff',
      events: [
        {
          time: '08:30 - 10:00',
          title: 'Bot Safety Scrutineering & RF Verification',
          venue: 'Technical Scrutiny Bay',
          desc: 'Mandatory fail-safe cut-off inspection, LiPo containment verification, and radio frequency locking.',
          status: 'MANDATORY',
        },
        {
          time: '10:00 - 10:45',
          title: 'Opening Ceremony & Keynote Address',
          venue: 'Main Institute Auditorium',
          desc: 'Inaugural address by NIT Raipur Director, Patron, and Chief Guest from Robotics Industry.',
          status: 'KEYNOTE',
        },
        {
          time: '11:00 - ONWARD',
          title: 'Robothon: 24-Hour Simulation Matrix Begins',
          venue: 'Central Computing Lab',
          desc: 'Problem statements unlocked in ROS 2 & Gazebo. 24 hours of non-stop algorithmic development.',
          status: 'HACKATHON',
        },
        {
          time: '11:30 - 15:30',
          title: 'RoboRace: Apex Circuit Qualifying Heats',
          venue: 'Arena Track 01',
          desc: 'Single-car obstacle time trials across elevated ramps, gravel pits, and sharp chicanes.',
          status: 'LIVE ARENA',
        },
        {
          time: '16:00 - 19:00',
          title: 'NeuroBotix: BCI & Gesture Benchmarks',
          venue: 'Advanced Mechatronics Lab',
          desc: 'Brain-computer interface and vision hand-gesture pick-and-place precision trials.',
          status: 'LAB CONTEST',
        },
      ],
    },
    2: {
      date: 'DAY 02 // MARCH 21, 2026',
      title: 'Combat Knockouts, Aerial Drones & Code Sprints',
      events: [
        {
          time: '10:00 - 11:00',
          title: 'Robothon Simulation Code Freeze & Demos',
          venue: 'Computing Center & Virtual Arena',
          desc: '24-hour mark reached. Live simulated obstacle traversal and code defense before faculty jury.',
          status: 'EVALUATION',
        },
        {
          time: '11:00 - 14:00',
          title: 'RoboWar: Titan Clash — Round of 16 & Quarterfinals',
          venue: 'Bulletproof Steel Arena',
          desc: 'Featherweight and Middleweight combat bots engage in 3-minute destructive matches.',
          status: 'LIVE ARENA',
        },
        {
          time: '14:30 - 17:00',
          title: 'AeroVision: Autonomous AI Drone Grand Prix',
          venue: 'Flight Test Enclosure',
          desc: 'Fully autonomous computer vision navigation through illuminated neon gate circuits.',
          status: 'AUTONOMOUS',
        },
        {
          time: '15:00 - 18:30',
          title: 'Vibe Coding: Embedded Hardware Sprint',
          venue: 'Embedded Systems Wing',
          desc: 'Bare-metal C/C++ firmware debugging on ESP32 & STM32 microcontrollers under tight time locks.',
          status: 'SPRINT',
        },
        {
          time: '19:00 - 21:00',
          title: 'Cybernetic Salvage: Night Rescue Mission',
          venue: 'Subterranean Workshop Maze',
          desc: 'Zero-visibility search-and-rescue rover run guided exclusively by LiDAR and thermal telemetry.',
          status: 'NIGHT RUN',
        },
      ],
    },
    3: {
      date: 'DAY 03 // MARCH 22, 2026',
      title: 'Legged Agility, RoboWar Championship & Awards',
      events: [
        {
          time: '10:00 - 12:30',
          title: 'RoboSoccer: Knockouts & Bronze Match',
          venue: 'Turf Stadium Complex',
          desc: 'Tactical mechanical bots compete in high-stakes robotic football semifinals.',
          status: 'LIVE ARENA',
        },
        {
          time: '13:00 - 15:30',
          title: 'Mecha Gauntlet: Quadruped & Bipedal Agility Trial',
          venue: 'Central Quadrangle Course',
          desc: 'Legged robot dogs and bipedal walkers conquer gravel beds, balance beams, and stairs.',
          status: 'KINEMATICS',
        },
        {
          time: '16:00 - 18:00',
          title: 'RoboWar: Grand Championship Final',
          venue: 'Bulletproof Steel Arena',
          desc: 'The grand finale. Surviving combat bots duel for the coveted Robofest 2026 Titan Trophy.',
          status: 'CHAMPIONSHIP',
        },
        {
          time: '18:30 - 20:30',
          title: 'Valedictory & ₹1,50,000+ Prize Ceremony',
          venue: 'Main Auditorium',
          desc: 'Award distributions, official commendations by ROBOTiX Club, and networking dinner.',
          status: 'VALEDICTORY',
        },
      ],
    },
  }

  const currentSchedule = daysData[activeDay]

  return (
    <section id="schedule" className="relative w-full py-20 px-4 sm:px-6 max-w-[940px] mx-auto scroll-mt-24">
      
      {/* Process Step Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-[#252525]">
        <div className="flex items-center justify-between text-[13px] font-mono-tech">
          <div className="flex items-center gap-2 text-[#e0e0e0]">
            <span className="text-[#00e5ff]">[04]</span>
            <span className="tracking-[1.04px]">CHRONICLE & SCHEDULE MATRIX</span>
          </div>
          <span className="text-[#646e71] uppercase tracking-[1.04px]">
            TIMELINE // 3-DAY PROTOCOL
          </span>
        </div>
      </div>

      {/* Module Heading */}
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
            Precision itinerary across three intense days.
          </h2>
          <p className="mt-3 text-[#828b8d] text-base leading-[1.4] max-w-[640px]">
            Synchronized timeline of scrutineering, combat arena heats, code freezes, and championship matches.
          </p>
        </div>

        {/* Day Select Pills */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((dayNum) => (
            <button
              key={dayNum}
              onClick={() => {
                playBeep?.(850, 0.04)
                setActiveDay(dayNum)
              }}
              className={`h-[38px] px-4 rounded-[100px] text-[13px] font-mono-tech tracking-[1.04px] flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDay === dayNum
                  ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#444444]'
                  : 'bg-transparent text-[#646e71] hover:text-[#e0e0e0] hover:bg-[#1f1f23]/40'
              }`}
            >
              <span>DAY 0{dayNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Container */}
      <div className="mt-10 rounded-2xl border border-[#252525] bg-[#16191b] p-6 sm:p-8">
        <div className="pb-4 border-b border-[#252525] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono-tech text-[#00e5ff]">
            {currentSchedule.date}
          </span>
          <span className="text-sm font-medium text-[#e0e0e0]">
            {currentSchedule.title}
          </span>
        </div>

        <div className="mt-6 flex flex-col divide-y divide-[#252525]">
          {currentSchedule.events.map((evt, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
              <div className="sm:w-[140px] shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#e0e0e0]">
                  <Clock className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#646e71] mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{evt.venue}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#e0e0e0] group-hover:text-white transition-colors">
                    {evt.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-[100px] bg-[#1f1f23] border border-[#252525] text-[9px] font-mono-tech text-[#00e5ff]">
                    {evt.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#828b8d] leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
