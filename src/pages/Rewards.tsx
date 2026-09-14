import { useState } from 'react'
import RewardHistoryList from '@/components/rewards/RewardHistoryList'
import { useRewards } from '@/hooks/useRewards'
import { useWallet } from '@/hooks/useWallet'
import { formatUsdc } from '@/utils/format'
import { claimReward } from '@/utils/stellar'

function Rewards() {
  const { address, isConnected } = useWallet()
  const { summary, isLoading, error } = useRewards(address)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimMessage, setClaimMessage] = useState<string | null>(null)

  if (!isConnected || !address) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Rewards</h1>
        <p className="mt-2 text-gray-600">Connect your wallet to view your reward history.</p>
      </div>
    )
  }

  const claimableAmount = summary ? Number(summary.claimableUsdc) : 0

  const handleClaim = async () => {
    if (!summary) return
    setIsClaiming(true)
    setClaimMessage(null)
    try {
      await claimReward(address, summary.claimableUsdc)
      setClaimMessage('Claim submitted (stub) — contract wiring is coming soon.')
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Rewards</h1>

      <section className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5">
        <div>
          <p className="text-sm font-medium text-gray-500">Claimable balance</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {summary ? formatUsdc(summary.claimableUsdc) : '0.00'} USDC
          </p>
        </div>
        <button
          type="button"
          onClick={handleClaim}
          disabled={isClaiming || claimableAmount <= 0}
          className="rounded-full bg-stellar px-4 py-2 text-sm font-medium text-white hover:bg-stellar-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isClaiming ? 'Claiming...' : 'Claim rewards'}
        </button>
      </section>

      {claimMessage && <p className="mt-3 text-sm text-green-700">{claimMessage}</p>}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Reward History</h2>
        <div className="mt-3">
          {isLoading ? (
            <p className="text-gray-500">Loading reward history...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <RewardHistoryList distributions={summary?.distributions ?? []} />
          )}
        </div>
      </section>
    </div>
  )
}

export default Rewards
