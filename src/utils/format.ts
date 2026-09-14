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
