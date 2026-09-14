import { describe, expect, it } from 'vitest'
import { useWalletStore } from './walletStore'

describe('walletStore', () => {
  it('starts disconnected', () => {
    expect(useWalletStore.getState().isConnected).toBe(false)
    expect(useWalletStore.getState().address).toBeNull()
  })

  it('sets a session on connect', () => {
    useWalletStore.getState().setSession({ address: 'GABC123', walletId: 'freighter' })
    const state = useWalletStore.getState()
    expect(state.isConnected).toBe(true)
    expect(state.address).toBe('GABC123')
    expect(state.walletId).toBe('freighter')
  })

  it('clears the session on disconnect', () => {
    useWalletStore.getState().setSession({ address: 'GABC123', walletId: 'freighter' })
    useWalletStore.getState().clearSession()
    const state = useWalletStore.getState()
    expect(state.isConnected).toBe(false)
    expect(state.address).toBeNull()
    expect(state.walletId).toBeNull()
  })
})
