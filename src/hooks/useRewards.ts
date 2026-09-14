import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import { MOCK_LATENCY_MS, USE_MOCK_DATA } from '@/mocks/config'
import { mockRewardsSummary } from '@/mocks/rewards'
import type { RewardsSummary } from '@/types/reward'

interface UseRewardsResult {
  summary: RewardsSummary | null
  isLoading: boolean
  error: string | null
}

export function useRewards(address: string | null): UseRewardsResult {
  const [summary, setSummary] = useState<RewardsSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) {
      setSummary(null)
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    const fetchRewards = USE_MOCK_DATA
      ? new Promise<RewardsSummary>((resolve) => {
          setTimeout(() => resolve(mockRewardsSummary), MOCK_LATENCY_MS)
        })
      : api
          .get<RewardsSummary>(`/rewards/${address}`, { signal: controller.signal })
          .then((res) => res.data)

    fetchRewards
      .then((data) => setSummary(data))
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load rewards')
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [address])

  return { summary, isLoading, error }
}
