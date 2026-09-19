import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/utils/api'
import { mockRewardsSummary } from '@/mocks/rewards'
import { useWalletStore } from '@/store/walletStore'
import Rewards from './Rewards'

vi.mock('@/utils/api', () => ({
  api: { get: vi.fn() },
}))

describe('Rewards page', () => {
  afterEach(() => {
    useWalletStore.getState().clearSession()
    vi.mocked(api.get).mockReset()
  })

  it('prompts wallet connection when disconnected', () => {
    render(<Rewards />)
    expect(screen.getByText(/connect your wallet/i)).toBeInTheDocument()
  })

  it('loads the claimable balance and history once connected, and the claim button is a no-op stub', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockRewardsSummary })
    useWalletStore.getState().setSession({ address: 'GABC123', walletId: 'freighter' })
    render(<Rewards />)

    const claimButton = await screen.findByRole('button', { name: /claim rewards/i })
    await waitFor(() => expect(claimButton).not.toBeDisabled())

    await act(async () => {
      fireEvent.click(claimButton)
      // claimReward() stub simulates ~600ms of latency; wait it out inside act()
      // so the state update it triggers isn't left dangling outside React's flush.
      await new Promise((resolve) => setTimeout(resolve, 700))
    })

    expect(screen.getByText(/claim submitted \(stub\)/i)).toBeInTheDocument()
  })
})
