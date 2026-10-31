# ROBOFEST 2026: Official Landing Page

> **Theme: "AWE — Robot Observatory After Midnight"**
> Submission for **ROBOTiX Club Recruitment 2026 · Web & App Development Domain · Round 1**
> ROBOTiX Club, NIT Raipur

| | |
|---|---|
| **Live website** | robotixdemo77.vercel.app |
| **GitHub repository** | https://github.com/preyanshw29/robotix_demo |
| **Candidate** | `Priyanshu Tomar` · `3rd Sem` · Electrical Engineering, NIT Raipur |

---

## 1. Theme

**AWE: Robot Observatory After Midnight.**

Robotics events usually get neon-cyan "cyberpunk" treatment. I went the other way: a quiet, dark, minimal observatory where the machines are the only thing glowing. The site reads like the control room of a night-time observatory. Everything is a telemetry readout, a coordinate, or a waypoint. The robot is the subject, not the decoration.

- **Void Canvas** `#010101` background
- **Machine Well** `#16191b` cards
- **Charcoal Control** `#1f1f23` nav pills
- **Hairline Ash** `#252525` 1px grid lines
- **Porcelain** `#e0e0e0` primary text
- **Muted Steel** `#828b8d` / **Faint Steel** `#646e71` secondary text, coordinates, counters

No drop shadows anywhere. Depth comes from 1px hairlines and layering only.

**Typography:** Cormorant Garamond for display headlines, Inter for interface and body text, IBM Plex Mono for telemetry, coordinates and navigation. (Chosen as open substitutes for licensed typefaces.)

---

## 2. About the Project

A responsive landing page for **ROBOFEST 2026**, the annual robotics festival hosted by ROBOTiX Club, NIT Raipur. It is a frontend-only build with no backend, as the brief allows.

### Brief checklist

| Requirement | Where it is |
|---|---|
| Hero section with headline and CTA | Large display type, interactive 3D robotic core, register CTA |
| About Robofest | About section with telemetry-style metrics |
| At least 3 robotics events | **4** original events (below) plus an interactive radar simulator |
| Registration section with CTA | Registration section with event details and a pass-issuance modal |
| Footer with ROBOTiX Club branding | Footer with ROBOTiX / NIT Raipur coordinates and links |
| Responsive on desktop and mobile | See Section 5 |

### Events

| Event | Concept |
|---|---|
| **AeroVision** | Autonomous drone racing |
| **Mecha Gauntlet** | Quadruped and biped agility course |
| **NeuroBotix** | Brainwave and gesture-controlled robotics |
| **Cyber Salvage** | Subterranean search-and-rescue with SLAM |

All four are original contest concepts written for this site.

---

## 3. Features

- **Interactive 3D hero:** a gyroscopic robotic core rendered in WebGL with Three.js.
- **3D orbit gallery:** contest placards orbit in 3D, scale up on hover, and open the registration modal on click.
- **Radar waypoint simulator:** an interactive simulator in the Events section.
- **Delegate pass generator:** registering issues a printable pass with a barcode and an `RF26-XXXX` ID. It supports print and save-as-PDF, and fires a confetti celebration on success.
- **Procedural sound effects:** button and interaction feedback synthesised with the native Web Audio API (no audio files), with a toggle in the header.
- **Telemetry-style UI language:** monospace coordinates, counters and hairline grids throughout.

---

## 4. Design Choices

1. **Restraint over spectacle.** One dark palette, three typefaces, no shadows. The 3D elements stand out because nothing else competes with them.
2. **Observatory metaphor, applied consistently.** Coordinates, waypoints, telemetry and a radar replace the usual generic "tech" icons.
3. **Interaction with a purpose.** The pass generator turns the registration CTA into something tangible instead of a plain form.
4. **Sound is opt-in and synthesised.** Web Audio keeps the bundle light, and the header toggle means it never ambushes anyone.

---

## 6. Tech Stack

| Area | Tools |
|---|---|
| Framework | React 19, TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| UI utilities | shadcn/ui project structure, Lucide Icons, clsx, tailwind-merge |
| Effects | canvas-confetti |
| Audio | Native Web Audio API |

---

## 7. AI Tools, Templates and Prebuilt Components (Disclosure)

- **AI tools:** Antigravity AI Assistant helped with design system implementation, component composition and responsive optimisation. `<Add any other AI tool you used, e.g. ChatGPT, Claude, Copilot, and what for>`
- **Templates:** No page template was used. The layout, theme, events and copy are original to this project.
- **Prebuilt components and libraries:** the shadcn/ui structure and the open-source libraries listed in Section 6.
- **Assets:** typefaces are open substitutes (Google Fonts). All event concepts and text are original.

I can explain the structure and logic of every part of this codebase.

---

## 8. Run Locally

```bash
git clone https://github.com/preyanshw29/robotix_demo.git
cd robotix_demo
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

---


## 🛠️ Tech Stack & Directory Layout

```
robofest-landing-page/
├── components.json         # shadcn configuration
├── tsconfig.json           # TypeScript configuration with @/* alias
├── vite.config.js          # Vite 6 config with Tailwind v4 & Three chunking
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── 3d-orbit-gallery.tsx   # 3D Orbit Gallery (8 contest placards)
│   │   │   └── demo.tsx               # Standalone demo component
│   │   ├── AboutSection.tsx           # Telemetry metrics
│   │   ├── EventsSection.tsx          # 4 Creative Contests + Interactive Radar
│   │   ├── Footer.tsx                 # AWE link cluster & NITRR coordinates
│   │   ├── Header.tsx                 # 76px nav with #1f1f23 pills & SFX toggle
│   │   ├── Hero.tsx                   # Monumental display + 3D viewport
│   │   ├── InteractivePass.tsx        # Delegate pass generator & modal
│   │   ├── RegistrationSection.tsx    # Event details + pass issuance modal
│   │   └── ThreeScene.tsx             # Interactive gyroscopic robotic core
│   ├── lib/
│   │   └── utils.ts                   # shadcn cn() helper
│   ├── App.tsx                        # Root layout
│   ├── index.css                      # AWE CSS tokens
│   └── main.tsx                       # React 19 root
```
