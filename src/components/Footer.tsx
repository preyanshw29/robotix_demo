import React from 'react'
import { ArrowUp } from 'lucide-react'

export default function Footer({ playBeep }: { playBeep?: (freq?: number, duration?: number) => void }) {
  const scrollToTop = () => {
    playBeep?.(750, 0.05)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#010101] border-t border-[#252525] py-12 px-4">
      <div className="max-w-[940px] mx-auto flex flex-col gap-8">
        
        {/* Upper Row: Identity & Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#252525]">
          <div className="flex items-center gap-3">
            <span className="font-mono-nav text-[13px] text-[#e0e0e0] uppercase">
              ROBOFEST 2026
            </span>
            <span className="font-mono-nav text-[11px] text-[#646e71]">
              // NIT RAIPUR
            </span>
          </div>

          {/* Links as compact mono labels with 8px gaps */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono-nav">
            <a 
              href="https://robotix.nitrr.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
            >
              NITRR PORTAL
            </a>
            <span className="text-[#252525]">/</span>
            <a 
              href="https://unstop.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
            >
              UNSTOP
            </a>
            <span className="text-[#252525]">/</span>
            <a 
              href="https://instagram.com/robotix_nitrr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
            >
              INSTAGRAM
            </a>
            <span className="text-[#252525]">/</span>
            <a 
              href="mailto:robotix@nitrr.ac.in" 
              className="text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Lower Row: Coordinates & Elevate */}
        <div className="flex items-center justify-between text-[11px] font-mono-nav text-[#646e71]">
          <span>NIT RAIPUR // 21.2497° N, 81.6050° E</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#828b8d] hover:text-[#e0e0e0] transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3 text-[#646e71]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
