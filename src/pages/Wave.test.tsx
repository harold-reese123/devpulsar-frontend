import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Wave from './Wave'

describe('Wave page', () => {
  it('renders the current wave and past wave history from mock data', async () => {
    render(<Wave />)

    await waitFor(() => {
      expect(screen.getByText('Wave 12')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Wave 11')).toBeInTheDocument()
    })
  })
})
