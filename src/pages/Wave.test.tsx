import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { api } from '@/utils/api'
import { mockCurrentWave, mockWaveHistory } from '@/mocks/wave'
import Wave from './Wave'

vi.mock('@/utils/api', () => ({
  api: { get: vi.fn() },
}))

describe('Wave page', () => {
  it('renders the current wave and past wave history from mock data', async () => {
    vi.mocked(api.get).mockImplementation((url) => {
      if (url === '/wave/current') return Promise.resolve({ data: mockCurrentWave })
      if (url === '/wave/history') return Promise.resolve({ data: mockWaveHistory })
      return Promise.reject(new Error(`Unexpected request: ${url}`))
    })

    render(<Wave />)

    await waitFor(() => {
      expect(screen.getByText('Wave 12')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Wave 11')).toBeInTheDocument()
    })
  })
})
