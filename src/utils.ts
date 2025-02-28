export function addPrices(oldNumber: number, newNumber: number) {
  return Math.round((oldNumber + newNumber) * 100) / 100
}

export function subtractPrices(oldNumber: number, newNumber: number) {
  return Math.round((oldNumber - newNumber) * 100) / 100
}
