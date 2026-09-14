import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import { MOCK_LATENCY_MS, USE_MOCK_DATA } from '@/mocks/config'
import { mockCurrentWave, mockWaveHistory } from '@/mocks/wave'
import type { WaveCycle } from '@/types/wave'

interface UseWaveCycleResult {
  currentWave: WaveCycle | null
  history: WaveCycle[]
  isLoadingCurrent: boolean
  isLoadingHistory: boolean
  errorCurrent: string | null
  errorHistory: string | null
}

export function useWaveCycle(): UseWaveCycleResult {
  const [currentWave, setCurrentWave] = useState<WaveCycle | null>(null)
  const [history, setHistory] = useState<WaveCycle[]>([])
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [errorCurrent, setErrorCurrent] = useState<string | null>(null)
  const [errorHistory, setErrorHistory] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setIsLoadingCurrent(true)
    setErrorCurrent(null)

    const fetchCurrent = USE_MOCK_DATA
      ? new Promise<WaveCycle>((resolve) => {
          setTimeout(() => resolve(mockCurrentWave), MOCK_LATENCY_MS)
        })
      : api
          .get<WaveCycle>('/wave/current', { signal: controller.signal })
          .then((res) => res.data)

    fetchCurrent
      .then(setCurrentWave)
      .catch((err) => {
        if (controller.signal.aborted) return
        setErrorCurrent(err instanceof Error ? err.message : 'Failed to load the current wave')
      })
      .finally(() => setIsLoadingCurrent(false))

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setIsLoadingHistory(true)
    setErrorHistory(null)

    const fetchHistory = USE_MOCK_DATA
      ? new Promise<WaveCycle[]>((resolve) => {
          setTimeout(() => resolve(mockWaveHistory), MOCK_LATENCY_MS)
        })
      : api
          .get<WaveCycle[]>('/wave/history', { signal: controller.signal })
          .then((res) => res.data)

    fetchHistory
      .then(setHistory)
      .catch((err) => {
        if (controller.signal.aborted) return
        setErrorHistory(err instanceof Error ? err.message : 'Failed to load wave history')
      })
      .finally(() => setIsLoadingHistory(false))

    return () => controller.abort()
  }, [])

  return { currentWave, history, isLoadingCurrent, isLoadingHistory, errorCurrent, errorHistory }
}
