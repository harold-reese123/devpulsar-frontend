export type RewardStatus = 'claimable' | 'claimed'

export interface RewardDistribution {
  id: string
  waveId: string
  amountUsdc: string
  status: RewardStatus
  txHash: string | null
  distributedAt: string
}

export interface RewardsSummary {
  claimableUsdc: string
  distributions: RewardDistribution[]
}
