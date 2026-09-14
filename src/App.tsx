import { NavLink, Route, Routes } from 'react-router-dom'
import WalletButton from '@/components/wallet/WalletButton'
import Dashboard from '@/pages/Dashboard'
import Leaderboard from '@/pages/Leaderboard'
import NotFound from '@/pages/NotFound'
import Rewards from '@/pages/Rewards'
import Wave from '@/pages/Wave'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium ${isActive ? 'text-stellar' : 'text-gray-600 hover:text-gray-900'}`

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
          <span className="text-lg font-bold text-stellar">DevPulsar</span>
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/wave" className={navLinkClass}>
            Wave
          </NavLink>
          <NavLink to="/rewards" className={navLinkClass}>
            Rewards
          </NavLink>
          <div className="ml-auto">
            <WalletButton />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/wave" element={<Wave />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
