/**
 * ============================================================================
 * ROBOFEST '26 — REGISTRATION & DELEGATE CREDENTIAL SYSTEM
 * File: src/components/RegistrationSection.tsx
 * Description: Delegate pass generation and verification module:
 *              - Real-time cryptographic Pass ID creation ("RF26-XXXX")
 *              - Dynamic QR Code rendering via react-qr-code
 *              - Canvas confetti burst effect upon claim
 *              - Interactive customization modal with contest protocol selector
 *              - Enclosed in animated GhostFlameBorder with drifting embers
 * ============================================================================
 */

import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { QrCode, ArrowUpRight, X, Download, FileText, CheckCircle2 } from 'lucide-react'
import { CONTESTS } from './EventsSection'
import GhostFlameBorder from './GhostFlameBorder'
import type { RegistrationFormData } from '../types'

interface RegistrationProps {
  /** Selected event prefilled from prior section CTA */
  initialEvent: string
  /** Whether modal dialog is visible */
  isModalOpen: boolean
  /** Modal visibility state updater */
  setIsModalOpen: (open: boolean) => void
  /** Synthesizer audio beep feedback trigger */
  playBeep?: (freq?: number, duration?: number) => void
}

/**
 * RegistrationSection Component
 */
export default function RegistrationSection({
  initialEvent,
  isModalOpen,
  setIsModalOpen,
  playBeep,
}: RegistrationProps) {
  // Delegate pass form state
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: 'Kshitij Verma',
    college: 'NIT Raipur',
    selectedEvent: initialEvent || 'AeroVision',
    passId: 'RF26-0842',
  })
  const [submitted, setSubmitted] = useState(false)
  const [modalTab, setModalTab] = useState<'info' | 'register'>('register')

  // Sync selected event when user clicks "REGISTER" inside a specific contest card
  useEffect(() => {
    if (initialEvent) {
      setFormData((prev) => ({ ...prev, selectedEvent: initialEvent }))
    }
  }, [initialEvent])

  const selectedContestData = CONTESTS.find((c) => c.title === formData.selectedEvent) || CONTESTS[0]

  /**
   * Handle delegate pass claim with random pass ID generation & confetti burst
   */
  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    playBeep?.(1200, 0.08)
    const randomId = 'RF26-' + Math.floor(1000 + Math.random() * 9000)
    setFormData((prev) => ({ ...prev, passId: randomId }))
    setSubmitted(true)

    // Spectral purple confetti burst
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

        {/* Pass Visual with Undulating Flames & Scattering Embers */}
        <div className="w-full max-w-[380px]">
          <GhostFlameBorder radius={16} intensity="high" showEmbers={true}>
            <div className="w-full rounded-2xl border border-[#c026d3]/50 bg-gradient-to-b from-[#180e28] via-[#10081c] to-[#07040d] p-5 relative shadow-[0_0_35px_rgba(217,70,239,0.25)] group hover:border-[#e879f9] transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-[#3b0764]/60">
                <span className="text-[11px] font-mono-nav text-[#e879f9] drop-shadow-[0_0_6px_rgba(232,121,249,0.5)]">
                  DELEGATE PASS // '26
                </span>
                <span className="text-[11px] font-mono-nav text-[#c084fc]">
                  {formData.passId}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#0d0718] border border-[#3b0764] flex items-center justify-center p-2">
                  <QrCode className="w-full h-full text-[#c084fc]" />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    {formData.name}
                  </div>
                  <div className="text-xs font-mono-nav text-[#a89cb8]">
                    {formData.college}
                  </div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded-[100px] bg-[#2a1340] border border-[#701a75] text-[10px] font-mono-nav text-[#e879f9]">
                    {formData.selectedEvent}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3b0764]/60 flex items-center justify-between text-[11px] font-mono-nav text-[#a89cb8]">
                <span>VALID: OCT 2026</span>
                <span className="text-[#4ade80] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#4ade80]" /> VERIFIED
                </span>
              </div>
            </div>
          </GhostFlameBorder>
        </div>

        {/* Right Feature Info */}
        <div className="flex-1 flex flex-col justify-between max-w-[420px]">
          <div>
            <div className="text-[12px] font-mono-nav text-[#c084fc] uppercase tracking-wider">
              INCLUDED ACCESS PROTOCOLS
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-[#8e889b]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                <span>All 4 live competitive engineering arenas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                <span>Hardware sandbox & Edge-AI compute clusters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                <span>Keynotes by leading aerospace & robotics pioneers</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#262130] flex items-center gap-3">
            <button
              onClick={() => {
                playBeep?.(1000, 0.05)
                setIsModalOpen(true)
              }}
              className="h-[36px] px-5 rounded-[100px] bg-gradient-to-r from-[#701a75] via-[#4a044e] to-[#2e1065] hover:from-[#a21caf] hover:to-[#581c87] border border-[#e879f9]/50 hover:border-[#fae8ff] text-[#fae8ff] hover:shadow-[0_0_20px_rgba(232,121,249,0.4)] text-[12px] font-mono-nav tracking-[1.04px] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-md"
            >
              <span>CLAIM PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#fae8ff]" />
            </button>
            <span className="text-[11px] font-mono-nav text-[#8e889b]">
              COMPLIMENTARY ADMISSION
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Pass Customization & Event Registration */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-[500px] rounded-2xl bg-[#090510] border border-[#a855f7]/50 shadow-[0_0_50px_rgba(168,85,247,0.35)] p-6 sm:p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#180e28] text-[#fae8ff] flex items-center justify-center hover:bg-[#2a1340] border border-[#3b0764] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Tabs */}
            <div className="flex gap-2 border-b border-[#3b0764] pb-3 mb-6">
              <button
                onClick={() => setModalTab('register')}
                className={`text-xs font-mono-nav px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  modalTab === 'register'
                    ? 'bg-[#2a1340] text-[#fae8ff] border border-[#e879f9]'
                    : 'text-[#a89cb8] hover:text-[#fae8ff]'
                }`}
              >
                PASS CUSTOMIZER
              </button>
              <button
                onClick={() => setModalTab('info')}
                className={`text-xs font-mono-nav px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  modalTab === 'info'
                    ? 'bg-[#2a1340] text-[#fae8ff] border border-[#e879f9]'
                    : 'text-[#a89cb8] hover:text-[#fae8ff]'
                }`}
              >
                TRACK INTEL
              </button>
            </div>

            {modalTab === 'register' ? (
              <form onSubmit={handleClaim} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono-nav text-[#c084fc] uppercase mb-1">
                    Delegate Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-10 px-3 rounded-lg bg-[#180e28] border border-[#3b0764] text-[#fae8ff] text-sm focus:outline-none focus:border-[#e879f9] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-nav text-[#c084fc] uppercase mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    required
                    className="w-full h-10 px-3 rounded-lg bg-[#180e28] border border-[#3b0764] text-[#fae8ff] text-sm focus:outline-none focus:border-[#e879f9] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-nav text-[#c084fc] uppercase mb-1">
                    Selected Gauntlet Track
                  </label>
                  <select
                    value={formData.selectedEvent}
                    onChange={(e) => setFormData({ ...formData, selectedEvent: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#180e28] border border-[#3b0764] text-[#fae8ff] text-sm focus:outline-none focus:border-[#e879f9] transition-colors cursor-pointer"
                  >
                    {CONTESTS.map((c) => (
                      <option key={c.id} value={c.title} className="bg-[#180e28] text-white">
                        {c.title} ({c.tag})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 h-11 rounded-xl bg-gradient-to-r from-[#701a75] via-[#4a044e] to-[#2e1065] hover:from-[#a21caf] hover:to-[#581c87] border border-[#e879f9] text-[#fae8ff] text-xs font-mono-nav tracking-wider font-semibold shadow-[0_0_25px_rgba(232,121,249,0.4)] transition-all cursor-pointer"
                >
                  {submitted ? 'CREDENTIAL UPDATED' : 'MINT DELEGATE CREDENTIAL'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#180e28] border border-[#3b0764]">
                  <div className="text-xs font-mono-nav text-[#e879f9]">{selectedContestData.tag}</div>
                  <h4 className="text-lg font-display text-white mt-1">{selectedContestData.title}</h4>
                  <p className="text-xs text-[#a89cb8] mt-2 leading-relaxed">{selectedContestData.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-nav">
                  {selectedContestData.telemetry.map((t) => (
                    <div key={t.label} className="p-2.5 rounded-lg bg-[#180e28]/50 border border-[#3b0764]/40">
                      <div className="text-[10px] text-[#c084fc]">{t.label}</div>
                      <div className="text-[#fae8ff] font-medium mt-0.5">{t.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
