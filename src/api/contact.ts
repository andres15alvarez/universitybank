import { objectToSnake } from 'ts-case-convert'
import { Client } from '.'
import type { Contact, ContactDetail } from '@/interfaces/contact'
import type { Paginate } from '@/interfaces/paginate'

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
  ): Promise<Paginate<Contact> | any> {
    const response = await this.paginate({
      url: this.baseURL,
      needAuthorization: true,
      params: objectToSnake({ alias, page, pageSize })
    })
    return response
  }

  async getByID(id: number): Promise<ContactDetail | any> {
    const response = await this.get({
      url: this.baseURL + `/${id}`,
      needAuthorization: true
    })
    return response
  }

  async update(
    id: number,
    alias: string | null,
    description: string | null
  ): Promise<Contact | any> {
    const response = await this.patch({
      url: this.baseURL + `/${id}`,
      needAuthorization: true,
      data: objectToSnake({ alias, description })
    })
    return response
  }

  async deleteByID(id: number): Promise<Contact | any> {
    const response = await this.delete({
      url: this.baseURL + `/${id}`,
      needAuthorization: true
    })
    return response
  }
}
