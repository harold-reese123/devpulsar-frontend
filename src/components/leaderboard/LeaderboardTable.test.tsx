import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { api } from '@/utils/api'
import { mockLeaderboard } from '@/mocks/leaderboard'
import type { LeaderboardScope } from '@/types/leaderboard'
import LeaderboardTable from './LeaderboardTable'

vi.mock('@/utils/api', () => ({
  api: { get: vi.fn() },
}))

describe('LeaderboardTable', () => {
  it('shows the current wave leaderboard by default, then switches to all-time', async () => {
    vi.mocked(api.get).mockImplementation((_url, config) => {
      const scope = (config as { params: { scope: LeaderboardScope } }).params.scope
      return Promise.resolve({ data: mockLeaderboard[scope] })
    })

    render(<LeaderboardTable />)

    const [firstWaveEntry] = mockLeaderboard.wave
    await waitFor(() => {
      expect(screen.getByText(new RegExp(String(firstWaveEntry.points)))).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /all-time/i }))

    const [firstAllTimeEntry] = mockLeaderboard['all-time']
    await waitFor(() => {
      expect(screen.getByText(firstAllTimeEntry.githubUsername!)).toBeInTheDocument()
    })
  })
})
