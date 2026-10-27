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
  User, 
  Building, 
  Mail, 
  ArrowRight,
  Hash,
  X
} from 'lucide-react'
import { EVENTS_DATA } from './EventsArena'

export default function InteractivePass({ initialEvent, isModalOpen, setIsModalOpen, playBeep }) {
  const [formData, setFormData] = useState({
    name: 'Kshitij Verma',
    college: 'National Institute of Technology, Raipur',
    email: 'kshitij.verma@nitrr.ac.in',
    selectedEvent: initialEvent || 'RoboWar: Titan Clash',
    teamName: 'TitanForge Labs',
    passId: 'RF26-8842',
  })

  const [registered, setRegistered] = useState(false)
  const [activeTab, setActiveTab] = useState('ticket')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    playBeep?.(1200, 0.1)

    // Generate random pass identifier
    const randomId = 'RF26-' + Math.floor(1000 + Math.random() * 9000)
    setFormData((prev) => ({ ...prev, passId: randomId }))
    setRegistered(true)

    // Trigger celebratory cyber confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00e5ff', '#e0e0e0', '#3b82f6', '#ffffff'],
    })
  }

  return (
    <section id="register" className="relative w-full py-20 px-4 sm:px-6 max-w-[940px] mx-auto scroll-mt-24">
      
      {/* Process Step Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-[#252525]">
        <div className="flex items-center justify-between text-[13px] font-mono-tech">
          <div className="flex items-center gap-2 text-[#e0e0e0]">
            <span className="text-[#00e5ff]">[03]</span>
            <span className="tracking-[1.04px]">REGISTRATION & DELEGATE CREDENTIAL</span>
          </div>
          <span className="text-[#646e71] uppercase tracking-[1.04px]">
            PORTAL STATUS // ONLINE
          </span>
        </div>
      </div>

      {/* Module Heading */}
      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
          Secure your entry credentials to Robofest 2026.
        </h2>
        <p className="mt-3 text-[#828b8d] text-base leading-[1.4] max-w-[640px]">
          Generate your official cryptographic participant pass or register your team on Unstop. Free access to technical exhibitions and keynote stages.
        </p>
      </div>

      {/* Main Interactive Pass Well */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-2xl border border-[#252525] bg-[#16191b] p-6 sm:p-10">
        
        {/* Left: Interactive Pass Visual Card */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[420px] rounded-2xl border border-[#444444] bg-[#010101] p-6 relative overflow-hidden shadow-2xl group transition-all duration-300 hover:border-[#00e5ff]">
            
            {/* Holographic Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" />
                <span className="text-[11px] font-mono-tech text-[#e0e0e0] tracking-[1.5px] uppercase">
                  DELEGATE PASS // '26
                </span>
              </div>
              <span className="text-[11px] font-mono-tech text-[#646e71]">
                {formData.passId}
              </span>
            </div>

            {/* Pass Body Info */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-tech text-[#646e71] uppercase tracking-wider block">
                  OPERATIVE NAME
                </span>
                <span className="text-lg font-semibold text-[#e0e0e0] block mt-0.5">
                  {formData.name || 'DELEGATE OPERATIVE'}
                </span>

                <span className="text-[10px] font-mono-tech text-[#646e71] uppercase tracking-wider block mt-3">
                  INSTITUTE AFFILIATION
                </span>
                <span className="text-xs text-[#828b8d] block mt-0.5 max-w-[200px] truncate">
                  {formData.college || 'NIT Raipur'}
                </span>
              </div>

              {/* Simulated QR Code */}
              <div className="p-2 rounded-lg bg-[#16191b] border border-[#252525] flex flex-col items-center">
                <QrCode className="w-14 h-14 text-[#e0e0e0]" />
                <span className="text-[8px] font-mono-tech text-[#646e71] mt-1">VERIFIED</span>
              </div>
            </div>

            {/* Selected Contest */}
            <div className="mt-5 p-3 rounded-xl bg-[#16191b] border border-[#252525]">
              <div className="flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-[#646e71]">DESIGNATED PROTOCOL:</span>
                <span className="text-[#00e5ff] font-medium">{formData.selectedEvent}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-tech mt-1">
                <span className="text-[#646e71]">TEAM CALLSIGN:</span>
                <span className="text-[#e0e0e0]">{formData.teamName || 'Solo Pioneer'}</span>
              </div>
            </div>

            {/* Barcode & Security Strip */}
            <div className="mt-6 pt-4 border-t border-[#252525] flex items-center justify-between">
              <div className="flex items-center gap-1 font-mono-tech text-[10px] text-[#646e71]">
                <span>NITRR // ANANTYA // ROBOTIX</span>
              </div>
              <div className="flex gap-0.5 h-6 items-end">
                {[4, 8, 2, 6, 8, 3, 7, 5, 2, 7, 4, 8, 6, 3, 8, 2].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h * 2.5}px` }}
                    className="w-[2px] bg-[#646e71] inline-block"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] font-mono-tech text-[#646e71]">
              LIVE PASS PREVIEW // UPDATES INSTANTANEOUSLY
            </span>
          </div>
        </div>

        {/* Right: Action Column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="space-y-2">
            <span className="text-[11px] font-mono-tech text-[#00e5ff] uppercase tracking-wider">
              REGISTRATION FAST-TRACK
            </span>
            <h3 className="text-xl font-semibold text-[#e0e0e0]">
              Register Your Bot Team or Attend as Delegate
            </h3>
            <p className="text-xs text-[#828b8d] leading-relaxed">
              Teams competing in RoboWar, Robothon, or RoboSoccer must complete official registration to reserve pit spaces and receive battery safety tags.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {/* Open Instant Pass Modal Button */}
            <button
              onClick={() => {
                playBeep?.(900, 0.05)
                setIsModalOpen(true)
              }}
              className="h-[46px] px-6 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] text-[13px] font-mono-tech font-semibold tracking-[1px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>CUSTOMIZE & CLAIM PASS</span>
            </button>

            {/* External Unstop Portal Button */}
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBeep?.(800, 0.04)}
              className="h-[46px] px-6 rounded-[100px] bg-[#1f1f23] hover:bg-[#25252a] border border-[#252525] hover:border-[#828b8d] text-[#e0e0e0] text-[13px] font-mono-tech tracking-[1px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>REGISTER ON UNSTOP</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00e5ff]" />
            </a>
          </div>

          <div className="pt-3 border-t border-[#252525] flex items-center gap-2 text-[11px] font-mono-tech text-[#646e71]">
            <Shield className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Zero Entry Fee for Audience & Keynotes</span>
          </div>
        </div>
      </div>

      {/* Registration Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010101]/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-[560px] rounded-2xl bg-[#16191b] border border-[#444444] p-6 sm:p-8 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
              <div className="flex items-center gap-2 text-[12px] font-mono-tech text-[#e0e0e0]">
                <Sparkles className="w-4 h-4 text-[#00e5ff]" />
                <span>ROBOFEST PARTICIPANT CREDENTIAL GENERATOR</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1f1f23] border border-[#252525] flex items-center justify-center text-[#828b8d] hover:text-[#e0e0e0]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {registered ? (
              /* Success State */
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1f1f23] border border-[#00e5ff] flex items-center justify-center text-[#00e5ff]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#e0e0e0]">
                  Credential Successfully Issued
                </h3>
                <p className="mt-2 text-xs text-[#828b8d] max-w-[360px] leading-relaxed">
                  Pass <span className="text-[#00e5ff] font-mono-tech">{formData.passId}</span> assigned to{' '}
                  <span className="text-[#e0e0e0]">{formData.name}</span> for{' '}
                  <span className="text-[#e0e0e0]">{formData.selectedEvent}</span>.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => {
                      playBeep?.(1000, 0.05)
                      window.print()
                    }}
                    className="h-[40px] px-5 rounded-[100px] bg-[#e0e0e0] text-[#010101] text-xs font-mono-tech font-semibold flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PRINT / SAVE PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setRegistered(false)
                      setIsModalOpen(false)
                    }}
                    className="h-[40px] px-5 rounded-[100px] bg-[#1f1f23] text-[#e0e0e0] text-xs font-mono-tech border border-[#252525]"
                  >
                    <span>DONE</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-mono-tech text-[#646e71] uppercase block mb-1">
                    FULL NAME / BOT PILOT
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full h-[42px] px-4 rounded-xl bg-[#010101] border border-[#252525] focus:border-[#00e5ff] text-sm text-[#e0e0e0] placeholder-[#444444] focus:outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono-tech text-[#646e71] uppercase block mb-1">
                      COLLEGE / INSTITUTION
                    </label>
                    <input
                      type="text"
                      required
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. NIT Raipur"
                      className="w-full h-[42px] px-4 rounded-xl bg-[#010101] border border-[#252525] focus:border-[#00e5ff] text-sm text-[#e0e0e0] placeholder-[#444444] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-tech text-[#646e71] uppercase block mb-1">
                      OFFICIAL EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. pilot@nitrr.ac.in"
                      className="w-full h-[42px] px-4 rounded-xl bg-[#010101] border border-[#252525] focus:border-[#00e5ff] text-sm text-[#e0e0e0] placeholder-[#444444] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono-tech text-[#646e71] uppercase block mb-1">
                      PRIMARY EVENT
                    </label>
                    <select
                      name="selectedEvent"
                      value={formData.selectedEvent}
                      onChange={handleInputChange}
                      className="w-full h-[42px] px-3 rounded-xl bg-[#010101] border border-[#252525] focus:border-[#00e5ff] text-xs text-[#e0e0e0] focus:outline-none"
                    >
                      {EVENTS_DATA.map((evt) => (
                        <option key={evt.id} value={evt.title} className="bg-[#16191b] text-[#e0e0e0]">
                          {evt.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-tech text-[#646e71] uppercase block mb-1">
                      TEAM NAME / CALLSIGN
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="e.g. Iron Clad"
                      className="w-full h-[42px] px-4 rounded-xl bg-[#010101] border border-[#252525] focus:border-[#00e5ff] text-sm text-[#e0e0e0] placeholder-[#444444] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#252525] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-[100px] text-xs font-mono-tech text-[#828b8d] hover:text-[#e0e0e0]"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="h-[42px] px-6 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] text-xs font-mono-tech font-semibold flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
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
