export function getExplorerTxUrl(txHash: string): string {
  const network = import.meta.env.VITE_STELLAR_NETWORK === 'mainnet' ? 'public' : 'testnet'
  return `https://stellar.expert/explorer/${network}/tx/${txHash}`
}

/**
 * Placeholder for the real Soroban `claim_reward` contract invocation.
 * We don't have the contract interface yet, so this just simulates latency
 * and logs the intent — no transaction is built, signed, or submitted.
 * Swap the body for a real StellarWalletsKit signTransaction() call once
 * the contract interface is available.
 */
export async function claimReward(address: string, amountUsdc: string): Promise<void> {
  console.log(`[stub] claimReward: ${address} claiming ${amountUsdc} USDC`)
  await new Promise((resolve) => setTimeout(resolve, 600))
}
