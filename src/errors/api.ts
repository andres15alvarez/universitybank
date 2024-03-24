export interface APIError extends Error {
  name: 'APIError'
  status: number
  message: string
  errors: [string]
}

export function APIError(message: string, status: number, errors: [string]) {
  const error = new Error(message) as APIError
  error.status = status
  error.errors = errors
  return error
}
