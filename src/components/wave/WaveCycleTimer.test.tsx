import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import WaveCycleTimer from './WaveCycleTimer'

describe('WaveCycleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-14T00:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('counts down and ticks every second', () => {
    render(<WaveCycleTimer endAt="2026-09-14T00:00:03Z" />)

    const timer = screen.getByRole('timer')
    expect(timer).toHaveTextContent('00d')
    expect(timer).toHaveTextContent('03s')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(timer).toHaveTextContent('02s')
  })

  it('shows a completed message once the wave has ended', () => {
    render(<WaveCycleTimer endAt="2026-09-13T23:59:59Z" />)
    expect(screen.getByText(/wave has ended/i)).toBeInTheDocument()
  })
})
