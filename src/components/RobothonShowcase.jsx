import React, { useState } from 'react'
import { Terminal, Clock, Users, Trophy, ExternalLink, Cpu, CheckCircle2, ChevronRight, Zap } from 'lucide-react'

export default function RobothonShowcase({ onRegisterClick, playBeep }) {
  const [activeTab, setActiveTab] = useState('problems')

  const problems = [
    {
      title: 'GPS-Denied Drone Autonomous Navigation',
      domain: 'Aerial Robotics',
      desc: 'Formulate real-time Visual Inertial Odometry (VIO) and optical flow algorithms to navigate subterranean mining shafts without GPS reception.',
    },
    {
      title: 'Decentralized Swarm Reconnaissance',
      domain: 'Multi-Agent Systems',
      desc: 'Deploy 8 simulated micro-drones in Gazebo Garden to collaborate on target search and boundary fencing with mesh communication dropouts.',
    },
    {
      title: 'Hexapod Rough Terrain Locomotion',
      domain: 'Kinematics & Gait',
      desc: 'Synthesize dynamic tripod and wave gaits for a six-legged rover traversing shifting sand dune topologies and rocky debris.',
    },
    {
      title: 'Underwater Autonomous ROV Docking',
      domain: 'Marine Robotics',
      desc: 'Simulate hydrodynamic drag and acoustic beacon homing to dock an autonomous underwater vehicle into an offshore battery station.',
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
      {/* Container with robothon background banner */}
      <div className="relative rounded-3xl border border-cyan-500/30 bg-[#0a0f1e] overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.18)]">
        
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/robothon-bg1.png"
            alt="Robothon Hackathon"
            className="w-full h-full object-cover object-center filter brightness-40 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b17] via-[#070b17]/85 to-[#070b17]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b17] via-transparent to-[#070b17]/60" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col gap-8">
          
          {/* Top Badge & Time */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-orbitron tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>MAIN FLAGSHIP HACKATHON</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>22-23 MARCH 2026 • 10:00 AM ONWARDS</span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="max-w-[700px]">
            <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white text-glow-cyan">
              ROBOTHON 2026
            </h2>
            <div className="mt-2 text-sm font-orbitron text-cyan-400 tracking-[0.2em]">
              BUILD THE FUTURE // 24-HOUR SIMULATION SPRINT
            </div>
            <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed font-exo">
              A high-stakes 24-hour simulation hackathon tackling extreme defense and aerospace challenges in ROS 2, Gazebo, and Isaac Sim. Push algorithmic boundaries across swarm drones, GPS-denied tunnels, and rough-terrain hexapods.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[800px]">
            <div className="p-3.5 rounded-xl bg-[#070b17]/80 border border-cyan-500/20 backdrop-blur-md">
              <div className="text-[10px] font-mono-tech text-gray-400 uppercase">DURATION</div>
              <div className="mt-1 font-orbitron text-lg font-bold text-cyan-300">24 Hours</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070b17]/80 border border-cyan-500/20 backdrop-blur-md">
              <div className="text-[10px] font-mono-tech text-gray-400 uppercase">TEAM SIZE</div>
              <div className="mt-1 font-orbitron text-lg font-bold text-cyan-300">2-4 Members</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070b17]/80 border border-cyan-500/20 backdrop-blur-md">
              <div className="text-[10px] font-mono-tech text-gray-400 uppercase">FORMAT</div>
              <div className="mt-1 font-orbitron text-lg font-bold text-yellow-400">Simulation</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070b17]/80 border border-cyan-500/20 backdrop-blur-md">
              <div className="text-[10px] font-mono-tech text-gray-400 uppercase">PRIZE POOL</div>
              <div className="mt-1 font-orbitron text-lg font-bold text-yellow-400">₹35,000</div>
            </div>
          </div>

          {/* Interactive Problem Statement Cards */}
          <div className="mt-2">
            <div className="text-xs font-orbitron text-cyan-400 tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>SIMULATION TRACK PROBLEM STATEMENTS:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {problems.map((prob, i) => (
                <div
                  key={prob.title}
                  className="p-4 rounded-xl bg-[#070b17]/85 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-md transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-cyan-400">
                    <span>TRACK 0{i + 1}</span>
                    <span className="text-gray-400">{prob.domain}</span>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {prob.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-gray-400 leading-relaxed font-exo">
                    {prob.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-exo text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Free Software Resource Kit & ROS 2 Cloud Workspaces Provided</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playBeep?.(900, 0.05)
                  onRegisterClick('Robothon: 24H Simulation Matrix')
                }}
                className="h-[42px] px-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] font-orbitron font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer"
              >
                <span>REGISTER FOR ROBOTHON</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
