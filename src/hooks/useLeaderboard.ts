import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import { MOCK_LATENCY_MS, USE_MOCK_DATA } from '@/mocks/config'
import { mockLeaderboard } from '@/mocks/leaderboard'
import type { LeaderboardEntry, LeaderboardScope } from '@/types/leaderboard'

interface UseLeaderboardResult {
  entries: LeaderboardEntry[]
  isLoading: boolean
  error: string | null
}

export function useLeaderboard(scope: LeaderboardScope): UseLeaderboardResult {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    const fetchLeaderboard = USE_MOCK_DATA
      ? new Promise<LeaderboardEntry[]>((resolve) => {
          setTimeout(() => resolve(mockLeaderboard[scope]), MOCK_LATENCY_MS)
        })
      : api
          .get<LeaderboardEntry[]>('/leaderboard', {
            params: { scope },
            signal: controller.signal,
          })
          .then((res) => res.data)

    fetchLeaderboard
      .then((data) => setEntries(data))
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [scope])

  return { entries, isLoading, error }
}
