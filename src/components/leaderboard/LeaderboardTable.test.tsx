import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockLeaderboard } from '@/mocks/leaderboard'
import LeaderboardTable from './LeaderboardTable'

describe('LeaderboardTable', () => {
  it('shows the current wave leaderboard by default, then switches to all-time', async () => {
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
