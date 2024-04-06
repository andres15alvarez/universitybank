export interface Movement {
  accountNumber: string
  amount: number
  balance: number
  createdAt: Date
  description: string
  id: number
  multiplier: number
  updatedAt: Date
}

export interface CreateMovementRequest {
  amount: number
  accountNumber: string
  description: string
}
