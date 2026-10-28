import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { QrCode, ArrowUpRight, X, Download, FileText, CheckCircle2 } from 'lucide-react'
import { CONTESTS } from './EventsSection'

interface RegistrationProps {
  initialEvent: string
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  playBeep?: (freq?: number, duration?: number) => void
}

export default function RegistrationSection({
  initialEvent,
  isModalOpen,
  setIsModalOpen,
  playBeep,
}: RegistrationProps) {
  const [formData, setFormData] = useState({
    name: 'Kshitij Verma',
    college: 'NIT Raipur',
    selectedEvent: initialEvent || 'AeroVision',
    passId: 'RF26-0842',
  })
  const [submitted, setSubmitted] = useState(false)
  const [modalTab, setModalTab] = useState<'info' | 'register'>('register')

  useEffect(() => {
    if (initialEvent) {
      setFormData((prev) => ({ ...prev, selectedEvent: initialEvent }))
    }
  }, [initialEvent])

  const selectedContestData = CONTESTS.find((c) => c.title === formData.selectedEvent) || CONTESTS[0]

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    playBeep?.(1200, 0.08)
    const randomId = 'RF26-' + Math.floor(1000 + Math.random() * 9000)
    setFormData((prev) => ({ ...prev, passId: randomId }))
    setSubmitted(true)

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#a855f7', '#f3e8ff', '#7e22ce'],
    })
  }

  return (
    <section id="register" className="relative w-full py-14 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262130] text-[13px] font-mono-nav">
        <span className="text-[#f3e8ff]">03 // REGISTRATION</span>
        <span className="text-[#8e889b]">DELEGATE CREDENTIAL</span>
      </div>

      {/* Feature Module Heading */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
            Acquire delegate credentials.
          </h2>
          <p className="mt-2 text-[#8e889b] text-base leading-[1.4] max-w-[500px]">
            Generate official cryptographic pass for observation bays and technical gauntlets.
          </p>
        </div>

        <button
          onClick={() => {
            playBeep?.(900, 0.05)
            setIsModalOpen(true)
          }}
          className="h-[38px] px-6 rounded-[100px] bg-[#16141f] hover:bg-[#231e30] text-[#f3e8ff] text-[13px] font-mono-nav tracking-[1.04px] border border-[#7e22ce]/40 hover:border-[#c084fc] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer self-start sm:self-auto"
        >
          CUSTOMIZE PASS
        </button>
      </div>

      {/* Contained Media Well with Ghost Purple Degrading Glow */}
      <div className="mt-8 rounded-2xl bg-[#13111a] border border-[#2a2436] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        {/* Subtle ghost flame aura in background */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(88,28,135,0.03)_60%,transparent_80%)] blur-2xl pointer-events-none" />

        {/* Pass Visual */}
        <div className="w-full max-w-[380px] rounded-2xl border border-[#7e22ce]/40 bg-[#09070f] p-5 relative shadow-[0_0_30px_rgba(168,85,247,0.15)] group hover:border-[#c084fc] transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#262130]">
            <span className="text-[11px] font-mono-nav text-[#c084fc]">
              DELEGATE PASS // '26
            </span>
            <span className="text-[11px] font-mono-nav text-[#a855f7]">
              {formData.passId}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono-nav text-[#8e889b] uppercase tracking-[2px] block">
                OPERATIVE
              </span>
              <span className="text-base font-medium text-[#f3e8ff] block mt-0.5">
                {formData.name || 'DELEGATE OPERATIVE'}
              </span>

              <span className="text-[10px] font-mono-nav text-[#8e889b] uppercase tracking-[2px] block mt-2">
                AFFILIATION
              </span>
              <span className="text-xs text-[#c084fc] block mt-0.5">
                {formData.college || 'NIT Raipur'}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[#16141f] border border-[#7e22ce]/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <QrCode className="w-12 h-12 text-[#c084fc]" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#262130] flex items-center justify-between">
            <span className="text-[11px] font-mono-nav text-[#8e889b]">
              TRACK: <span className="text-[#f3e8ff]">{formData.selectedEvent}</span>
            </span>
            <div className="flex gap-0.5 h-5 items-end">
              {[3, 6, 2, 5, 7, 3, 6, 4, 7, 3, 6].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h * 2.5}px` }}
                  className="w-[2px] bg-[#a855f7] inline-block"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="flex-1 max-w-[420px] relative z-10">
          <span className="text-[10px] font-mono-nav text-[#c084fc] uppercase tracking-[2.4px]">
            PROTOCOL ACCESS
          </span>
          <h3 className="text-xl font-semibold text-[#e0e0e0] mt-1">
            Immediate Accreditation
          </h3>
          <p className="mt-2 text-sm text-[#8e889b] leading-[1.4]">
            Delegates receive access to observation decks, telemetry logs, and keynote stages with zero entry barriers.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-[38px] px-5 rounded-[100px] bg-gradient-to-r from-[#1f1a2c] to-[#16141f] hover:from-[#2a223d] hover:to-[#1e192b] border border-[#7e22ce]/40 hover:border-[#c084fc] text-[#f3e8ff] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] text-[13px] font-mono-nav tracking-[1.04px] flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <span>ISSUE PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c084fc]" />
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Event Info & Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010101]/90 backdrop-blur-md">
          <div className="relative w-full max-w-[540px] rounded-2xl bg-[#13111a] border border-[#7e22ce]/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(168,85,247,0.2)]">
            
            {/* Modal Header with Event Name */}
            <div className="flex items-center justify-between pb-3 border-b border-[#262130]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-nav text-[#f3e8ff]">
                  {selectedContestData.code} // <span className="text-[#c084fc]">{selectedContestData.title.toUpperCase()}</span>
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#1c152a] border border-[#7e22ce]/30 flex items-center justify-center text-[#8e889b] hover:text-[#f3e8ff] cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Event Info Briefing Box */}
            <div className="mt-4 p-4 rounded-xl bg-[#09070f] border border-[#2a2436]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-nav text-[#c084fc] uppercase tracking-wider">
                  {selectedContestData.tag}
                </span>
                <span className="text-xs font-mono-nav text-[#f3e8ff]">
                  PURSE: <span className="text-[#c084fc] font-bold">{selectedContestData.telemetry.find(t => t.label === 'PURSE')?.val}</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-[#8e889b] leading-relaxed">
                {selectedContestData.summary}
              </p>
              
              <div className="mt-3 pt-3 border-t border-[#262130] grid grid-cols-2 gap-2 text-[11px] font-mono-nav text-[#8e889b]">
                {selectedContestData.telemetry.slice(0, 2).map((t) => (
                  <div key={t.label}>
                    <span>{t.label}: </span>
                    <span className="text-[#f3e8ff]">{t.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {submitted ? (
              <div className="py-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#1c152a] border border-[#a855f7]/60 flex items-center justify-center text-[#c084fc] shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c084fc]" />
                </div>
                <span className="text-xs font-mono-nav text-[#f3e8ff] uppercase tracking-wider">
                  CREDENTIAL ISSUED // {formData.passId}
                </span>
                <p className="text-xs text-[#8e889b] mt-2">
                  Assigned to <span className="text-[#f3e8ff] font-medium">{formData.name}</span> for <span className="text-[#c084fc]">{formData.selectedEvent}</span>.
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="h-[36px] px-4 rounded-[100px] bg-[#1c152a] text-[#f3e8ff] text-xs font-mono-nav flex items-center gap-2 border border-[#7e22ce]/40 hover:border-[#c084fc] cursor-pointer transition-all"
                  >
                    <Download className="w-3 h-3 text-[#c084fc]" />
                    <span>PRINT / PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setIsModalOpen(false)
                    }}
                    className="h-[36px] px-4 rounded-[100px] bg-gradient-to-r from-[#c084fc] to-[#a855f7] hover:from-[#d8b4fe] hover:to-[#c084fc] text-[#010101] text-xs font-mono-nav font-medium cursor-pointer transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <span>CLOSE</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClaim} className="mt-5 flex flex-col gap-4 text-xs font-mono-nav">
                <div>
                  <label className="text-[#646e71] block mb-1">OPERATIVE NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-[#010101] border border-[#252525] focus:border-[#e0e0e0] text-[#e0e0e0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#646e71] block mb-1">AFFILIATION / COLLEGE</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-[#010101] border border-[#252525] focus:border-[#e0e0e0] text-[#e0e0e0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#646e71] block mb-1">SELECTED PROTOCOL CONTEST</label>
                  <select
                    value={formData.selectedEvent}
                    onChange={(e) => setFormData({ ...formData, selectedEvent: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-[#010101] border border-[#252525] focus:border-[#e0e0e0] text-[#e0e0e0] focus:outline-none"
                  >
                    {CONTESTS.map((c) => (
                      <option key={c.id} value={c.title} className="bg-[#16191b]">
                        {c.code} // {c.title} — {c.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2 pt-3 border-t border-[#252525] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-[#646e71] hover:text-[#e0e0e0] cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="h-[36px] px-5 rounded-[100px] bg-[#1f1f23] border border-[#252525] hover:border-[#828b8d] text-[#e0e0e0] font-medium cursor-pointer"
                  >
                    CONFIRM & ISSUE PASS
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
