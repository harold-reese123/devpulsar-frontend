export type ContributionStatus = 'points_assigned' | 'reward_queued' | 'rewarded'

export interface Contribution {
  id: string
  repo: string
  prNumber: number
  prUrl: string
  title: string
  points: number
  status: ContributionStatus
  mergedAt: string
  waveId: string
}
