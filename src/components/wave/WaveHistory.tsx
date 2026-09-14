import type { WaveCycle } from '@/types/wave'
import { formatDate, formatUsdc } from '@/utils/format'

interface WaveHistoryProps {
  waves: WaveCycle[]
}

function WaveHistory({ waves }: WaveHistoryProps) {
  if (waves.length === 0) {
    return <p className="text-gray-500">No past waves yet.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {waves.map((wave) => (
        <li
          key={wave.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-3"
        >
          <div>
            <p className="font-medium text-gray-900">{wave.label}</p>
            <p className="text-sm text-gray-500">
              {formatDate(wave.startAt)} &ndash; {formatDate(wave.endAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-stellar">{formatUsdc(wave.totalRewardsUsdc)} USDC</p>
            <p className="text-sm text-gray-500">{wave.participantCount} contributors</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WaveHistory
