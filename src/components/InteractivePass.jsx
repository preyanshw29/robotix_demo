import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { 
  CreditCard, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Sparkles, 
  QrCode, 
  Shield, 
  ArrowRight,
  X
} from 'lucide-react'
import { EVENTS_DATA } from './EventsArena'

export default function InteractivePass({ initialEvent, isModalOpen, setIsModalOpen, playBeep }) {
  const [formData, setFormData] = useState({
    name: 'Kshitij Verma',
    college: 'National Institute of Technology, Raipur',
    email: 'kshitij.verma@nitrr.ac.in',
    selectedEvent: initialEvent || 'ROBOWAR',
    teamName: 'TitanForge Labs',
    passId: 'RF26-8842',
  })

  const [registered, setRegistered] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    playBeep?.(1200, 0.1)

    const randomId = 'RF26-' + Math.floor(1000 + Math.random() * 9000)
    setFormData((prev) => ({ ...prev, passId: randomId }))
    setRegistered(true)

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00d4ff', '#ffffff', '#3b82f6', '#facc15'],
    })
  }

  return (
    <section id="register" className="relative w-full py-20 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
          <CreditCard className="w-3.5 h-3.5" />
          <span>DELEGATE CREDENTIAL & PASS PORTAL</span>
        </div>
        <span className="text-xs font-mono-tech text-gray-400">
          SECURE ENCRYPTED // ROBOFEST '26
        </span>
      </div>

      {/* Module Title */}
      <div className="mt-8">
        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white text-glow-cyan">
          ACQUIRE DELEGATE CREDENTIALS
        </h2>
        <p className="mt-3 text-gray-300 text-sm sm:text-base font-exo max-w-[680px]">
          Generate your official cryptographic participant pass or register your team directly on Unstop.
        </p>
      </div>

      {/* Main Interactive Pass Well */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-3xl border border-cyan-500/30 bg-[#0a0f1e]/85 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_35px_rgba(0,212,255,0.15)]">
        
        {/* Left: Interactive Pass Visual Card */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[420px] rounded-2xl border border-cyan-500/40 bg-[#070b17] p-6 relative overflow-hidden shadow-[0_0_30px_rgba(0,212,255,0.2)] group transition-all duration-300 hover:border-cyan-300">
            
            {/* Top Bar with Logo */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <img src="/logoWhite.png" alt="Logo" className="h-6 w-auto object-contain" />
                <span className="text-xs font-orbitron font-bold text-cyan-300 tracking-wider">
                  ROBOFEST // '26
                </span>
              </div>
              <span className="text-xs font-mono-tech text-cyan-400">
                {formData.passId}
              </span>
            </div>

            {/* Pass Body Info */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 uppercase tracking-widest block">
                  PARTICIPANT / PILOT
                </span>
                <span className="text-lg font-bold text-white block mt-0.5 font-exo">
                  {formData.name || 'DELEGATE OPERATIVE'}
                </span>

                <span className="text-[10px] font-orbitron text-cyan-400 uppercase tracking-widest block mt-3">
                  INSTITUTE AFFILIATION
                </span>
                <span className="text-xs text-gray-300 block mt-0.5 max-w-[200px] truncate font-exo">
                  {formData.college || 'NIT Raipur'}
                </span>
              </div>

              {/* QR Code */}
              <div className="p-2.5 rounded-xl bg-[#0a0f1e] border border-cyan-500/30 flex flex-col items-center shadow-inner">
                <QrCode className="w-14 h-14 text-cyan-300" />
                <span className="text-[8px] font-mono-tech text-cyan-400 mt-1">VERIFIED</span>
              </div>
            </div>

            {/* Selected Contest */}
            <div className="mt-5 p-3 rounded-xl bg-[#0a0f1e] border border-cyan-500/20">
              <div className="flex items-center justify-between text-xs font-exo">
                <span className="text-gray-400 font-orbitron text-[10px]">EVENT:</span>
                <span className="text-cyan-300 font-bold font-orbitron">{formData.selectedEvent}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-exo mt-1">
                <span className="text-gray-400 font-orbitron text-[10px]">TEAM:</span>
                <span className="text-white font-medium">{formData.teamName || 'Solo Pioneer'}</span>
              </div>
            </div>

            {/* Barcode & Security Strip */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
              <span className="font-mono-tech text-[10px] text-gray-400">
                NIT RAIPUR // ANANTYA
              </span>
              <div className="flex gap-0.5 h-6 items-end">
                {[4, 8, 2, 6, 8, 3, 7, 5, 2, 7, 4, 8, 6, 3, 8, 2].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h * 2.5}px` }}
                    className="w-[2px] bg-cyan-400/80 inline-block"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-mono-tech text-cyan-400/80">
              LIVE PASS GENERATOR // UPDATES IN REAL-TIME
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="space-y-2">
            <span className="text-xs font-orbitron text-cyan-400 uppercase tracking-widest font-bold">
              GET ACCREDITED
            </span>
            <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white">
              Register Your Bot Team or Attend as Delegate
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-exo leading-relaxed">
              Teams competing in RoboWar, Robothon, or RoboSoccer must complete official registration to reserve pit spaces and receive battery safety tags.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                playBeep?.(900, 0.05)
                setIsModalOpen(true)
              }}
              className="h-[48px] px-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] font-orbitron font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,212,255,0.4)] active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>CUSTOMIZE & CLAIM PASS</span>
            </button>

            <a
              href="https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBeep?.(800, 0.04)}
              className="h-[48px] px-6 rounded-full bg-[#070b17] hover:bg-[#111a33] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-orbitron text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>REGISTER ON UNSTOP</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          <div className="pt-3 border-t border-cyan-500/20 flex items-center gap-2 text-xs font-exo text-gray-400">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Zero Entry Fee for Visitors & Keynote Sessions</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b17]/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-[560px] rounded-3xl bg-[#0a0f1e] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.25)]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>ROBOFEST PARTICIPANT CREDENTIAL GENERATOR</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#070b17] border border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {registered ? (
              /* Success State */
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="mt-4 text-2xl font-orbitron font-bold text-white">
                  Credential Successfully Issued
                </h3>
                <p className="mt-2 text-xs text-gray-300 max-w-[360px] leading-relaxed font-exo">
                  Pass <span className="text-cyan-400 font-mono-tech">{formData.passId}</span> assigned to{' '}
                  <span className="text-white font-medium">{formData.name}</span> for{' '}
                  <span className="text-cyan-300 font-medium">{formData.selectedEvent}</span>.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => {
                      playBeep?.(1000, 0.05)
                      window.print()
                    }}
                    className="h-[42px] px-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#070b17] text-xs font-orbitron font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PRINT / SAVE PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setRegistered(false)
                      setIsModalOpen(false)
                    }}
                    className="h-[42px] px-6 rounded-full bg-[#070b17] text-gray-300 text-xs font-orbitron border border-cyan-500/30"
                  >
                    <span>DONE</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col gap-4 font-exo">
                <div>
                  <label className="text-xs font-orbitron text-cyan-400 uppercase block mb-1">
                    FULL NAME / BOT PILOT
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full h-[44px] px-4 rounded-xl bg-[#070b17] border border-cyan-500/30 focus:border-cyan-400 text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-orbitron text-cyan-400 uppercase block mb-1">
                      COLLEGE / INSTITUTION
                    </label>
                    <input
                      type="text"
                      required
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. NIT Raipur"
                      className="w-full h-[44px] px-4 rounded-xl bg-[#070b17] border border-cyan-500/30 focus:border-cyan-400 text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-orbitron text-cyan-400 uppercase block mb-1">
                      OFFICIAL EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. pilot@nitrr.ac.in"
                      className="w-full h-[44px] px-4 rounded-xl bg-[#070b17] border border-cyan-500/30 focus:border-cyan-400 text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-orbitron text-cyan-400 uppercase block mb-1">
                      PRIMARY EVENT
                    </label>
                    <select
                      name="selectedEvent"
                      value={formData.selectedEvent}
                      onChange={handleInputChange}
                      className="w-full h-[44px] px-3 rounded-xl bg-[#070b17] border border-cyan-500/30 focus:border-cyan-400 text-xs text-white focus:outline-none font-orbitron"
                    >
                      {EVENTS_DATA.map((evt) => (
                        <option key={evt.id} value={evt.title} className="bg-[#0a0f1e] text-white">
                          {evt.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-orbitron text-cyan-400 uppercase block mb-1">
                      TEAM CALLSIGN
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="e.g. TitanForge"
                      className="w-full h-[44px] px-4 rounded-xl bg-[#070b17] border border-cyan-500/30 focus:border-cyan-400 text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-cyan-500/20 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-orbitron text-gray-400 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="h-[44px] px-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] text-xs font-orbitron font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.4)] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>GENERATE DELEGATE PASS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
