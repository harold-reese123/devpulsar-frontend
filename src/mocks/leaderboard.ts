import type { LeaderboardEntry, LeaderboardScope } from '@/types/leaderboard'

const mockLeaderboardWave: LeaderboardEntry[] = [
  { rank: 1, address: 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37', githubUsername: 'ada-builds', points: 480 },
  { rank: 2, address: 'GBLD5V5DKFVW3TMDQ5YMTHDTQMBEQQTQ2XJVJIXP2K2AYWLHYU2AY6C5', githubUsername: 'okoro-dev', points: 360 },
  { rank: 3, address: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB', points: 300 },
  { rank: 4, address: 'GAHK7EEG2WWHVKDNT4CEQFZGKF2LGDSW2IVM4S5DP42RBW3K6BTODB4A', githubUsername: 'lina-ships', points: 210 },
  { rank: 5, address: 'GDT3CB6IKQV4WBSLXPZMTBUKAAP63KJZ4VKUPNJK6VLM6KPHZKR2FTF7', points: 150 },
]

const mockLeaderboardAllTime: LeaderboardEntry[] = [
  { rank: 1, address: 'GBLD5V5DKFVW3TMDQ5YMTHDTQMBEQQTQ2XJVJIXP2K2AYWLHYU2AY6C5', githubUsername: 'okoro-dev', points: 4120 },
  { rank: 2, address: 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37', githubUsername: 'ada-builds', points: 3860 },
  { rank: 3, address: 'GDT3CB6IKQV4WBSLXPZMTBUKAAP63KJZ4VKUPNJK6VLM6KPHZKR2FTF7', points: 2990 },
  { rank: 4, address: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB', points: 2510 },
  { rank: 5, address: 'GAHK7EEG2WWHVKDNT4CEQFZGKF2LGDSW2IVM4S5DP42RBW3K6BTODB4A', githubUsername: 'lina-ships', points: 1980 },
]

export const mockLeaderboard: Record<LeaderboardScope, LeaderboardEntry[]> = {
  wave: mockLeaderboardWave,
  'all-time': mockLeaderboardAllTime,
}
