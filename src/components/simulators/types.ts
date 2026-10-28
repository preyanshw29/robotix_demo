export interface ContestProtocol {
  id: string
  code: string
  tag: string
  title: string
  role: string
  summary: string
  telemetry: { label: string; val: string }[]
  radarLabel: string
  scanPoints: { x: number; y: number; label: string; status: string }[]
}

export interface SimulatorProps {
  current: ContestProtocol
  onPointClick: (pt: { label: string; status: string }) => void
  playBeep?: (freq?: number, duration?: number) => void
}
