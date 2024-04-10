export function isEmail(value: string): boolean {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value)
}

export function isRequired(value: string): boolean {
  return !!value
}

export function isPasswordLengthCorrect(value: string): boolean {
  return value.length >= 8 && value.length <= 16
}
