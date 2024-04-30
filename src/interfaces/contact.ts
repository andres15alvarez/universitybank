import type { User } from './user'

export interface Contact {
  id: number
  accountNumber: string
  alias: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactDetail extends Contact {
  user: User
}
