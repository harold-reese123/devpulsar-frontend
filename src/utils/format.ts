export function truncateAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso))
}

/**
 * USDC amounts are carried as raw decimal strings end-to-end (see WaveCycle.totalRewardsUsdc)
 * to avoid float precision loss. This is the one sanctioned place that parses the string,
 * and only for display formatting — never do arithmetic on these values elsewhere.
 */
export function formatUsdc(value: string): string {
  const amount = Number(value)
  if (Number.isNaN(amount)) return value
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
