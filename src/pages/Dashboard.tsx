import ContributionFeed from '@/components/dashboard/ContributionFeed'
import { useWallet } from '@/hooks/useWallet'

function Dashboard() {
  const { address, isConnected } = useWallet()

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {isConnected && address ? (
        <div className="mt-6">
          <ContributionFeed address={address} />
        </div>
      ) : (
        <p className="mt-2 text-gray-600">
          Connect your wallet to view your tracked contributions and points.
        </p>
      )}
    </div>
  )
}

export default Dashboard
