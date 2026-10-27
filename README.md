# ROBOFEST 2026 — Official Landing Page
### Autonomous Systems Observatory & Robotics Arena | ROBOTiX Club, NIT Raipur

An elite, high-performance, responsive web application for **Robofest 2026**, the annual flagship robotics festival hosted by the **ROBOTiX Club** at the **National Institute of Technology (NIT), Raipur** under the aegis of **Anantya**.

Engineered following the **AWE — Robot Observatory After Midnight** design philosophy (`#010101` Void Canvas, `#16191b` Machine Wells, 1px `#252525` Hairline Ash grids, and `#1f1f23` Charcoal Control navigation pills) with shadcn/ui project structure, TypeScript, and interactive 3D WebGL Three.js orbits.

---

## 📋 Submission Dossier

### 1. Live Website Link
- **Local Development Server:**
  ```bash
  cd C:\Users\priya\.gemini\antigravity\scratch\robofest-landing-page
  npm run dev
  ```
  Open **[http://localhost:5173/](http://localhost:5173/)**
- **Production Build & Preview:**
  ```bash
  npm run build
  npm run preview
  ```
- **Deployment Ready:** Pre-configured with [`vercel.json`](file:///C:/Users/priya/.gemini/antigravity/scratch/robofest-landing-page/vercel.json) for 1-click deployment on **Vercel** or **Netlify**.

---

### 2. GitHub Repository Link
Source code is committed and tracked in local Git. To push to GitHub:
```bash
git remote add origin https://github.com/<your-username>/robofest-2026.git
git branch -M main
git push -u origin main
```

---

### 3. Chosen Theme & Design Philosophy
- **Theme:** **AWE — Robot Observatory After Midnight**
- **Palette & Surfaces:**
  - `Void Canvas` (`#010101`): Infinite dark plane.
  - `Machine Well` (`#16191b`): Recessed 16px radius cards and 3D media bays.
  - `Charcoal Control` (`#1f1f23`): 100px radius navigation pills and compact controls.
  - `Hairline Ash` (`#252525`): 1px architectural grid lines without drop shadows.
  - `Porcelain` (`#e0e0e0`): Primary display typography and icons.
  - `Muted Steel` (`#828b8d`): Secondary explanations and technical body text.
  - `Faint Steel` (`#646e71`): Mono coordinates and numeric counters `(01)`, `(04)`.
- **Typography Pairing:**
  - **Display:** *Cormorant Garamond* (Office Times Round substitute) at monumental size with `-3%` tracking.
  - **Interface & Reading:** *Inter* (Messina Sans substitute) at 16px/1.4 for clean technical prose.
  - **Telemetry & Navigation:** *IBM Plex Mono* (ABC Laica Mono substitute) at 13px with expanded tracking (`1.04px`).

---

### 4. Project Description & Architectural Choices
- **Interactive 3D Revolving Contest Spiral (`3d-orbit-gallery.tsx`):**
  - Integrated into `@/components/ui/3d-orbit-gallery.tsx` within the shadcn directory structure.
  - 8 large orbiting contest placards revolving outward around an ambient coordinate particle sphere.
  - **Tactile Interaction:** Hovering scales the card up (`1.18x`) with cursor feedback. Clicking any card immediately launches the **Event Briefing & Delegate Registration Modal** pre-selected for that contest.
- **4 Original Creative Contests:**
  1. **AeroVision:** Autonomous AI Drone Grand Prix (100% Computer Vision, Jetson/RPi, neon optical gate navigation).
  2. **Mecha Gauntlet:** Quadruped & Bipedal Agility Trial (Dynamic gait transitions, balance beams, stairs).
  3. **NeuroBotix:** Mind-Controlled & Gesture Tele-Operation (OpenBCI EEG brainwaves and CV gesture manipulation).
  4. **Cyber Salvage:** Subterranean Search-and-Rescue SLAM (Zero-visibility maze, LiDAR and thermal mapping).
- **Interactive Radar Waypoint Simulator:** Live 2D telemetry radar with clickable waypoint nodes, live sensor feedback, and real-time contest specs.
- **Instant Cryptographic Delegate Pass:** Real-time pass customizer with dynamic barcode, live ID generator (`RF26-XXXX`), print/PDF capability, and confetti celebration.
- **Audio Feedback Synthesizer:** Native Web Audio API procedural synthesizer for subtle instrument button feedback (toggleable via the top-bar audio switch).
- **Concise Copy:** Stripped of unnecessary filler text; replaced with punchy, museum-grade technical placards.

---

### 5. Disclosure of AI Tools, Templates & Prebuilt Components
- **AI Tooling:** Antigravity AI Assistant was utilized for design system implementation, component composition, and responsive optimization.
- **Design Tokens:** Tokens and component rules derived from the AWE Network Design System (`awenetwork.ai`).
- **Prebuilt Components:** Integrated and adapted `3d-orbit-gallery.tsx` into `@/components/ui/` with custom procedural canvas textures and click event handlers.
- **Libraries Used:** React 19, Three.js, `@react-three/fiber`, `@react-three/drei`, Tailwind CSS v4, Lucide Icons, Canvas-Confetti, clsx, tailwind-merge.

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
