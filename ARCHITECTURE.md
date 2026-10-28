# 🏛️ ROBOFEST '26 — Codebase & Architecture Dossier

This document provides a clean structural breakdown of the entire Robofest codebase, detailing which file controls which section, animation, motion simulation, and styling layer.

---

## 📁 Directory Structure & File Map

```
robofest-landing-page/
├── src/
│   ├── components/
│   │   ├── simulators/                   # ⚡ 60 FPS Interactive Motion Simulators
│   │   │   ├── AeroVisionSim.tsx         # [AeroVision] 3D optical neon gate corridor & drone telemetry
│   │   │   ├── MechaGauntletSim.tsx      # [Mecha Gauntlet] Quadruped kinematics, terrain profile & gyro
│   │   │   ├── NeuroBotixSim.tsx         # [NeuroBotix] Dual-trace EEG oscilloscope & 6-DOF robotic reticle
│   │   │   ├── CyberSalvageSim.tsx       # [Cyber Salvage] 360° LiDAR ray-cast & FLIR thermal heat beacon
│   │   │   ├── types.ts                  # Protocol data structures & simulator interfaces
│   │   │   └── index.ts                  # Central barrel export & DynamicContestVisualizer selector
│   │   │
│   │   ├── ui/
│   │   │   ├── 3d-orbit-gallery.tsx      # [Hero 3D] Three.js revolving 8-card spiral & cosmic embers
│   │   │   └── demo.tsx                  # Standalone shadcn 3D component demo
│   │   │
│   │   ├── GhostFlameBorder.tsx          # 🔮 [Animation] Undulating flame borders & scattering dust embers
│   │   ├── ThreeScene.tsx                # [Alternative 3D] Three.js autonomous core wireframe scene
│   │   ├── Header.tsx                    # [Section] Sticky 76px Navigation, sound toggle, registration CTA
│   │   ├── Hero.tsx                      # [Section] Monumental typography, dual-mode 3D viewport toggle
│   │   ├── AboutSection.tsx              # [Section] 2-column narrative + 4 square metric cards with physics
│   │   ├── EventsSection.tsx             # [Section] 4 Protocol gauntlets, 3D tilt card, text scramble decrypt
│   │   ├── RegistrationSection.tsx       # [Section] Cryptographic delegate pass generator & modal
│   │   └── Footer.tsx                    # [Section] Coordinates, club links & scroll-to-top control
│   │
│   ├── lib/
│   │   └── utils.ts                      # Standard shadcn Tailwind class merger (`cn`)
│   │
│   ├── App.tsx                           # Master orchestrator, Web Audio synth & floating pill navigation
│   ├── index.css                         # Tailwind CSS v4, Ghost Purple tokens & flame keyframes
│   └── main.tsx                          # React 19 entry point
│
├── ARCHITECTURE.md                       # Comprehensive system architecture dossier
├── components.json                       # shadcn/ui configuration
├── package.json                          # Dependencies & build scripts
├── tsconfig.json                         # TypeScript configuration (`@/*` alias)
└── vite.config.ts                        # Vite bundler configuration
```

---

## 🧩 Architectural Breakdown by Responsibility

### 1. 📄 Page Sections (`src/components/`)
| Component | Responsibility | Key Features |
| :--- | :--- | :--- |
| **`Header.tsx`** | Top bar navigation | Sticky `h-[76px]`, Web Audio synthesizer toggle, section smooth scroll, mobile drawer. |
| **`Hero.tsx`** | Monumental entrance | High-contrast gradient typography, dual-mode 3D toggle (Panoramic Orbit vs Autonomous Core). |
| **`AboutSection.tsx`** | Technical proving ground stats | 2-column editorial balance + 4 true square cards with springy bulge-out hover physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`). |
| **`EventsSection.tsx`** | The 4 engineering contests | Lusion-inspired text scramble/decrypt hook (`useScrambleText`), 3D magnetic cursor tilt with radial spotlight, protocol switcher. |
| **`RegistrationSection.tsx`** | Accreditation & credentialing | Hologram cryptographic pass visual, live attendee name/affiliation customizer, confetti burst, and PDF/print export modal. |
| **`Footer.tsx`** | Portal links & observatory coordinates | Links to NITRR portal, Unstop, Instagram, coordinates `[21.2497° N, 81.6050° E]`, smooth top elevator. |

---

### 2. ⚡ Motion Graphics & Simulators (`src/components/simulators/`)
Each of the 4 engineering contests features its own isolated 60 FPS HTML5 Canvas simulator:

| Simulator | File | Visual & Kinematic Mechanics |
| :--- | :--- | :--- |
| **AeroVision** | `AeroVisionSim.tsx` | 3D perspective wireframe corridor, 4 receding optical neon gates, quadcopter HUD with attitude horizon ladder, ion flame thruster trails, and gate pass-through tracking. |
| **Mecha Gauntlet** | `MechaGauntletSim.tsx` | Multi-surface elevation cross-section (incline ramp, gravel bed, stairs, balance beam), Boston Dynamics-style quadruped robot trotting with 2-segment inverse kinematics, dynamic footfall shockwaves, and IMU stability gyro. |
| **NeuroBotix** | `NeuroBotixSim.tsx` | Dual-trace oscilloscope synthesizing Alpha waves ($\alpha$, 10.2 Hz) and high-frequency Beta bursts ($\beta$, 22.4 Hz), vertical flame FFT spectrum pillars, and a 6-DOF robotic manipulator closing in on micro-manipulation coordinates. |
| **Cyber Salvage** | `CyberSalvageSim.tsx` | Subterranean collapsed labyrinth with a 360° LiDAR ray-cast sweep revealing glowing point-cloud obstacle sparkles, an autonomous rover breadcrumb trail, and an expanding infrared thermal heat beacon. |

---

### 3. 🔮 Special Effects & Particle Physics (`src/components/`)
| Effect | File | Description |
| :--- | :--- | :--- |
| **Ghost Flame Border** | `GhostFlameBorder.tsx` | Renders a procedural harmonic flame contour that undulates along card borders. Continuous dust ember particles spawn along the perimeter and float upward into the dark void, swaying with sinusoidal drift. |
| **3D Orbit Gallery** | `ui/3d-orbit-gallery.tsx` | Three.js / React Three Fiber panoramic spiral. Renders 8 outward-facing contest placards using dynamic 2D canvas textures and an ambient field of 1,100 cosmic star embers in ghost purple/fuchsia. |
| **Synthesizer Audio** | `App.tsx` | Web Audio API sine oscillator providing mechanical acoustic clicks on interactions without audio file dependencies. |

---

### 4. 🎨 Styling & Color Grading (`src/index.css`)
- **Void Black Canvas:** `#010101`
- **Ghost Purple & Spectral Flame Spectrum:**
  - `var(--color-ghost-lilac)`: `#fae8ff` (White-hot lilac crests and laser reticles)
  - `var(--color-ghost-fuchsia)`: `#e879f9` (Electric neon fuchsia borders and ion thrusters)
  - `var(--color-ghost-violet)`: `#d946ef` (Saturated flame core)
  - `var(--color-ghost-purple)`: `#c026d3` (Deep spectral purple)
  - `var(--color-ghost-deep)`: `#701a75` (Rich royal amethyst gradient base)
  - `var(--color-ghost-phantom)`: `#4a044e` (Deep plum shadow)
  - `var(--color-ghost-void)`: `#1f0438` (Degrading smoke edge)
- **Keyframe Animations:**
  - `@keyframes ghostFlamePulse`: Pulsing atmospheric background nebula.
  - `@keyframes ghostBorderDegrade`: Ambient border luminescence drift.
