import { formatNumber } from '@/utils/format'

interface PointsBadgeProps {
  points: number
}

function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-stellar/10 px-2.5 py-0.5 text-sm font-semibold text-stellar">
      +{formatNumber(points)} pts
    </span>
  )
}

export default PointsBadge
