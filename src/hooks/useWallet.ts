import { useCallback, useEffect, useState } from 'react'
import {
  allowAllModules,
  StellarWalletsKit,
  WalletNetwork,
  type ISupportedWallet,
} from '@creit.tech/stellar-wallets-kit'
import { useWalletStore } from '@/store/walletStore'

const STORAGE_KEY = 'devpulsar:walletId'

const network =
  import.meta.env.VITE_STELLAR_NETWORK === 'mainnet' ? WalletNetwork.PUBLIC : WalletNetwork.TESTNET

const kit = new StellarWalletsKit({
  network,
  selectedWalletId: undefined,
  modules: allowAllModules(),
})

export function useWallet() {
  const address = useWalletStore((state) => state.address)
  const isConnected = useWalletStore((state) => state.isConnected)
  const setSession = useWalletStore((state) => state.setSession)
  const clearSession = useWalletStore((state) => state.clearSession)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const savedWalletId = localStorage.getItem(STORAGE_KEY)
    if (!savedWalletId) return

    kit.setWallet(savedWalletId)
    kit
      .getAddress({ skipRequestAccess: true })
      .then(({ address }) => {
        setSession({ address, walletId: savedWalletId })
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY)
      })
  }, [setSession])

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      await kit.openModal({
        modalTitle: 'Connect a wallet',
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id)
          const { address } = await kit.getAddress()
          setSession({ address, walletId: option.id })
          localStorage.setItem(STORAGE_KEY, option.id)
        },
      })
    } finally {
      setIsConnecting(false)
    }
  }, [setSession])

  const disconnect = useCallback(async () => {
    await kit.disconnect()
    localStorage.removeItem(STORAGE_KEY)
    clearSession()
  }, [clearSession])

  return { address, isConnected, isConnecting, connect, disconnect }
}
