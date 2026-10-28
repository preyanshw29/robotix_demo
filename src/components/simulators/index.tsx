import React from 'react'
import { ContestProtocol } from './types'
import AeroVisionSim from './AeroVisionSim'
import MechaGauntletSim from './MechaGauntletSim'
import NeuroBotixSim from './NeuroBotixSim'
import CyberSalvageSim from './CyberSalvageSim'

export * from './types'
export { AeroVisionSim, MechaGauntletSim, NeuroBotixSim, CyberSalvageSim }

export function DynamicContestVisualizer({
  current,
  onPointClick,
  playBeep,
}: {
  current: ContestProtocol
  onPointClick: (pt: { label: string; status: string }) => void
  playBeep?: (freq?: number, duration?: number) => void
}) {
  switch (current.id) {
    case 'aerovision':
      return <AeroVisionSim current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'mechagauntlet':
      return <MechaGauntletSim current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'neurobotix':
      return <NeuroBotixSim current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'cyberneticsalvage':
      return <CyberSalvageSim current={current} onPointClick={onPointClick} playBeep={playBeep} />
    default:
      return <AeroVisionSim current={current} onPointClick={onPointClick} playBeep={playBeep} />
  }
}
