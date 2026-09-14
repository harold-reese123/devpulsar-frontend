import { useContributions } from '@/hooks/useContributions'
import PRCard from './PRCard'

interface ContributionFeedProps {
  address: string
}

function ContributionFeed({ address }: ContributionFeedProps) {
  const { contributions, isLoading, error } = useContributions(address)

  if (isLoading) {
    return <p className="text-gray-500">Loading contributions...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (contributions.length === 0) {
    return <p className="text-gray-500">No merged pull requests tracked yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {contributions.map((contribution) => (
        <PRCard key={contribution.id} contribution={contribution} />
      ))}
    </ul>
  )
}

export default ContributionFeed
