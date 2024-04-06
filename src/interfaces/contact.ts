import type { User } from './user'

export interface Contact {
  id: number
  documentNumber: string
  alias: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactDetail extends Contact {
  user: User
}
