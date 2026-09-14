import { useState } from 'react'
import type { RewardDistribution } from '@/types/reward'
import { formatDate, formatUsdc } from '@/utils/format'
import { getExplorerTxUrl } from '@/utils/stellar'

const PAGE_SIZE = 5

interface RewardHistoryListProps {
  distributions: RewardDistribution[]
}

function RewardHistoryList({ distributions }: RewardHistoryListProps) {
  const [page, setPage] = useState(0)

  if (distributions.length === 0) {
    return <p className="text-gray-500">No reward distributions yet.</p>
  }

  const pageCount = Math.ceil(distributions.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const pageItems = distributions.slice(start, start + PAGE_SIZE)

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {pageItems.map((reward) => (
          <li
            key={reward.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-3"
          >
            <div>
              <p className="font-medium text-gray-900">{reward.waveId}</p>
              <p className="text-sm text-gray-500">{formatDate(reward.distributedAt)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-stellar">{formatUsdc(reward.amountUsdc)} USDC</p>
              {reward.status === 'claimed' && reward.txHash ? (
                <a
                  href={getExplorerTxUrl(reward.txHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 hover:text-stellar hover:underline"
                >
                  View transaction
                </a>
              ) : (
                <span className="text-sm text-amber-600">Claimable</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page + 1} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
            disabled={page >= pageCount - 1}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default RewardHistoryList
