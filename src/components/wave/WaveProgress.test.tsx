import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import WaveProgress from './WaveProgress'

describe('WaveProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-15T00:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('computes the elapsed percentage between start and end', () => {
    render(<WaveProgress startAt="2026-09-10T00:00:00Z" endAt="2026-09-20T00:00:00Z" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  })

  it('clamps to 100% once the wave has ended', () => {
    render(<WaveProgress startAt="2026-09-01T00:00:00Z" endAt="2026-09-10T00:00:00Z" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
