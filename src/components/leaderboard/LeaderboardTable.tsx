import { useState } from 'react'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import type { LeaderboardScope } from '@/types/leaderboard'
import { formatNumber, truncateAddress } from '@/utils/format'
import RankBadge from './RankBadge'

const SCOPES: { value: LeaderboardScope; label: string }[] = [
  { value: 'wave', label: 'Current Wave' },
  { value: 'all-time', label: 'All-Time' },
]

function LeaderboardTable() {
  const [scope, setScope] = useState<LeaderboardScope>('wave')
  const { entries, isLoading, error } = useLeaderboard(scope)

  return (
    <div>
      <div className="mb-4 inline-flex rounded-lg border border-gray-200 bg-white p-1">
        {SCOPES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setScope(option.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              scope === option.value
                ? 'bg-stellar text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading leaderboard...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500">No contributors ranked yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {entries.map((entry) => (
            <li
              key={entry.address}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3"
            >
              <RankBadge rank={entry.rank} />
              <span className="min-w-0 flex-1 truncate font-medium text-gray-900">
                {entry.githubUsername ?? truncateAddress(entry.address)}
              </span>
              <span className="shrink-0 font-semibold text-stellar">
                {formatNumber(entry.points)} pts
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LeaderboardTable
