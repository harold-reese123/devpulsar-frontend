import type { Contribution } from '@/types/contribution'

export const mockContributions: Contribution[] = [
  {
    id: 'c1',
    repo: 'devpulsar/devpulsar-backend',
    prNumber: 142,
    prUrl: 'https://github.com/devpulsar/devpulsar-backend/pull/142',
    title: 'Add Soroban event listener for wave cycle rollover',
    points: 120,
    status: 'rewarded',
    mergedAt: '2026-08-02T10:15:00Z',
    waveId: 'wave-11',
  },
  {
    id: 'c2',
    repo: 'devpulsar/devpulsar-frontend',
    prNumber: 58,
    prUrl: 'https://github.com/devpulsar/devpulsar-frontend/pull/58',
    title: 'Fix leaderboard pagination off-by-one',
    points: 40,
    status: 'reward_queued',
    mergedAt: '2026-08-20T14:32:00Z',
    waveId: 'wave-12',
  },
  {
    id: 'c3',
    repo: 'devpulsar/devpulsar-contracts',
    prNumber: 21,
    prUrl: 'https://github.com/devpulsar/devpulsar-contracts/pull/21',
    title: 'Optimize claim_reward gas usage',
    points: 200,
    status: 'points_assigned',
    mergedAt: '2026-09-10T09:05:00Z',
    waveId: 'wave-12',
  },
]
