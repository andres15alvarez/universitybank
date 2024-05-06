export function removeWhiteSpaces(value: string): string {
  return value.replace(/ /g, '')
}

export function hideAccountNumber(accountNumber: string): string {
  const firstFourDigit = accountNumber.slice(0, 4)
  const lastFourDigit = accountNumber.slice(16, 20)
  return firstFourDigit + '****' + lastFourDigit
}
