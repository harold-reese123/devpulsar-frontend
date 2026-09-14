import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import WalletButton from './WalletButton'

describe('WalletButton', () => {
  it('renders a connect prompt when no wallet is connected', () => {
    render(<WalletButton />)
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
  })
})
