import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import { Client } from '.'

export class UserService extends Client {
  async getBalance(): Promise<BalanceResponse | any> {
    const response = await this.get({
      url: 'client/user/balance',
      needAuthorization: true
    })
    return response
  }

  async getProfile(): Promise<UserResponse | any> {
    const response = await this.get({
      url: 'client/user/whoami',
      needAuthorization: true
    })
    return response
  }

  async searchUserByAccount(account: string): Promise<UserResponse | any> {
    const response = await this.get({
      url: `client/user/account/${account}`,
      needAuthorization: true
    })
    return response
  }
}
