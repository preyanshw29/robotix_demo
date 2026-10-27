import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { QrCode, ArrowUpRight, X, Download } from 'lucide-react'
import { CONTESTS } from './EventsSection'

export default function RegistrationSection({ initialEvent, isModalOpen, setIsModalOpen, playBeep }) {
  const [formData, setFormData] = useState({
    name: 'Kshitij Verma',
    college: 'NIT Raipur',
    selectedEvent: initialEvent || 'AeroVision',
    passId: 'RF26-0842',
  })
  const [submitted, setSubmitted] = useState(false)

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
      colors: ['#e0e0e0', '#646e71', '#ffffff'],
    })
  }

  return (
    <section id="register" className="relative w-full py-14 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] text-[13px] font-mono-nav">
        <span className="text-[#e0e0e0]">03 // REGISTRATION</span>
        <span className="text-[#646e71]">DELEGATE CREDENTIAL</span>
      </div>

      {/* Feature Module Heading */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
            Acquire delegate credentials.
          </h2>
          <p className="mt-2 text-[#828b8d] text-base leading-[1.4] max-w-[500px]">
            Generate official cryptographic pass for observation bays and technical gauntlets.
          </p>
        </div>

        <button
          onClick={() => {
            playBeep?.(900, 0.05)
            setIsModalOpen(true)
          }}
          className="h-[38px] px-6 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] text-[#e0e0e0] text-[13px] font-mono-nav tracking-[1.04px] border border-[#252525] hover:border-[#828b8d] transition-colors cursor-pointer self-start sm:self-auto"
        >
          CUSTOMIZE PASS
        </button>
      </div>

      {/* Contained Media Well (16px radius, #16191b well, 1px #252525 hairline border) */}
      <div className="mt-8 rounded-2xl bg-[#16191b] border border-[#252525] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Pass Visual */}
        <div className="w-full max-w-[380px] rounded-2xl border border-[#252525] bg-[#010101] p-5 relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#252525]">
            <span className="text-[11px] font-mono-nav text-[#e0e0e0]">
              DELEGATE PASS // '26
            </span>
            <span className="text-[11px] font-mono-nav text-[#646e71]">
              {formData.passId}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2px] block">
                OPERATIVE
              </span>
              <span className="text-base font-medium text-[#e0e0e0] block mt-0.5">
                {formData.name || 'DELEGATE OPERATIVE'}
              </span>

              <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2px] block mt-2">
                AFFILIATION
              </span>
              <span className="text-xs text-[#828b8d] block mt-0.5">
                {formData.college || 'NIT Raipur'}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[#16191b] border border-[#252525]">
              <QrCode className="w-12 h-12 text-[#e0e0e0]" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#252525] flex items-center justify-between">
            <span className="text-[11px] font-mono-nav text-[#646e71]">
              TRACK: {formData.selectedEvent}
            </span>
            <div className="flex gap-0.5 h-5 items-end">
              {[3, 6, 2, 5, 7, 3, 6, 4, 7, 3, 6].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h * 2.5}px` }}
                  className="w-[2px] bg-[#646e71] inline-block"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="flex-1 max-w-[420px]">
          <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2.4px]">
            PROTOCOL ACCESS
          </span>
          <h3 className="text-xl font-semibold text-[#e0e0e0] mt-1">
            Immediate Accreditation
          </h3>
          <p className="mt-2 text-sm text-[#828b8d] leading-[1.4]">
            Delegates receive access to observation decks, telemetry logs, and keynote stages with zero entry barriers.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-[38px] px-5 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] border border-[#252525] text-[#e0e0e0] text-[13px] font-mono-nav tracking-[1.04px] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>ISSUE PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#646e71]" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010101]/85 backdrop-blur-md">
          <div className="relative w-full max-w-[480px] rounded-2xl bg-[#16191b] border border-[#252525] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#252525]">
              <span className="text-xs font-mono-nav text-[#e0e0e0]">
                DELEGATE REGISTRATION // ROBOFEST '26
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#1f1f23] flex items-center justify-center text-[#828b8d] hover:text-[#e0e0e0]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-6 flex flex-col items-center text-center">
                <span className="text-xs font-mono-nav text-[#e0e0e0] uppercase">
                  CREDENTIAL ISSUED // {formData.passId}
                </span>
                <p className="text-xs text-[#828b8d] mt-2">
                  Assigned to {formData.name} for {formData.selectedEvent}.
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="h-[36px] px-4 rounded-[100px] bg-[#1f1f23] text-[#e0e0e0] text-xs font-mono-nav flex items-center gap-2 border border-[#252525]"
                  >
                    <Download className="w-3 h-3" />
                    <span>PRINT / PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setIsModalOpen(false)
                    }}
                    className="h-[36px] px-4 rounded-[100px] bg-[#e0e0e0] text-[#010101] text-xs font-mono-nav font-medium"
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
                  <label className="text-[#646e71] block mb-1">DESIGNATED PROTOCOL</label>
                  <select
                    value={formData.selectedEvent}
                    onChange={(e) => setFormData({ ...formData, selectedEvent: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-[#010101] border border-[#252525] focus:border-[#e0e0e0] text-[#e0e0e0] focus:outline-none"
                  >
                    {CONTESTS.map((c) => (
                      <option key={c.id} value={c.title} className="bg-[#16191b]">
                        {c.title} — {c.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2 pt-3 border-t border-[#252525] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-[#646e71] hover:text-[#e0e0e0]"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="h-[36px] px-5 rounded-[100px] bg-[#1f1f23] border border-[#252525] hover:border-[#828b8d] text-[#e0e0e0] font-medium"
                  >
                    CONFIRM PASS
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
