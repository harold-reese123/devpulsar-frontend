import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { truncateAddress } from '@/utils/format'
import WalletModal from './WalletModal'

function WalletButton() {
  const { address, isConnected, isConnecting, disconnect } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Disconnect wallet"
        className="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600"
      >
        {truncateAddress(address)}
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={isConnecting}
        className="rounded-full bg-stellar px-4 py-1.5 text-sm font-medium text-white hover:bg-stellar-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default WalletButton
