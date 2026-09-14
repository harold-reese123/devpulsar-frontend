import { useEffect, useState } from 'react'
import type { ISupportedWallet } from '@creit.tech/stellar-wallets-kit'
import { useWallet } from '@/hooks/useWallet'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, isConnecting, getSupportedWallets } = useWallet()
  const [wallets, setWallets] = useState<ISupportedWallet[]>([])
  const [isLoadingWallets, setIsLoadingWallets] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setIsLoadingWallets(true)
    getSupportedWallets()
      .then(setWallets)
      .finally(() => setIsLoadingWallets(false))
  }, [isOpen, getSupportedWallets])

  if (!isOpen) return null

  const handleSelect = async (walletId: string) => {
    await connect(walletId)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Connect a wallet"
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Connect a wallet</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {isLoadingWallets ? (
          <p className="text-sm text-gray-500">Loading wallets...</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {wallets.map((wallet) => (
              <li key={wallet.id}>
                <button
                  type="button"
                  disabled={isConnecting}
                  onClick={() => handleSelect(wallet.id)}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-left hover:border-stellar hover:bg-stellar/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <img src={wallet.icon} alt="" className="h-6 w-6" />
                  <span className="font-medium text-gray-900">{wallet.name}</span>
                  {!wallet.isAvailable && (
                    <span className="ml-auto text-xs text-gray-400">Not installed</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default WalletModal
