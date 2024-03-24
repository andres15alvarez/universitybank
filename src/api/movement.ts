import { objectToSnake } from 'ts-case-convert'
import { Client } from '.'

export class MovementService extends Client {
  async getMovements(page: number | null, pageSize: number | null, multiplier: number | null) {
    const response = await this.get({
      url: 'client/movement',
      needAuthorization: true,
      params: objectToSnake({ page, pageSize, multiplier })
    })
    return response
  }

  async create(amount: number, accountNumber: string, description: string) {
    const response = await this.post({
      url: 'client/movement',
      needAuthorization: true,
      data: objectToSnake({
        amount,
        accountNumber,
        description
      })
    })
    return response
  }
}
