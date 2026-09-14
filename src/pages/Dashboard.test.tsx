import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('prompts wallet connection when disconnected', () => {
    render(<Dashboard />)
    expect(screen.getByText(/connect your wallet/i)).toBeInTheDocument()
  })
})
