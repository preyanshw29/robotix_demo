import React, { useState } from 'react'
import { 
  Swords, 
  Car, 
  Terminal, 
  Cpu, 
  Bot, 
  Search, 
  ShieldCheck, 
  Activity, 
  Trophy, 
  Users, 
  ArrowRight, 
  X, 
  Clock, 
  Target,
  FileText,
  ExternalLink,
  Sparkles
} from 'lucide-react'

export const EVENTS_DATA = [
  {
    id: 'robowar',
    title: 'ROBOWAR',
    subtitle: 'ENTER THE ARENA',
    badge: 'COMBAT EVENT',
    category: 'combat',
    categoryLabel: 'COMBAT ROBOTICS',
    prize: '₹10,000+',
    dateTime: '22 March • 2 PM - 6 PM',
    teamSize: '1-4 Members',
    difficulty: 'HARDCORE',
    icon: Swords,
    summary: 'Design and build a powerful remote-controlled battle robot capable of competing against other robots in a controlled bulletproof combat arena.',
    specs: {
      weightLimit: '8 kg (Featherweight) & Middleweight Division',
      connection: 'Wireless 2.4GHz Only with Fail-safe',
      arenaSize: '24ft x 24ft Bulletproof Polycarbonate & Steel Arena',
      weaponTypes: 'Spinning vertical/horizontal drums, pneumatic flippers, passive armor wedges',
    },
    rules: [
      'Wireless remote control with guaranteed fail-safe within 1.5 seconds of signal loss.',
      'Arena hazards include randomized pneumatic floor flippers and spike pits.',
      'Match duration: 3 minutes per heat. Judged on Aggression, Damage, and Arena Control.',
    ],
    unstopLink: 'https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702',
    schedule: '22 March • 2 PM - 6 PM // Combat Arena',
    coordinators: 'Aryan Sharma & Neha Verma (ROBOTiX Club)',
  },
  {
    id: 'roborace',
    title: 'ROBORACE',
    subtitle: 'SPEED UNLEASHED',
    badge: 'SPEED EVENT',
    category: 'combat',
    categoryLabel: 'SPEED & PRECISION',
    prize: '₹10,000+',
    dateTime: '23 March • 10 AM - 2 PM',
    teamSize: '1-4 Members',
    difficulty: 'MEDIUM',
    icon: Car,
    summary: 'Design and build a self-built robot capable of navigating a demanding multi-surface obstacle track with speed, precision, and agility.',
    specs: {
      maxSize: '25x25x25 cm',
      weightLimit: 'Max 5 kg',
      powerLimit: 'Max 14.8V (4S LiPo)',
      trackLength: '180-meter indoor obstacle circuit with ramps & slick oil zones',
    },
    rules: [
      'Time-trial format: 2 qualifying laps + 1 superpole sprint.',
      'Touching track boundary penalties: +5 seconds per offense.',
      'Manual rescue allowed once per run with a 20-second time penalty.',
    ],
    unstopLink: 'https://unstop.com/competitions/roborace-robofest26-robofest-26-national-institute-of-technology-nit-raipur-1655808',
    schedule: '23 March • 10 AM - 2 PM // Track 01 Arena',
    coordinators: 'Rohan Deshmukh & Kunal Patil',
  },
  {
    id: 'vibecoding',
    title: 'VIBE CODING',
    subtitle: 'CODE THE BOTS',
    badge: 'ARDUINO EVENT',
    category: 'simulation',
    categoryLabel: 'EMBEDDED SYSTEMS',
    prize: '₹12,000',
    dateTime: '22 March • 10 AM - 2 PM',
    teamSize: '1-2 Members',
    difficulty: 'MEDIUM',
    icon: Cpu,
    summary: 'An Arduino & microcontroller coding sprint where participants program hardware to solve real-time sensor/actuator challenges and bring circuits to life.',
    specs: {
      platform: 'Arduino / ESP32 / Verilog',
      hardwareProvided: 'Sensors, Breadboards, Logic Analyzers, Jumper Kits',
      duration: '2-3 Hours Sprint',
      testFormat: 'Live hardware bench test on jitter & latency',
    },
    rules: [
      '3 Progressive rounds: Bug triage, sensor signal filtering, and real-time actuator feedback.',
      'Hardware provided at the venue. Zero pre-written firmware allowed.',
      'Points awarded for execution accuracy and speed.',
    ],
    unstopLink: 'https://unstop.com/o/mAyxjwR?utm_medium=Share&utm_source=robotixclubz3574&utm_campaign=Online_coding_challenge',
    schedule: '22 March • 10 AM - 2 PM // Embedded Systems Lab',
    coordinators: 'Ananya Sen & Devansh Roy',
  },
  {
    id: 'roboquiz',
    title: 'ROBOQUIZ',
    subtitle: 'TEST YOUR KNOWLEDGE',
    badge: 'QUIZ EVENT',
    category: 'simulation',
    categoryLabel: 'TECHNICAL TRIVIA',
    prize: 'Goodies worth ₹6,000',
    dateTime: '22 March • 2:30 PM Onwards',
    teamSize: 'Individual Participation',
    difficulty: 'EASY',
    icon: Terminal,
    summary: 'Robotics-themed technical quiz designed to test participants on core mechanics, automation history, electronics, and futuristic AI robotics.',
    specs: {
      rounds: '2 Rounds (Preliminary Written Screening + Buzzer Finals)',
      mode: 'Offline Interactive Audio-Visual Quiz',
      topics: 'Kinematics, Microcontrollers, Autonomous Drones, Robot History',
      duration: '90 Minutes',
    },
    rules: [
      'Round 1: Rapid-fire screening test.',
      'Round 2: Stage buzzer round with negative marking.',
      'Open to all branches and years.',
    ],
    unstopLink: 'https://unstop.com/o/IwoBX5F?utm_medium=Share&utm_source=robotixclubz3574&utm_campaign=Quizzes',
    schedule: '22 March • 2:30 PM // Auditorium Hall 02',
    coordinators: 'Siddharth Roy & Tanmay Saxena',
  },
  {
    id: 'robosoccer',
    title: 'ROBOSOCCER',
    subtitle: 'CYBER KICKOFF',
    badge: 'SPORTS EVENT',
    category: 'combat',
    categoryLabel: 'MECHANICAL DYNAMICS',
    prize: '₹25,000',
    dateTime: '22-23 March • Afternoon',
    teamSize: '2-4 Members',
    difficulty: 'MEDIUM',
    icon: Bot,
    summary: 'Fast-paced robotic football. Custom manual wireless bots battle on artificial turf with solenoid kickers, dribblers, and defensive scoops.',
    specs: {
      pitchSize: '16ft x 10ft Astroturf with acrylic sidewalls',
      weightLimit: 'Max 5 kg per robot',
      powerLimit: 'Max 12V Onboard DC power',
      kickerTypes: 'Pneumatic or Solenoid kicker mechanisms',
    },
    rules: [
      'Two halves of 4 minutes each with golden goal extra time in knockouts.',
      'Robots must not possess sticky coatings or vacuum suction to retain ball.',
      'Goalkeeper bots must allow at least 50% open goal line during defensive stances.',
    ],
    unstopLink: 'https://unstop.com',
    schedule: '22-23 March // Indoor Sports Complex',
    coordinators: 'Kunal Patil & Varun Joshi',
  },
  {
    id: 'aerovision',
    title: 'AEROVISION AI',
    subtitle: 'AUTONOMOUS DRONE GRAND PRIX',
    badge: 'AI DRONE EVENT',
    category: 'autonomous',
    categoryLabel: 'AERIAL EDGE AI',
    prize: '₹20,000',
    dateTime: '23 March • 11 AM - 3 PM',
    teamSize: '2-4 Members',
    difficulty: 'HARDCORE',
    icon: Activity,
    summary: 'Zero human pilots. Micro-drones with on-board edge AI (OpenCV/YOLO) detect neon gate rings and complete the circuit 100% autonomously.',
    specs: {
      arenaSize: '20ft x 20ft 3D Flight Enclosure with safety netting',
      weightLimit: 'Max 800g flight weight including battery',
      hardware: 'On-board Jetson Nano / Raspberry Pi 5 + camera',
      tracking: 'Dynamic color-shifting LED neon gate rings',
    },
    rules: [
      'Full autonomy from takeoff to landing pad touchdown.',
      'Illuminated neon gate sequencing: Gates change color dynamically.',
      'Safety tether and emergency hardware cut-off mandatory for every team.',
    ],
    unstopLink: 'https://unstop.com',
    schedule: '23 March // High-Bay Robotics Hangar',
    coordinators: 'Tanmay Saxena & Pooja Nair',
  },
  {
    id: 'mechagauntlet',
    title: 'MECHA GAUNTLET',
    subtitle: 'QUADRUPED & BIPEDAL TRIAL',
    badge: 'LEGGED BOTS',
    category: 'autonomous',
    categoryLabel: 'KINEMATICS & LEGGED BOTS',
    prize: '₹20,000',
    dateTime: '23 March • 1 PM - 4 PM',
    teamSize: '2-4 Members',
    difficulty: 'ADVANCED',
    icon: Target,
    summary: 'Inspired by Boston Dynamics. Legged robots and quadruped robo-dogs navigate gravel beds, stair risers, and dynamic balance beam tests.',
    specs: {
      terrainCourse: 'Stairs (5cm-15cm), gravel pits, 20° incline ramp',
      weightLimit: 'Max 12 kg',
      sensors: 'IMU stabilization & compliant joint feedback',
      modes: 'Manual control or 1.5x autonomous gait multiplier',
    },
    rules: [
      'Evaluated on balance recovery when subjected to controlled side-impacts.',
      'Autonomous gait transitions earn 1.5x multiplier over manual joystick walking.',
      'Bots must self-right if fallen within 30 seconds.',
    ],
    unstopLink: 'https://unstop.com',
    schedule: '23 March // Open Mechanical Quadrangle',
    coordinators: 'Pooja Nair & Aryan Sharma',
  },
  {
    id: 'neurobotix',
    title: 'NEUROBOTIX',
    subtitle: 'MIND & GESTURE TELE-OP',
    badge: 'HRI ARENA',
    category: 'hri',
    categoryLabel: 'HUMAN-ROBOT INTERACTION',
    prize: '₹15,000',
    dateTime: '22 March • 4 PM - 7 PM',
    teamSize: '1-3 Members',
    difficulty: 'MEDIUM',
    icon: Bot,
    summary: 'Control robotic manipulators and rovers using non-invasive EEG headsets or real-time camera hand gestures to solve precision hazard puzzles.',
    specs: {
      hardware: 'OpenBCI / Muse EEG headbands or MediaPipe gesture pipelines',
      arena: 'Micro-manipulation bench with precision peg-in-hole assemblies',
      scoring: 'Evaluated on latency, steady-state accuracy, and error-free pick-and-place',
    },
    rules: [
      'No physical controller (no gamepads, joysticks, or keyboards) during task execution.',
      'Task 1: Mental concentration thresholding; Task 2: Multi-finger gesture object sorting.',
    ],
    unstopLink: 'https://unstop.com',
    schedule: '22 March // Advanced Mechatronics Lab',
    coordinators: 'Siddharth Roy & Neha Verma',
  },
  {
    id: 'cyberneticsalvage',
    title: 'CYBER SALVAGE',
    subtitle: 'DISASTER RESCUE SLAM',
    badge: 'SEARCH & RESCUE',
    category: 'hri',
    categoryLabel: 'DISASTER RESCUE & SLAM',
    prize: '₹20,000',
    dateTime: '22 March • 7 PM - 9 PM',
    teamSize: '2-4 Members',
    difficulty: 'ADVANCED',
    icon: ShieldCheck,
    summary: 'Search-and-rescue rover deployed in a dark, smoke-filled subterranean labyrinth using LiDAR, thermal imaging, and gas telemetry mapping.',
    specs: {
      sensors: '2D/3D LiDAR, FLIR thermal sensor, CO2 gas detector, gripper',
      arena: '30ft x 20ft Zero-Visibility Partitioned Maze with artificial smoke',
      display: 'Operators navigate solely using telemetry sensor feed',
    },
    rules: [
      'Operators cannot see the physical arena; navigation relies solely on telemetry stream.',
      'Teams must produce a 2D occupancy grid map and report 3 hidden thermal casualty beacons.',
    ],
    unstopLink: 'https://unstop.com',
    schedule: '22 March // Underground Workshop Bunker',
    coordinators: 'Varun Joshi & Kunal Patil',
  },
]

export default function EventsArena({ onRegisterClick, playBeep }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [inspectEvent, setInspectEvent] = useState(null)

  const categories = [
    { id: 'all', label: 'ALL CONTESTS', count: '09' },
    { id: 'combat', label: 'COMBAT & SPEED', count: '03' },
    { id: 'simulation', label: 'SIMULATION & CODE', count: '02' },
    { id: 'autonomous', label: 'AUTONOMOUS & AI', count: '02' },
    { id: 'hri', label: 'NEXT-GEN HRI & SLAM', count: '02' },
  ]

  const filteredEvents = EVENTS_DATA.filter((e) => {
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <section id="arena" className="relative w-full py-20 px-4 sm:px-6 max-w-[1240px] mx-auto scroll-mt-24">
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ARENA REGISTRY // ROBOFEST '26</span>
        </div>
        <span className="text-xs font-mono-tech text-gray-400">
          ACTIVE COMPETITIONS // {filteredEvents.length} READY
        </span>
      </div>

      {/* Module Title */}
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white text-glow-cyan">
            COMPETITIONS & CHALLENGES
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base font-exo max-w-[680px]">
            Prove your engineering mettle across high-voltage combat, obstacle time-trials, autonomous AI flight, and embedded circuitry.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px] p-2 rounded-xl bg-[#0a0f1e]/80 border border-cyan-500/30 focus-within:border-cyan-400 transition-colors">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search RoboWar, Drone, ROS..."
              className="w-full bg-transparent text-xs font-exo text-white placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playBeep?.(820, 0.04)
              setSelectedCategory(cat.id)
            }}
            className={`h-[40px] px-5 rounded-full text-xs font-orbitron tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070b17] font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                : 'bg-[#0a0f1e]/70 border border-cyan-500/20 text-gray-400 hover:text-cyan-300 hover:border-cyan-500/40'
            }`}
          >
            <span>{cat.label}</span>
            <span className={selectedCategory === cat.id ? 'text-[#070b17]/80 text-[10px]' : 'text-cyan-400 text-[10px]'}>
              ({cat.count})
            </span>
          </button>
        ))}
      </div>

      {/* Events Grid with Cyber Cards & Glowing Hover */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const IconComp = evt.icon
          return (
            <div
              key={evt.id}
              className="rounded-2xl border border-cyan-500/25 bg-[#0a0f1e]/85 backdrop-blur-md p-6 flex flex-col justify-between hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] relative overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/15 blur-2xl rounded-full transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header Tag + Prize */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
                  <span className="text-[10px] font-orbitron font-semibold text-cyan-400 tracking-[0.2em] uppercase">
                    {evt.badge}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-orbitron text-yellow-400">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{evt.prize}</span>
                  </div>
                </div>

                {/* Event Title */}
                <div className="mt-5 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <IconComp className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {evt.title}
                    </h3>
                    <div className="text-[11px] font-orbitron text-cyan-500/80 tracking-wider">
                      {evt.subtitle}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-exo line-clamp-3">
                  {evt.summary}
                </p>

                {/* Meta details */}
                <div className="mt-5 pt-3 border-t border-cyan-500/15 flex flex-wrap items-center gap-3 text-xs font-exo text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{evt.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{evt.teamSize}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    playBeep?.(900, 0.05)
                    setInspectEvent(evt)
                  }}
                  className="text-xs font-orbitron text-gray-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={evt.unstopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playBeep?.(1000, 0.06)}
                  className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#070b17] font-orbitron font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                >
                  <span>REGISTER</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Blueprint Detail Modal */}
      {inspectEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b17]/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0f1e] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.25)]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>OFFICIAL SPECIFICATION // {inspectEvent.title}</span>
              </div>
              <button
                onClick={() => setInspectEvent(null)}
                className="w-8 h-8 rounded-full bg-[#070b17] border border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Prizes */}
            <div className="mt-6">
              <span className="text-[10px] font-orbitron text-cyan-400 uppercase tracking-widest">
                {inspectEvent.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-black text-white mt-1">
                {inspectEvent.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-orbitron">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-yellow-400">
                  PRIZE PURSE: {inspectEvent.prize}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#070b17] border border-cyan-500/30 text-white">
                  TEAM: {inspectEvent.teamSize}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#070b17] border border-cyan-500/30 text-cyan-300">
                  SCHEDULE: {inspectEvent.dateTime}
                </span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-6 text-sm text-gray-300 leading-relaxed font-exo">
              {inspectEvent.summary}
            </p>

            {/* Specs Grid */}
            <div className="mt-6 p-4 rounded-2xl bg-[#070b17] border border-cyan-500/20">
              <span className="text-xs font-orbitron text-cyan-400 uppercase tracking-wider block mb-3">
                ARENA & HARDWARE RULES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-exo">
                {Object.entries(inspectEvent.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-gray-400 block uppercase font-orbitron text-[10px]">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-white mt-0.5 block font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulations */}
            <div className="mt-6">
              <span className="text-xs font-orbitron text-cyan-400 uppercase tracking-wider block mb-2">
                RULES & JUDGING
              </span>
              <ul className="flex flex-col gap-2">
                {inspectEvent.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-exo">
                    <span className="text-cyan-400 font-mono-tech">0{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-exo text-gray-400">
                <span className="text-gray-500 block font-orbitron text-[10px]">STUDENT LEADS:</span>
                <span className="text-white">{inspectEvent.coordinators}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={inspectEvent.unstopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[42px] px-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#070b17] font-orbitron font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer"
                >
                  <span>REGISTER ON UNSTOP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
