import { Client } from '.'

export class UserService extends Client {
  async getBalance() {
    const response = await this.get({
      url: 'client/user/balance',
      needAuthorization: true
    })
    return response
  }

  async getProfile() {
    const response = await this.get({
      url: 'client/user/whoami',
      needAuthorization: true
    })
    return response
  }

  async searchUserByAccount(account: string) {
    const response = await this.get({
      url: `client/user/account/${account}`,
      needAuthorization: true
    })
    return response
  }
}
