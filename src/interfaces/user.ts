export interface User {
  birthDate: Date
  documentNumber: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface CreateUser extends User {
  password: string
}

export interface UserResponse extends User {
  accountNumber: string
}

export interface LoginResponse extends UserResponse {
  jwt: string
}

export interface LoginRequest {
  email: string
  password: string
}
