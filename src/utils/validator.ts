const letterPattern = /^[a-zA-Z\s]+$/
const numberPattern = /^\d+$/

export function isEmail(value: string): boolean {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value)
}

export function isAlpha(value: string): boolean {
  return letterPattern.test(value)
}

export function isNumber(value: string): boolean {
  return numberPattern.test(value)
}

export function isRequired(value: string): boolean {
  return !!value
}

export function isPasswordLengthCorrect(value: string): boolean {
  return value.length >= 8 && value.length <= 16
}

export function checkNumber(event: KeyboardEvent) {
  if (event.key.length === 1 && !numberPattern.test(event.key)) {
    event.preventDefault()
  }
}

export function checkAlpha(event: KeyboardEvent) {
  if (!letterPattern.test(event.key)) {
    event.preventDefault()
  }
}
