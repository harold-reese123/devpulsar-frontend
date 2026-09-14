import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import { MOCK_LATENCY_MS, USE_MOCK_DATA } from '@/mocks/config'
import { mockContributions } from '@/mocks/contributions'
import type { Contribution } from '@/types/contribution'

interface UseContributionsResult {
  contributions: Contribution[]
  isLoading: boolean
  error: string | null
}

export function useContributions(address: string | null): UseContributionsResult {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) {
      setContributions([])
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    const fetchContributions = USE_MOCK_DATA
      ? new Promise<Contribution[]>((resolve) => {
          setTimeout(() => resolve(mockContributions), MOCK_LATENCY_MS)
        })
      : api
          .get<Contribution[]>(`/contributions/${address}`, { signal: controller.signal })
          .then((res) => res.data)

    fetchContributions
      .then((data) => setContributions(data))
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load contributions')
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [address])

  return { contributions, isLoading, error }
}
