import LeaderboardTable from '@/components/leaderboard/LeaderboardTable'

function Leaderboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <div className="mt-6">
        <LeaderboardTable />
      </div>
    </div>
  )
}

export default Leaderboard
