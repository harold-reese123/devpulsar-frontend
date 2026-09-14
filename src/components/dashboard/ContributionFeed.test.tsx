import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockContributions } from '@/mocks/contributions'
import ContributionFeed from './ContributionFeed'

describe('ContributionFeed', () => {
  it('shows a loading state then renders mock contributions', async () => {
    render(<ContributionFeed address="GABC123" />)

    expect(screen.getByText(/loading contributions/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(mockContributions[0].title)).toBeInTheDocument()
    })

    for (const contribution of mockContributions) {
      expect(screen.getByText(contribution.title)).toBeInTheDocument()
    }
  })
})
