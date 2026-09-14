import WaveCycleTimer from '@/components/wave/WaveCycleTimer'
import WaveHistory from '@/components/wave/WaveHistory'
import WaveProgress from '@/components/wave/WaveProgress'
import { useWaveCycle } from '@/hooks/useWaveCycle'

function Wave() {
  const { currentWave, history, isLoadingCurrent, isLoadingHistory, errorCurrent, errorHistory } =
    useWaveCycle()

  return (
    <div>
      <h1 className="text-2xl font-bold">Wave Cycle</h1>

      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        {isLoadingCurrent ? (
          <p className="text-gray-500">Loading current wave...</p>
        ) : errorCurrent ? (
          <p className="text-red-600">{errorCurrent}</p>
        ) : currentWave ? (
          <>
            <p className="text-sm font-medium text-gray-500">{currentWave.label}</p>
            <div className="mt-2">
              <WaveCycleTimer endAt={currentWave.endAt} />
            </div>
            <div className="mt-4">
              <WaveProgress startAt={currentWave.startAt} endAt={currentWave.endAt} />
            </div>
          </>
        ) : (
          <p className="text-gray-500">No active wave right now.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Past Waves</h2>
        <div className="mt-3">
          {isLoadingHistory ? (
            <p className="text-gray-500">Loading wave history...</p>
          ) : errorHistory ? (
            <p className="text-red-600">{errorHistory}</p>
          ) : (
            <WaveHistory waves={history} />
          )}
        </div>
      </section>
    </div>
  )
}

export default Wave
