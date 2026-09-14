interface RankBadgeProps {
  rank: number
}

const MEDAL_STYLE: Record<number, string> = {
  1: 'bg-yellow-400 text-yellow-900',
  2: 'bg-gray-300 text-gray-700',
  3: 'bg-amber-600 text-amber-50',
}

function RankBadge({ rank }: RankBadgeProps) {
  const medalClass = MEDAL_STYLE[rank]

  if (medalClass) {
    return (
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${medalClass}`}
      >
        {rank}
      </span>
    )
  }

  return <span className="flex h-7 w-7 items-center justify-center text-sm font-medium text-gray-500">#{rank}</span>
}

export default RankBadge
