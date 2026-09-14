import type { RewardsSummary } from '@/types/reward'

export const mockRewardsSummary: RewardsSummary = {
  claimableUsdc: '325.50',
  distributions: [
    {
      id: 'r1',
      waveId: 'wave-12',
      amountUsdc: '325.50',
      status: 'claimable',
      txHash: null,
      distributedAt: '2026-09-01T00:00:00Z',
    },
    {
      id: 'r2',
      waveId: 'wave-11',
      amountUsdc: '480.00',
      status: 'claimed',
      txHash: '3a1f9c2e7b5d4860f1e2a9c8d7b6543210fedcba9876543210abcdef1234567',
      distributedAt: '2026-09-02T09:12:00Z',
    },
    {
      id: 'r3',
      waveId: 'wave-10',
      amountUsdc: '150.00',
      status: 'claimed',
      txHash: '8b2e4d6f0a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b',
      distributedAt: '2026-08-05T16:40:00Z',
    },
    {
      id: 'r4',
      waveId: 'wave-9',
      amountUsdc: '90.25',
      status: 'claimed',
      txHash: 'c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6',
      distributedAt: '2026-07-08T11:05:00Z',
    },
    {
      id: 'r5',
      waveId: 'wave-8',
      amountUsdc: '210.75',
      status: 'claimed',
      txHash: 'f1e2d3c4b5a69788796a5b4c3d2e1f0f1e2d3c4b5a69788796a5b4c3d2e1f0f1',
      distributedAt: '2026-06-10T14:30:00Z',
    },
    {
      id: 'r6',
      waveId: 'wave-7',
      amountUsdc: '60.00',
      status: 'claimed',
      txHash: '5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c',
      distributedAt: '2026-05-13T08:15:00Z',
    },
    {
      id: 'r7',
      waveId: 'wave-6',
      amountUsdc: '175.00',
      status: 'claimed',
      txHash: '2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a',
      distributedAt: '2026-04-15T19:50:00Z',
    },
  ],
}
