import { useEffect, useState } from 'react'

interface WaveProgressProps {
  startAt: string
  endAt: string
}

function getPercentElapsed(startAt: string, endAt: string): number {
  const start = new Date(startAt).getTime()
  const end = new Date(endAt).getTime()
  if (end <= start) return 100
  const percent = ((Date.now() - start) / (end - start)) * 100
  return Math.min(Math.max(percent, 0), 100)
}

function WaveProgress({ startAt, endAt }: WaveProgressProps) {
  const [percent, setPercent] = useState(() => getPercentElapsed(startAt, endAt))

  useEffect(() => {
    setPercent(getPercentElapsed(startAt, endAt))
    // Progress only needs to look fresh, not tick every second like the countdown.
    const interval = setInterval(() => setPercent(getPercentElapsed(startAt, endAt)), 30_000)
    return () => clearInterval(interval)
  }, [startAt, endAt])

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="h-full rounded-full bg-stellar transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">{Math.round(percent)}% through this wave</p>
    </div>
  )
}

export default WaveProgress
