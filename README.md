# ROBOFEST 2026 — Official Landing Page
### Flagship Autonomous Robotics & Combat Spectacle by ROBOTiX Club, NIT Raipur

An elite, high-performance, responsive web portal for **Robofest 2026**, the annual flagship robotics festival hosted by the **ROBOTiX Club** at the **National Institute of Technology (NIT), Raipur** under the aegis of **Anantya**.

Designed following the **AWE — Robot Observatory After Midnight** design philosophy, departing from generic techfest templates to deliver a museum-grade, dark-gallery autonomous systems experience.

---

## 📋 Submission Dossier

### 1. Live Website
- **Deployment Ready:** Configured for one-click deployment on **Vercel**, **Netlify**, or **GitHub Pages**.
- To run locally:
  ```bash
  npm install
  npm run dev
  ```
  Open `http://localhost:5173`

### 2. GitHub Repository
- Source repository initialized in this project directory.
- To link and push to your GitHub account:
  ```bash
  git remote add origin https://github.com/<your-username>/robofest-2026.git
  git branch -M main
  git push -u origin main
  ```

### 3. Chosen Theme & Design Philosophy
- **Theme:** **AWE — Robot Observatory After Midnight**
- **Aesthetic Concept:** An autonomous systems laboratory operating after hours. The design pairs a deep `#010101` Void Canvas with recessed `#16191b` Machine Wells, 1px `#252525` Hairline Ash structural grids, and `#1f1f23` Charcoal Control navigation pills with `#646e71` numeric markers.
- **Typography Pairing:**
  - **Monumental Display:** *Cormorant Garamond* (Office Times Round substitute) at large scale with negative tracking (`-3%`) for a ceremonial, authoritative voice.
  - **Data & Telemetry:** *IBM Plex Mono* (ABC Laica Mono substitute) for micro-coordinates, step indicators, and flight readouts.
  - **Interface & Reading:** *Inter* (Messina Sans substitute) at 16px/1.4 for clean technical prose.
- **Color Discipline:** The UI chrome remains strictly monochrome; vibrant cyan (`#00e5ff`) and electric accents are reserved exclusively for the 3D WebGL robotic viewport, active sensor pulses, and interactive status badges.

### 4. Project Description & Architectural Choices
- **3D Interactive Kinetic Gyroscope:** Built with Three.js, rendering an interactive robotic core featuring concentric polyhedral gimbal rings (Icosahedron, Torus, Dodecahedron) with real-time mouse-orientation physics, wireframe toggling, and velocity controls.
- **Curated Arena Competitions (9 Events):**
  - *RoboWar: Titan Clash* (Flagship combat robotics in an armored 8mm polycarbonate cage)
  - *RoboSoccer: Cyber Kickoff* (1v1 and 2v2 tactical turf showdown)
  - *RoboRace: Apex Circuit* (Precision obstacle time trials)
  - *Robothon: 24H Simulation Matrix* (ROS 2 / Gazebo non-stop challenge)
  - *Vibe Coding: Embedded Nexus* (Bare-metal microcontroller bug-triage)
  - *AeroVision: Autonomous AI Drone Grand Prix* (Edge AI neon-gate circuit)
  - *Mecha Gauntlet: Quadruped & Bipedal Agility* (Legged robot kinematics)
  - *NeuroBotix: Mind & Gesture Arena* (BCI EEG & OpenCV hand-gesture manipulation)
  - *Cyber Salvage: Disaster Response SLAM* (LiDAR & thermal smoke maze run)
- **Interactive Blueprint Inspection:** Every event card features an expandable modal detailing weight classes, power limits, arena dimensions, safety rules, and coordinator contacts.
- **Interactive Pass Generator:** Real-time holographic delegate pass with barcode, instant student credential generation, and confetti celebration.
- **Auditory Telemetry:** Built-in Web Audio API synthesizer providing subtle, non-intrusive sound feedback for instrument buttons.
- **Responsive Navigation:** Floating section navigation pills with live counters `(09)`, `(03)`, `(01)` that track user scrolling.

### 5. Disclosure of AI Tools, Templates & Prebuilt Components
- **AI Pairing Assistant:** Developed with Google Antigravity Agentic Assistant for code architecture, component scaffolding, and responsive design execution.
- **Design Reference:** Design tokens, layout principles, and component patterns inspired by the AWE Network Design System (`awenetwork.ai`).
- **Icons & Graphics:** Clean SVG vectors and `lucide-react` icons.
- **3D Rendering:** `three.js` (WebGL).
- **Styling:** Tailwind CSS v4 with custom CSS variables matching AWE tokens.
- **Celebration FX:** `canvas-confetti`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative component UI and state management |
| **Vite 6** | Ultra-fast build pipeline and HMR |
| **Tailwind CSS v4** | Token-based responsive utility styling |
| **Three.js** | 3D WebGL robotic core visualization |
| **Web Audio API** | Procedural UI telemetry sound effects |
| **Lucide Icons** | Minimalist technical iconography |
| **Canvas Confetti** | Celebration particle effects for registration |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v26)
- npm or pnpm

### Installation
```bash
git clone <repo-url>
cd robofest-landing-page
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🏛️ Credits & Acknowledgements
- **ROBOTiX Club**, National Institute of Technology Raipur
- **Anantya**, Annual Techno-Entrepreneurship Summit
- Official Reference: [https://robotix.nitrr.ac.in/robofest](https://robotix.nitrr.ac.in/robofest)
