import type { Contribution, ContributionStatus } from '@/types/contribution'
import { formatDate } from '@/utils/format'
import PointsBadge from './PointsBadge'

const STATUS_LABEL: Record<ContributionStatus, string> = {
  points_assigned: 'Points assigned',
  reward_queued: 'Reward queued',
  rewarded: 'Rewarded',
}

const STATUS_CLASS: Record<ContributionStatus, string> = {
  points_assigned: 'bg-amber-100 text-amber-800',
  reward_queued: 'bg-blue-100 text-blue-800',
  rewarded: 'bg-green-100 text-green-800',
}

interface PRCardProps {
  contribution: Contribution
}

function PRCard({ contribution }: PRCardProps) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0">
        <a
          href={contribution.prUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate font-medium text-gray-900 hover:text-stellar hover:underline"
        >
          {contribution.title}
        </a>
        <p className="mt-1 text-sm text-gray-500">
          {contribution.repo} #{contribution.prNumber} &middot; merged {formatDate(contribution.mergedAt)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASS[contribution.status]}`}
        >
          {STATUS_LABEL[contribution.status]}
        </span>
        <PointsBadge points={contribution.points} />
      </div>
    </li>
  )
}

export default PRCard
