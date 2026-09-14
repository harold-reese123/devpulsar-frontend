/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STELLAR_NETWORK: 'testnet' | 'mainnet'
  readonly VITE_BACKEND_URL: string
  readonly VITE_CONTRACT_ADDRESS: string
  readonly VITE_HORIZON_URL?: string
  readonly VITE_SOROBAN_RPC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
