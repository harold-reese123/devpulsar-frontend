import type { WaveCycle } from '@/types/wave'

export const mockCurrentWave: WaveCycle = {
  id: 'wave-12',
  label: 'Wave 12',
  status: 'active',
  startAt: '2026-09-01T00:00:00Z',
  endAt: '2026-09-29T00:00:00Z',
  totalPointsDistributed: 560,
  totalRewardsUsdc: '850.00',
  participantCount: 5,
}

export const mockWaveHistory: WaveCycle[] = [
  {
    id: 'wave-11',
    label: 'Wave 11',
    status: 'completed',
    startAt: '2026-08-04T00:00:00Z',
    endAt: '2026-09-01T00:00:00Z',
    totalPointsDistributed: 2400,
    totalRewardsUsdc: '3200.00',
    participantCount: 8,
  },
  {
    id: 'wave-10',
    label: 'Wave 10',
    status: 'completed',
    startAt: '2026-07-07T00:00:00Z',
    endAt: '2026-08-04T00:00:00Z',
    totalPointsDistributed: 1900,
    totalRewardsUsdc: '2500.00',
    participantCount: 6,
  },
]
