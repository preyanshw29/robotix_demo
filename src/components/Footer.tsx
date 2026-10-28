import React from 'react'
import { ArrowUp } from 'lucide-react'

export default function Footer({ playBeep }: { playBeep?: (freq?: number, duration?: number) => void }) {
  const scrollToTop = () => {
    playBeep?.(750, 0.05)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#010101] border-t border-[#262130] py-12 px-4 relative z-10">
      <div className="max-w-[940px] mx-auto flex flex-col gap-8">
        
        {/* Upper Row: Identity & Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#262130]">
          <div className="flex items-center gap-3">
            <span className="font-mono-nav text-[13px] text-[#f3e8ff] uppercase">
              ROBOFEST 2026
            </span>
            <span className="font-mono-nav text-[11px] text-[#a855f7]">
              // NIT RAIPUR
            </span>
          </div>

          {/* Links as compact mono labels with 8px gaps */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono-nav">
            <a 
              href="https://robotix.nitrr.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#8e889b] hover:text-[#c084fc] transition-colors"
            >
              NITRR PORTAL
            </a>
            <span className="text-[#3b2d4f]">/</span>
            <a 
              href="https://unstop.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#8e889b] hover:text-[#c084fc] transition-colors"
            >
              UNSTOP
            </a>
            <span className="text-[#3b2d4f]">/</span>
            <a 
              href="https://instagram.com/robotix_nitrr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#8e889b] hover:text-[#c084fc] transition-colors"
            >
              INSTAGRAM
            </a>
            <span className="text-[#3b2d4f]">/</span>
            <a 
              href="mailto:robotix@nitrr.ac.in" 
              className="text-[#8e889b] hover:text-[#c084fc] transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Lower Row: Coordinates & Elevate */}
        <div className="flex items-center justify-between text-[11px] font-mono-nav text-[#8e889b]">
          <span>NIT RAIPUR // 21.2497° N, 81.6050° E</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#8e889b] hover:text-[#c084fc] transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3 text-[#a855f7]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
