export type LeaderboardScope = 'wave' | 'all-time'

export interface LeaderboardEntry {
  rank: number
  address: string
  githubUsername?: string
  points: number
}
