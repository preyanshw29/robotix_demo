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
  FileText
} from 'lucide-react'

export const EVENTS_DATA = [
  {
    id: 'robowar',
    title: 'RoboWar: Titan Clash',
    category: 'combat',
    categoryLabel: 'COMBAT ROBOTICS',
    prize: '₹45,000',
    teamSize: '3-5 Members',
    difficulty: 'HARDCORE',
    icon: Swords,
    summary: 'Heavy metal clash inside an armored 8mm polycarbonate arena. Armed with high-RPM spinners, wedges, and pneumatic flippers.',
    specs: {
      arenaSize: '24ft x 24ft Bulletproof Polycarbonate & Steel Arena',
      weightLimit: 'Up to 30kg (Featherweight) & 60kg (Middleweight)',
      powerLimit: 'Max 24V DC / 6S LiPo with active fail-safe RF lock',
      weaponTypes: 'Spinning vertical/horizontal drums, pneumatic flippers, passive armor wedges',
    },
    rules: [
      'Wireless remote control with guaranteed fail-safe within 1.5 seconds of signal loss.',
      'Arena hazards include randomized pneumatic floor flippers and spike pits.',
      'Match duration: 3 minutes per heat. Judged on Aggression, Damage, and Arena Control if neither bot is immobilized.',
    ],
    schedule: 'Day 02 & Day 03 // Main Stadium Enclosure',
    coordinators: 'Aryan Sharma (+91 98765 43210) & Neha Verma',
  },
  {
    id: 'robosoccer',
    title: 'RoboSoccer: Cyber Kickoff',
    category: 'combat',
    categoryLabel: 'MECHANICAL DYNAMICS',
    prize: '₹25,000',
    teamSize: '2-4 Members',
    difficulty: 'MEDIUM',
    icon: Bot,
    summary: 'Fast-paced robotic football. Custom manual bots battle on synthetic turf with solenoid kickers, dribblers, and defensive scoops.',
    specs: {
      arenaSize: '16ft x 10ft Astroturf pitch with acrylic sidewalls',
      weightLimit: 'Max 5kg per robot',
      powerLimit: 'Max 12V Onboard DC power',
      weaponTypes: 'Mechanical/solenoid kicking mechanisms (non-damaging to ball and pitch)',
    },
    rules: [
      'Two halves of 4 minutes each with golden goal extra time in knockouts.',
      'Robots must not possess sticky coatings or vacuum suction to retain ball.',
      'Goalkeeper bots must allow at least 50% open goal line during defensive stances.',
    ],
    schedule: 'Day 01 & Day 02 // Indoor Sports Complex',
    coordinators: 'Kunal Patil (+91 98234 56789)',
  },
  {
    id: 'roborace',
    title: 'RoboRace: Apex Circuit',
    category: 'combat',
    categoryLabel: 'PRECISION & SPEED',
    prize: '₹25,000',
    teamSize: '2-4 Members',
    difficulty: 'MEDIUM',
    icon: Car,
    summary: 'High-speed obstacle time-trial across elevated see-saw bridges, oil slicks, sand pits, and hairpin chicanes against the clock.',
    specs: {
      arenaSize: '180-meter multi-surface indoor obstacle circuit',
      weightLimit: 'Max 4kg',
      powerLimit: 'Max 14.8V (4S LiPo)',
      weaponTypes: 'High-traction all-terrain suspension & chassis',
    },
    rules: [
      'Time-trial format: 2 qualifying laps + 1 superpole sprint.',
      'Touching track boundary penalties: +5 seconds per offense.',
      'Manual rescue allowed once per run with a 20-second time penalty.',
    ],
    schedule: 'Day 01 // Track 01 Arena',
    coordinators: 'Rohan Deshmukh (+91 99112 23344)',
  },
  {
    id: 'robothon',
    title: 'Robothon: 24H Simulation Matrix',
    category: 'simulation',
    categoryLabel: 'AUTONOMOUS SIMULATION',
    prize: '₹30,000',
    teamSize: '2-4 Members',
    difficulty: 'ADVANCED',
    icon: Terminal,
    summary: 'Non-stop 24-hour simulation hackathon in ROS 2 & Gazebo. Problem statements span GPS-denied rovers, swarm drones, and deep-sea ROVs.',
    specs: {
      arenaSize: 'Cloud Simulation Cluster (ROS 2 Humble / Gazebo Garden / Isaac Sim)',
      weightLimit: 'Virtual Hardware Telemetry',
      powerLimit: 'Algorithmic efficiency & compute constraints',
      weaponTypes: 'SLAM, Path Planning (A*, RRT*), Sensor Fusion (EKF)',
    },
    rules: [
      'Simulated environments revealed at the opening hour.',
      'Submissions benchmarked on target convergence time, obstacle collision penalty, and memory usage.',
      'Live code walkthrough and architectural presentation in front of the jury.',
    ],
    schedule: 'Day 01 (10:00 AM) to Day 02 (10:00 AM) // Central Computing Center',
    coordinators: 'Devansh Roy (+91 98450 12345)',
  },
  {
    id: 'vibecoding',
    title: 'Vibe Coding: Embedded Nexus',
    category: 'simulation',
    categoryLabel: 'EMBEDDED HARDWARE',
    prize: '₹15,000',
    teamSize: '1-3 Members',
    difficulty: 'MEDIUM',
    icon: Cpu,
    summary: 'Live microcontroller bug hunt & embedded logic race. Teams write bare-metal code on Arduino, ESP32, and STM32 under intense time limits.',
    specs: {
      arenaSize: 'Hardware Workbench with Oscilloscopes & Logic Analyzers',
      weightLimit: 'Microcontroller hardware stack',
      powerLimit: '5V USB / 3.3V Logic Levels',
      weaponTypes: 'C/C++, FreeRTOS, MicroPython',
    },
    rules: [
      '3 Progressive rounds: Bug triage, sensor signal filtering, and real-time actuator feedback control.',
      'No external AI assistants or pre-cooked libraries permitted during the live round.',
      'Points awarded for zero-jitter execution and minimal instruction cycles.',
    ],
    schedule: 'Day 02 // Embedded Systems Lab',
    coordinators: 'Ananya Sen (+91 97654 32109)',
  },
  {
    id: 'aerovision',
    title: 'AeroVision: AI Drone Grand Prix',
    category: 'autonomous',
    categoryLabel: 'AERIAL EDGE AI',
    prize: '₹20,000',
    teamSize: '2-4 Members',
    difficulty: 'HARDCORE',
    icon: Activity,
    summary: 'Zero human pilots. Micro-drones with on-board edge AI (OpenCV/YOLO) detect neon gate rings and complete the circuit 100% autonomously.',
    specs: {
      arenaSize: '20ft x 20ft 3D Flight Enclosure with netting',
      weightLimit: 'Max 800g flight weight including battery',
      powerLimit: '3S-4S LiPo with acoustic altitude kill-switch',
      weaponTypes: 'On-board Jetson Nano / Raspberry Pi 5 + monocular/stereo camera',
    },
    rules: [
      'Full autonomy from takeoff to landing pad touchdown.',
      'Illuminated neon gate sequencing: Gates change color dynamically.',
      'Safety tether and emergency hardware cut-off mandatory for every team.',
    ],
    schedule: 'Day 02 // High-Bay Robotics Hangar',
    coordinators: 'Tanmay Saxena (+91 98321 65498)',
  },
  {
    id: 'mechagauntlet',
    title: 'Mecha Gauntlet: Quadruped Trial',
    category: 'autonomous',
    categoryLabel: 'KINEMATICS & LEGGED BOTS',
    prize: '₹20,000',
    teamSize: '2-4 Members',
    difficulty: 'ADVANCED',
    icon: Target,
    summary: 'Inspired by Boston Dynamics. Legged robots and quadruped robo-dogs navigate gravel beds, stair risers, and dynamic balance beam tests.',
    specs: {
      arenaSize: 'Terrain Course: Steps (5cm to 15cm), gravel pits, 20° incline ramp',
      weightLimit: 'Max 12kg',
      powerLimit: 'LiPo / Li-ion onboard power',
      weaponTypes: 'Inverse kinematics, compliant leg joints, IMU stabilization',
    },
    rules: [
      'Evaluated on balance recovery when subjected to controlled side-impacts.',
      'Autonomous gait transitions earn 1.5x multiplier over manual joystick walking.',
      'Bots must self-right if fallen within 30 seconds to avoid disqualification.',
    ],
    schedule: 'Day 03 // Open Mechanical Quadrangle',
    coordinators: 'Pooja Nair (+91 99887 76655)',
  },
  {
    id: 'neurobotix',
    title: 'NeuroBotix: Mind & Gesture Arena',
    category: 'hri',
    categoryLabel: 'HUMAN-ROBOT INTERACTION',
    prize: '₹15,000',
    teamSize: '1-3 Members',
    difficulty: 'MEDIUM',
    icon: Bot,
    summary: 'Control robotic manipulators and rovers using non-invasive EEG headsets or real-time camera hand gestures to solve precision hazard puzzles.',
    specs: {
      arenaSize: 'Micro-manipulation bench with precision peg-in-hole assemblies',
      weightLimit: 'Tabletop robotic arm / micro-rover',
      powerLimit: 'Standard 12V 5A lab supply',
      weaponTypes: 'OpenBCI / Muse EEG headbands or MediaPipe gesture pipelines',
    },
    rules: [
      'No physical controller (no gamepads, joysticks, or keyboards) during task execution.',
      'Task 1: Mental concentration thresholding; Task 2: Multi-finger gesture object sorting.',
      'Scoring based on latency, steady-state accuracy, and error-free placements.',
    ],
    schedule: 'Day 01 // Advanced Mechatronics Lab',
    coordinators: 'Siddharth Roy (+91 97112 34567)',
  },
  {
    id: 'cyberneticsalvage',
    title: 'Cyber Salvage: Disaster SLAM',
    category: 'hri',
    categoryLabel: 'DISASTER RESCUE & SLAM',
    prize: '₹20,000',
    teamSize: '2-4 Members',
    difficulty: 'ADVANCED',
    icon: ShieldCheck,
    summary: 'Search-and-rescue rover deployed in a dark, smoke-filled subterranean labyrinth using LiDAR, thermal imaging, and gas telemetry mapping.',
    specs: {
      arenaSize: '30ft x 20ft Zero-Visibility Partitioned Maze with artificial smoke',
      weightLimit: 'Max 10kg rover',
      powerLimit: 'Max 24V onboard DC',
      weaponTypes: '2D/3D LiDAR, FLIR thermal sensor, CO2 gas detector, gripper',
    },
    rules: [
      'Operators cannot see the physical arena; navigation relies solely on telemetry stream.',
      'Teams must produce a 2D occupancy grid map and report 3 hidden thermal casualty beacons.',
      'Safe retrieval of a 500g hazardous payload awards maximum bonus points.',
    ],
    schedule: 'Day 02 // Underground Workshop Bunker',
    coordinators: 'Varun Joshi (+91 98989 89898)',
  },
]

export default function EventsArena({ onRegisterClick, playBeep }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [inspectEvent, setInspectEvent] = useState(null)

  const categories = [
    { id: 'all', label: 'ALL CONTESTS', count: '09' },
    { id: 'combat', label: 'COMBAT & SPEED', count: '03' },
    { id: 'autonomous', label: 'AUTONOMOUS & AI', count: '02' },
    { id: 'simulation', label: 'SIMULATION & CODE', count: '02' },
    { id: 'hri', label: 'NEXT-GEN HRI & SLAM', count: '02' },
  ]

  const filteredEvents = EVENTS_DATA.filter((e) => {
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <section id="arena" className="relative w-full py-20 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
      
      {/* Process Step Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-[#252525]">
        <div className="flex items-center justify-between text-[13px] font-mono-tech">
          <div className="flex items-center gap-2 text-[#e0e0e0]">
            <span className="text-[#00e5ff]">[02]</span>
            <span className="tracking-[1.04px]">ARENA & CONTEST REGISTRY</span>
          </div>
          <span className="text-[#646e71] uppercase tracking-[1.04px]">
            ACTIVE PROTOCOLS // {filteredEvents.length} READY
          </span>
        </div>
      </div>

      {/* Module Heading */}
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
            Engineered battlefields and algorithmic gauntlets.
          </h2>
          <p className="mt-3 text-[#828b8d] text-base leading-[1.4] max-w-[640px]">
            From the visceral violence of full-contact combat bots to autonomous computer vision drones and ROS 2 simulation sprints.
          </p>
        </div>

        {/* Inline Search Input (AWE unboxed style) */}
        <div className="relative min-w-[260px] border-b border-[#252525] focus-within:border-[#e0e0e0] transition-colors pb-1">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#646e71]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contest, ROS, combat..."
              className="w-full bg-transparent text-[13px] font-mono-tech text-[#e0e0e0] placeholder-[#646e71] focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#646e71] hover:text-[#e0e0e0]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Pills Row */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playBeep?.(820, 0.04)
              setSelectedCategory(cat.id)
            }}
            className={`h-[38px] px-4 rounded-[100px] text-[13px] font-mono-tech tracking-[1.04px] flex items-center gap-2 transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#444444]'
                : 'bg-transparent text-[#646e71] hover:text-[#e0e0e0] hover:bg-[#1f1f23]/40'
            }`}
          >
            <span>{cat.label}</span>
            <span className="text-[11px] text-[#646e71]">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Events Grid (AWE Framed Media Card: 16px radius, #16191b well, hairline ash borders) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt, idx) => {
          const IconComponent = evt.icon
          return (
            <div
              key={evt.id}
              className="rounded-2xl border border-[#252525] bg-[#16191b] p-6 flex flex-col justify-between hover:border-[#444444] transition-all group"
            >
              <div>
                {/* Header Row: Category Badge + Prize */}
                <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
                  <span className="text-[10px] font-mono-tech text-[#00e5ff] tracking-[2px] uppercase">
                    {evt.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-[100px] bg-[#1f1f23] border border-[#252525] text-[11px] font-mono-tech text-[#e0e0e0]">
                    <Trophy className="w-3 h-3 text-[#00e5ff]" />
                    <span>{evt.prize}</span>
                  </div>
                </div>

                {/* Event Title */}
                <div className="mt-5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1f1f23] border border-[#252525] flex items-center justify-center shrink-0 group-hover:border-[#00e5ff] transition-colors">
                    <IconComponent className="w-5 h-5 text-[#e0e0e0]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#e0e0e0] group-hover:text-white leading-tight">
                      {evt.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-[11px] font-mono-tech text-[#646e71]">
                      <span>{evt.teamSize}</span>
                      <span>//</span>
                      <span className="text-[#828b8d]">{evt.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-[#828b8d] leading-relaxed line-clamp-3">
                  {evt.summary}
                </p>
              </div>

              {/* Card Footer: Inspect Button */}
              <div className="mt-6 pt-4 border-t border-[#252525] flex items-center justify-between">
                <button
                  onClick={() => {
                    playBeep?.(900, 0.05)
                    setInspectEvent(evt)
                  }}
                  className="text-[12px] font-mono-tech text-[#e0e0e0] hover:text-[#00e5ff] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>INSPECT BLUEPRINT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    playBeep?.(1000, 0.06)
                    onRegisterClick(evt.title)
                  }}
                  className="px-3 py-1 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282f] border border-[#252525] text-[11px] font-mono-tech text-[#e0e0e0] transition-colors"
                >
                  ENROLL
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Blueprint Detail Modal */}
      {inspectEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010101]/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#16191b] border border-[#444444] p-6 sm:p-8 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
              <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#00e5ff]">
                <Activity className="w-3.5 h-3.5" />
                <span>SCHEMATIC SPECIFICATION // {inspectEvent.id.toUpperCase()}</span>
              </div>
              <button
                onClick={() => setInspectEvent(null)}
                className="w-8 h-8 rounded-full bg-[#1f1f23] border border-[#252525] flex items-center justify-center text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Title & Meta */}
            <div className="mt-6">
              <span className="text-[10px] font-mono-tech text-[#646e71] uppercase tracking-[2px]">
                {inspectEvent.categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#e0e0e0] mt-1">
                {inspectEvent.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1f1f23] border border-[#252525] text-xs font-mono-tech text-[#00e5ff]">
                  PRIZE PURSE: {inspectEvent.prize}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1f1f23] border border-[#252525] text-xs font-mono-tech text-[#e0e0e0]">
                  TEAM: {inspectEvent.teamSize}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1f1f23] border border-[#252525] text-xs font-mono-tech text-[#828b8d]">
                  LEVEL: {inspectEvent.difficulty}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-6 text-sm text-[#828b8d] leading-relaxed">
              {inspectEvent.summary}
            </div>

            {/* Technical Specifications Grid */}
            <div className="mt-6 p-4 rounded-xl bg-[#010101] border border-[#252525]">
              <span className="text-[10px] font-mono-tech text-[#646e71] uppercase tracking-wider block mb-3">
                ARENA & HARDWARE CONSTRAINTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#646e71] block font-mono-tech">ARENA DIMENSIONS:</span>
                  <span className="text-[#e0e0e0] mt-0.5 block">{inspectEvent.specs.arenaSize}</span>
                </div>
                <div>
                  <span className="text-[#646e71] block font-mono-tech">MASS SPECIFICATION:</span>
                  <span className="text-[#e0e0e0] mt-0.5 block">{inspectEvent.specs.weightLimit}</span>
                </div>
                <div>
                  <span className="text-[#646e71] block font-mono-tech">POWER & VOLTAGE:</span>
                  <span className="text-[#e0e0e0] mt-0.5 block">{inspectEvent.specs.powerLimit}</span>
                </div>
                <div>
                  <span className="text-[#646e71] block font-mono-tech">ALLOWED MECHANISMS:</span>
                  <span className="text-[#e0e0e0] mt-0.5 block">{inspectEvent.specs.weaponTypes}</span>
                </div>
              </div>
            </div>

            {/* Regulations */}
            <div className="mt-6">
              <span className="text-[11px] font-mono-tech text-[#e0e0e0] uppercase tracking-wider block mb-2">
                CRITICAL SCRUTINY RULES
              </span>
              <ul className="flex flex-col gap-2">
                {inspectEvent.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#828b8d]">
                    <span className="text-[#00e5ff] font-mono-tech">0{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logistics & Coordinators */}
            <div className="mt-6 pt-4 border-t border-[#252525] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[#646e71] block font-mono-tech">SCHEDULE & VENUE:</span>
                <span className="text-[#e0e0e0]">{inspectEvent.schedule}</span>
                <span className="text-[#646e71] block font-mono-tech mt-1">STUDENT LEADS:</span>
                <span className="text-[#828b8d]">{inspectEvent.coordinators}</span>
              </div>

              <button
                onClick={() => {
                  const title = inspectEvent.title
                  setInspectEvent(null)
                  onRegisterClick(title)
                }}
                className="h-[42px] px-6 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] font-mono-tech text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                <span>REGISTER FOR THIS EVENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
