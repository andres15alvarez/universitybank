import type { CreateUser, LoginResponse, UserResponse } from '@/interfaces/user'
import { Client } from '.'
import { objectToSnake } from 'ts-case-convert'

export class AuthClient extends Client {
  async login(email: string, password: string): Promise<LoginResponse | any> {
    const response = await this.post({
      url: 'public/client/user/login',
      needAuthorization: false,
      data: {
        email: email,
        password: password
      }
    })
    return response
  }

  async create(user: CreateUser): Promise<UserResponse | any> {
    const response = await this.post({
      url: 'public/client/user/register',
      needAuthorization: false,
      data: {
        ...objectToSnake(user)
      }
    })
    return response
  }
}
