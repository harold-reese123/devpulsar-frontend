export type WaveStatus = 'active' | 'completed'

export interface WaveCycle {
  id: string
  label: string
  status: WaveStatus
  startAt: string
  endAt: string
  totalPointsDistributed: number
  totalRewardsUsdc: string
  participantCount: number
}
