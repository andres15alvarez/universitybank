import { objectToSnake } from 'ts-case-convert'
import { Client } from '.'
import type { Contact, ContactDetail } from '@/interfaces/contact'

export class ContactService extends Client {
  baseURL = 'client/contact'
  async create(alias: string, accountNumber: string, description: string): Promise<Contact | any> {
    const response = await this.post({
      url: this.baseURL,
      needAuthorization: true,
      data: objectToSnake({ alias, accountNumber, description })
    })
    return response
  }

  async list(
    alias: string | null = null,
    page: number | null = null,
    pageSize: number | null = null
  ): Promise<Array<Contact> | any> {
    const response = await this.get({
      url: this.baseURL,
      needAuthorization: true,
      params: objectToSnake({ alias, page, pageSize })
    })
    return response
  }

  async getByID(id: string): Promise<ContactDetail | any> {
    const response = await this.get({
      url: this.baseURL + id,
      needAuthorization: true
    })
    return response
  }

  async update(
    id: string,
    alias: string | null,
    description: string | null
  ): Promise<Contact | any> {
    const response = await this.patch({
      url: this.baseURL + id,
      needAuthorization: true,
      data: objectToSnake({ alias, description })
    })
    return response
  }

  async deleteByID(id: string): Promise<Contact | any> {
    const response = await this.delete({
      url: this.baseURL + id,
      needAuthorization: true
    })
    return response
  }
}
