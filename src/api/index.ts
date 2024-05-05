import axios, { type AxiosInstance } from 'axios'
import { BASE_URL } from '@/settings/settings'
import { APIError } from '@/errors/api'
import { objectToCamel } from 'ts-case-convert'

export interface ClientConfig {
  url: string
  needAuthorization: boolean
  data?: object
  params?: object
}

export interface Response {
  message: string
  data: object | [any]
  errors: [string]
  paginationTotalCount?: number
}

export class Client {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  addAuthToken(config: any) {
    const TOKEN = localStorage.getItem('jwt')
    config.headers['Authorization'] = `Bearer ${TOKEN}`
    return config
  }

  handleConfig(clientConfig: ClientConfig) {
    if (clientConfig.needAuthorization) {
      this.client.interceptors.request.use((config) => this.addAuthToken(config))
    }
  }

  async call(method: string, config: ClientConfig): Promise<Response> {
    this.handleConfig(config)
    try {
      const response = await this.client.request({
        method: method,
        url: config.url,
        data: config.data,
        params: config.params
      })
      const data: Response = {
        ...response.data,
        paginationTotalCount: response.headers?.['x-pagination-total-count']
      }
      return data
    } catch (error: any) {
      throw APIError(error.response.data.message, error.response.status, error.response.data.errors)
    }
  }

  async get(config: ClientConfig) {
    const data = await this.call('get', config)
    return objectToCamel(data.data)
  }

  async paginate(config: ClientConfig) {
    const data = await this.call('get', config)
    return {
      data: objectToCamel(data.data),
      total: data.paginationTotalCount
    }
  }

  async post(config: ClientConfig) {
    const data = await this.call('post', config)
    return objectToCamel(data.data)
  }

  async put(config: ClientConfig) {
    const data = await this.call('put', config)
    return objectToCamel(data.data)
  }

  async patch(config: ClientConfig) {
    const data = await this.call('patch', config)
    return objectToCamel(data.data)
  }

  async delete(config: ClientConfig) {
    const data = await this.call('delete', config)
    return objectToCamel(data.data)
  }
}
