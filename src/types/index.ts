/**
 * ============================================================================
 * ROBOFEST '26 — TYPESCRIPT CONTRACTS & DATA ARCHITECTURE
 * File: src/types/index.ts
 * Description: Central TypeScript type definitions, interfaces, and state contracts
 *              used across all UI components, 3D scenes, and Canvas motion simulators.
 * ============================================================================
 */

/**
 * Scan point representing an interactive waypoint / milestone on the simulation grid.
 */
export interface ScanPoint {
  /** Relative horizontal coordinate normalized between 0.0 and 1.0 */
  x: number
  /** Relative vertical coordinate normalized between 0.0 and 1.0 */
  y: number
  /** Display label for the waypoint (e.g. "GATE_01", "INCLINE_RAMP") */
  label: string
  /** Real-time engineering status (e.g. "LOCKED", "TRAVERSED", "OPTIMAL") */
  status: string
}

/**
 * Metric key-value pair for contest hardware/software telemetry readouts.
 */
export interface TelemetryItem {
  /** Telemetry parameter name (e.g., "COMPUTE", "KINEMATICS", "PURSE") */
  label: string
  /** Formatted telemetry readout value (e.g., "Jetson Nano", "₹30,000") */
  val: string
}

/**
 * ContestProtocol defines the full specification of an engineering gauntlet competition.
 */
export interface ContestProtocol {
  /** Unique programmatic identifier (e.g. "aerovision", "mechagauntlet") */
  id: string
  /** Protocol code badge (e.g. "01 // PROTOCOL") */
  code: string
  /** Category taxonomy tag (e.g. "AERIAL EDGE AI", "DISASTER RESCUE SLAM") */
  tag: string
  /** Primary competition display title (e.g. "AeroVision") */
  title: string
  /** Operational subhead / role description (e.g. "Autonomous AI Drone Grand Prix") */
  role: string
  /** Concise summary of contest requirements and guidelines */
  summary: string
  /** Grid of 4 technical specification metrics */
  telemetry: TelemetryItem[]
  /** Header label for the motion graphic simulation matrix */
  radarLabel: string
  /** Array of interactive waypoints plotted on the simulation canvas */
  scanPoints: ScanPoint[]
}

/**
 * Props shared across all 4 dedicated 60 FPS motion graphics canvas simulators.
 */
export interface SimulatorProps {
  /** Current active competition protocol data */
  current: ContestProtocol
  /** Callback triggered when a waypoint is clicked */
  onPointClick: (pt: { label: string; status: string }) => void
  /** Optional audio feedback synthesizer trigger */
  playBeep?: (freq?: number, duration?: number) => void
}

/**
 * Floating dust ember particle used in the perimeter flame scattering physics.
 */
export interface EmberParticle {
  /** Horizontal canvas coordinate in pixels */
  x: number
  /** Vertical canvas coordinate in pixels */
  y: number
  /** Horizontal drift velocity */
  vx: number
  /** Upward floating velocity (negative Y) */
  vy: number
  /** Particle radius in pixels */
  size: number
  /** Opacity / alpha value (1.0 to 0.0) */
  alpha: number
  /** Fade-out decay rate per frame */
  decay: number
  /** Spectral color hex string */
  color: string
  /** Sinusoidal wind sway oscillation frequency */
  wobbleSpeed: number
  /** Initial radian phase offset for natural randomness */
  wobbleOffset: number
}

/**
 * Props for the GhostFlameBorder component.
 */
export interface GhostFlameBorderProps {
  /** Enclosed React child elements */
  children: React.ReactNode
  /** Additional Tailwind or custom CSS class names */
  className?: string
  /** Border corner radius in pixels (default: 16) */
  radius?: number
  /** Visual flame and ember density */
  intensity?: 'subtle' | 'medium' | 'high'
  /** Toggle whether scattering dust embers should be generated */
  showEmbers?: boolean
}

/**
 * Props for Hero section.
 */
export interface HeroProps {
  /** Callback to trigger the delegate registration modal */
  onRegisterClick: (eventTitle?: string) => void
  /** UI synthesizer beep audio trigger */
  playBeep?: (freq?: number, duration?: number) => void
}

/**
 * Props for Navigation Header.
 */
export interface HeaderProps {
  /** Open delegate registration modal */
  onRegisterClick: () => void
  /** Whether Web Audio synthesizer clicks are unmuted */
  soundEnabled: boolean
  /** State updater to toggle audio feedback */
  setSoundEnabled: (enabled: boolean) => void
  /** Synthesizer audio beep player */
  playBeep?: (freq?: number, duration?: number) => void
}

/**
 * Registration form state data structure.
 */
export interface RegistrationFormData {
  /** Attendee full name */
  name: string
  /** University or institutional affiliation */
  college: string
  /** Selected competition event track */
  selectedEvent: string
  /** Cryptographic alphanumeric pass identifier (e.g. "RF26-0842") */
  passId: string
}
