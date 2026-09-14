import { create } from 'zustand'
import type { WalletSession } from '@/types/wallet'

interface WalletStore {
  address: string | null
  walletId: string | null
  isConnected: boolean
  setSession: (session: WalletSession) => void
  clearSession: () => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  walletId: null,
  isConnected: false,
  setSession: ({ address, walletId }) =>
    set({ address, walletId, isConnected: true }),
  clearSession: () => set({ address: null, walletId: null, isConnected: false }),
}))
