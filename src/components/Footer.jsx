import React from 'react'
import { ArrowUp, Mail, Globe, MapPin, ExternalLink } from 'lucide-react'

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GitHubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}

export default function Footer({ playBeep }) {
  const scrollToTop = () => {
    playBeep?.(750, 0.05)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#050811] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 z-20">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        
        {/* Top Tier: Club Identity & Links */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-12 border-b border-cyan-500/15">
          <div className="max-w-[460px]">
            {/* Official Logo Brand */}
            <div className="flex items-center gap-3">
              <img
                src="/logoWhite.png"
                alt="ROBOTiX Club"
                className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]"
              />
              <span className="font-orbitron text-xl tracking-wider text-white font-bold">
                ROBOTiX <span className="text-cyan-400">CLUB</span>
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-gray-300 font-exo leading-relaxed">
              Official robotics and autonomous systems technical student body of National Institute of Technology, Raipur. Organizing Robofest under the aegis of <span className="text-cyan-300 font-medium">Anantya</span>, cultivating robotics, AI, and embedded hardware culture since inception.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-exo text-gray-400">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>G.E. ROAD, RAIPUR, CHHATTISGARH — 492010</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-exo">
            {/* Contests */}
            <div className="flex flex-col gap-2.5">
              <span className="text-cyan-400 font-orbitron tracking-wider uppercase text-[10px] font-bold">
                FLAGSHIP EVENTS
              </span>
              <a href="#robothon" className="text-gray-300 hover:text-cyan-300 transition-colors">
                Robothon 24H
              </a>
              <a href="#arena" className="text-gray-300 hover:text-cyan-300 transition-colors">
                RoboWar Titan
              </a>
              <a href="#arena" className="text-gray-300 hover:text-cyan-300 transition-colors">
                RoboRace Speed
              </a>
              <a href="#arena" className="text-gray-300 hover:text-cyan-300 transition-colors">
                Vibe Coding
              </a>
              <a href="#arena" className="text-gray-300 hover:text-cyan-300 transition-colors">
                RoboQuiz
              </a>
            </div>

            {/* Official Portals */}
            <div className="flex flex-col gap-2.5">
              <span className="text-cyan-400 font-orbitron tracking-wider uppercase text-[10px] font-bold">
                OFFICIAL PORTALS
              </span>
              <a 
                href="https://robotix.nitrr.ac.in/robofest" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>NITRR Portal</span>
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a 
                href="https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>Unstop Registration</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a href="#schedule" className="text-gray-300 hover:text-cyan-300 transition-colors">
                Itinerary Matrix
              </a>
              <a href="#register" className="text-gray-300 hover:text-cyan-300 transition-colors">
                Delegate Pass
              </a>
            </div>

            {/* Social Matrix */}
            <div className="flex flex-col gap-2.5">
              <span className="text-cyan-400 font-orbitron tracking-wider uppercase text-[10px] font-bold">
                COMMUNITY & CHANNELS
              </span>
              <a 
                href="https://instagram.com/robotix_nitrr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-cyan-400" />
                <span>@robotix_nitrr</span>
              </a>
              <a 
                href="https://linkedin.com/company/robotix-club-nit-raipur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn Org</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <GitHubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub Org</span>
              </a>
              <a 
                href="mailto:robotix@nitrr.ac.in" 
                className="text-gray-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>robotix@nitrr.ac.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-exo text-gray-400">
          <div>
            <span>© 2026 ROBOTiX CLUB, NIT RAIPUR. ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0f1e] border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,212,255,0.2)]"
          >
            <span className="font-orbitron text-[11px]">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  )
}
