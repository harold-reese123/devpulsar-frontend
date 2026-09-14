import { useEffect, useState } from 'react'

interface WaveCycleTimerProps {
  endAt: string
}

function getRemainingMs(endAt: string): number {
  return Math.max(new Date(endAt).getTime() - Date.now(), 0)
}

function WaveCycleTimer({ endAt }: WaveCycleTimerProps) {
  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(endAt))

  useEffect(() => {
    setRemainingMs(getRemainingMs(endAt))
    const interval = setInterval(() => setRemainingMs(getRemainingMs(endAt)), 1000)
    return () => clearInterval(interval)
  }, [endAt])

  if (remainingMs <= 0) {
    return <p className="text-lg font-semibold text-gray-500">Wave has ended</p>
  }

  const totalSeconds = Math.floor(remainingMs / 1000)
  const units = [
    { value: Math.floor(totalSeconds / 86400), label: 'd' },
    { value: Math.floor((totalSeconds % 86400) / 3600), label: 'h' },
    { value: Math.floor((totalSeconds % 3600) / 60), label: 'm' },
    { value: totalSeconds % 60, label: 's' },
  ]

  return (
    <div className="flex items-baseline gap-3" role="timer" aria-label="Time remaining in this wave">
      {units.map(({ value, label }) => (
        <span key={label} className="text-2xl font-bold text-gray-900">
          {String(value).padStart(2, '0')}
          <span className="ml-0.5 text-sm font-normal text-gray-500">{label}</span>
        </span>
      ))}
    </div>
  )
}

export default WaveCycleTimer
