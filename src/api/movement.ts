import { objectToSnake } from 'ts-case-convert'
import { Client } from '.'
import type { CreateMovementRequest, Movement } from '@/interfaces/movement'

export class MovementService extends Client {
  async getMovements(
    page: number | null,
    pageSize: number | null,
    multiplier: number | null = null
  ): Promise<Array<Movement> | any> {
    const response = await this.get({
      url: 'client/movement',
      needAuthorization: true,
      params: objectToSnake({ page, pageSize, multiplier })
    })
    return response
  }

  async create(data: CreateMovementRequest): Promise<Movement | any> {
    const response = await this.post({
      url: 'client/movement',
      needAuthorization: true,
      data: objectToSnake({
        amount: data.amount,
        accountNumber: data.accountNumber,
        description: data.description
      })
    })
    return response
  }
}
