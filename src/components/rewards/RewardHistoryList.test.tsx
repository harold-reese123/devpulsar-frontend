import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockRewardsSummary } from '@/mocks/rewards'
import RewardHistoryList from './RewardHistoryList'

describe('RewardHistoryList', () => {
  it('paginates distributions and navigates between pages', () => {
    render(<RewardHistoryList distributions={mockRewardsSummary.distributions} />)

    expect(screen.getByText('wave-12')).toBeInTheDocument()
    expect(screen.getByText('wave-8')).toBeInTheDocument()
    expect(screen.queryByText('wave-7')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText('wave-7')).toBeInTheDocument()
    expect(screen.getByText('wave-6')).toBeInTheDocument()
    expect(screen.queryByText('wave-12')).not.toBeInTheDocument()
  })

  it('shows a claimable label for distributions with no transaction hash yet', () => {
    render(<RewardHistoryList distributions={mockRewardsSummary.distributions} />)
    expect(screen.getByText(/claimable/i)).toBeInTheDocument()
  })
})
