import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Zap, Shield, Sparkles } from 'lucide-react'

export default function TimelineSchedule({ playBeep }) {
  const [activeDay, setActiveDay] = useState(1)

  const daysData = {
    1: {
      date: 'DAY 01 // 22 MARCH 2026',
      title: 'Scrutineering, Time Trials & Robothon Kickoff',
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
          time: '10:00 - 14:00',
          title: 'Vibe Coding: Embedded Hardware Sprint',
          venue: 'Embedded Systems Lab',
          desc: 'Arduino, ESP32, and Verilog programming competition solving real-time robotics logic.',
          status: 'LIVE CODE',
        },
        {
          time: '10:00 - ONWARD',
          title: 'Robothon: 24-Hour Simulation Matrix Begins',
          venue: 'Central Computing Lab',
          desc: 'Problem statements unlocked in ROS 2 & Gazebo. 24 hours of non-stop algorithmic development.',
          status: '24H HACKATHON',
        },
        {
          time: '14:00 - 18:00',
          title: 'RoboWar: Titan Clash — Preliminary Knockouts',
          venue: 'Bulletproof Steel Arena',
          desc: 'Combat bots enter the arena for high-voltage destructive duel rounds.',
          status: 'ARENA COMBAT',
        },
        {
          time: '14:30 - 17:30',
          title: 'RoboQuiz: Preliminary Written & Buzzer Heats',
          venue: 'Auditorium Hall 02',
          desc: 'Robotics-themed competitive quiz testing automation, electronics, and kinematics.',
          status: 'QUIZ',
        },
      ],
    },
    2: {
      date: 'DAY 02 // 23 MARCH 2026',
      title: 'RoboRace, Robothon Code Freeze & Championship Finals',
      events: [
        {
          time: '10:00 - 11:00',
          title: 'Robothon Simulation Code Freeze & Jury Demos',
          venue: 'Computing Center & Virtual Arena',
          desc: '24-hour mark reached. Live simulated obstacle traversal and code defense before faculty jury.',
          status: 'EVALUATION',
        },
        {
          time: '10:00 - 14:00',
          title: 'RoboRace: Speed Unleashed Grand Circuit',
          venue: 'Arena Track 01',
          desc: 'High-speed obstacle time-trial across elevated ramps, grease pits, and hairpin chicanes.',
          status: 'RACE TRACK',
        },
        {
          time: '11:00 - 15:00',
          title: 'AeroVision: Autonomous AI Drone Grand Prix',
          venue: 'Flight Test Enclosure',
          desc: 'Fully autonomous computer vision navigation through illuminated neon gate circuits.',
          status: 'AUTONOMOUS',
        },
        {
          time: '14:00 - 16:30',
          title: 'RoboSoccer: Semifinals & Bronze Match',
          venue: 'Turf Stadium Complex',
          desc: 'Tactical mechanical bots compete in high-stakes robotic football semifinals.',
          status: 'SPORTS ARENA',
        },
        {
          time: '16:30 - 18:30',
          title: 'RoboWar: Grand Championship Final',
          venue: 'Bulletproof Steel Arena',
          desc: 'The grand finale. Surviving combat bots duel for the coveted Robofest 2026 Titan Trophy.',
          status: 'CHAMPIONSHIP',
        },
        {
          time: '19:00 - 20:30',
          title: 'Valedictory & Prize Distribution Ceremony',
          venue: 'Main Auditorium',
          desc: 'Official award ceremony, distribution of ₹1,50,000+ prize purse, and closing remarks.',
          status: 'VALEDICTORY',
        },
      ],
    },
  }

  const currentSchedule = daysData[activeDay] || daysData[1]

  return (
    <section id="schedule" className="relative w-full py-20 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>SCHEDULE MATRIX // ROBOFEST '26</span>
        </div>
        <span className="text-xs font-mono-tech text-gray-400">
          NIT RAIPUR CAMPUS
        </span>
      </div>

      {/* Module Title */}
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white text-glow-cyan">
            CHRONICLE ITINERARY
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base font-exo max-w-[640px]">
            Synchronized schedule across two intense days of combat arena heats, code freezes, and championship finals.
          </p>
        </div>

        {/* Day Select Pills */}
        <div className="flex items-center gap-2">
          {[1, 2].map((dayNum) => (
            <button
              key={dayNum}
              onClick={() => {
                playBeep?.(850, 0.04)
                setActiveDay(dayNum)
              }}
              className={`h-[40px] px-6 rounded-full text-xs font-orbitron tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDay === dayNum
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070b17] font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'bg-[#0a0f1e] border border-cyan-500/20 text-gray-400 hover:text-cyan-300'
              }`}
            >
              <span>DAY 0{dayNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Container */}
      <div className="mt-10 rounded-3xl border border-cyan-500/30 bg-[#0a0f1e]/85 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(0,212,255,0.12)]">
        <div className="pb-4 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-orbitron text-cyan-400 font-bold">
            {currentSchedule.date}
          </span>
          <span className="text-sm font-semibold text-white font-exo">
            {currentSchedule.title}
          </span>
        </div>

        <div className="mt-6 flex flex-col divide-y divide-cyan-500/15">
          {currentSchedule.events.map((evt, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
              <div className="sm:w-[160px] shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-orbitron text-white">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-exo text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 text-cyan-400/80" />
                  <span>{evt.venue}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-orbitron">
                    {evt.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-orbitron text-cyan-300">
                    {evt.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-300 leading-relaxed font-exo">
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
