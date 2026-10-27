import React, { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

export default function FAQSection({ playBeep }) {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'Who is eligible to participate in Robofest 2026?',
      a: 'Robofest is open to all bona-fide undergraduate, postgraduate, and diploma students from recognized engineering institutions, universities, and polytechnics across India. Inter-college teams are permitted for simulation and software hackathon tracks.',
    },
    {
      q: 'Can a team or participant register for multiple events?',
      a: 'Yes. Teams are permitted to register for multiple competitions (e.g. RoboWar and RoboRace or Robothon and Vibe Coding), provided the event timelines do not clash. Separate registration is required for each track.',
    },
    {
      q: 'Are ready-made robotic kits or commercial RC cars allowed?',
      a: 'No. Readymade toy cars or pre-assembled commercial hobby kits are strictly prohibited in RoboWar and RoboRace. Chassis, drivetrain geometry, weapon systems, and custom mounting brackets must be fabricated or 3D printed by the team.',
    },
    {
      q: 'Is accommodation and food provided for outstation participants?',
      a: 'Yes. NIT Raipur provides hostel accommodation and campus mess meal passes on a nominal subsidized basis for registered outstation teams during the entire duration of Robofest.',
    },
    {
      q: 'What safety requirements must our combat robot meet during scrutineering?',
      a: 'All bots must feature a prominent, easily accessible manual mechanical kill switch and an active radio fail-safe that cuts all drive and weapon motor power within 1.5 seconds of transmitter signal loss or shut-off. LiPo batteries must be charged inside fireproof LiPo safety bags.',
    },
    {
      q: 'What software tools are needed for the 24H Robothon simulation?',
      a: 'Participants should have laptops configured with Ubuntu 22.04 LTS, ROS 2 Humble Hawksbill, and Gazebo Garden / Isaac Sim. Cloud simulation test environments will also be provided by the ROBOTiX Club technical committee.',
    },
  ]

  const toggleFAQ = (idx) => {
    playBeep?.(850, 0.04)
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="relative w-full py-20 px-4 sm:px-6 max-w-[940px] mx-auto scroll-mt-24">
      
      {/* Process Step Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-[#252525]">
        <div className="flex items-center justify-between text-[13px] font-mono-tech">
          <div className="flex items-center gap-2 text-[#e0e0e0]">
            <span className="text-[#00e5ff]">[05]</span>
            <span className="tracking-[1.04px]">INQUIRIES & REGULATIONS</span>
          </div>
          <span className="text-[#646e71] uppercase tracking-[1.04px]">
            FAQ MATRIX // 06 ITEMS
          </span>
        </div>
      </div>

      {/* Module Heading */}
      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#e0e0e0] leading-[1.2] tracking-[-0.64px]">
          Frequently analyzed protocols and queries.
        </h2>
        <p className="mt-3 text-[#828b8d] text-base leading-[1.4] max-w-[640px]">
          Essential rules, technical specifications, campus logistics, and eligibility guidelines for all teams.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="mt-10 flex flex-col divide-y divide-[#252525] border-y border-[#252525]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={idx} className="py-5">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-tech text-[#646e71] group-hover:text-[#00e5ff] transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-[#e0e0e0] group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#16191b] border border-[#252525] group-hover:border-[#444444] flex items-center justify-center shrink-0 ml-4 transition-colors">
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-[#00e5ff]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#828b8d]" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pl-8 pr-12 text-sm text-[#828b8d] leading-relaxed animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
