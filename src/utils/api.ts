import axios from 'axios'
import { useWalletStore } from '@/store/walletStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

api.interceptors.request.use((config) => {
  const { address } = useWalletStore.getState()
  if (address) {
    config.headers.set('X-Wallet-Address', address)
  }
  return config
})
