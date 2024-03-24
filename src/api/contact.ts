import { objectToSnake } from 'ts-case-convert'
import { Client } from '.'

export class ContactService extends Client {
  baseURL = 'client/contact'
  async create(alias: string, accountNumber: string, description: string) {
    const response = await this.post({
      url: this.baseURL,
      needAuthorization: true,
      data: objectToSnake({ alias, accountNumber, description })
    })
    return response
  }

  async list(alias: string | null, page: number | null, pageSize: number | null) {
    const response = await this.get({
      url: this.baseURL,
      needAuthorization: true,
      params: objectToSnake({ alias, page, pageSize })
    })
    return response
  }

  async getByID(id: string) {
    const response = await this.get({
      url: this.baseURL + id,
      needAuthorization: true
    })
    return response
  }

  async update(id: string, alias: string | null, description: string | null) {
    const response = await this.patch({
      url: this.baseURL + id,
      needAuthorization: true,
      data: objectToSnake({ alias, description })
    })
    return response
  }

  async deleteByID(id: string) {
    const response = await this.delete({
      url: this.baseURL + id,
      needAuthorization: true
    })
    return response
  }
}
