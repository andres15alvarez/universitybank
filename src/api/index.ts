import axios, { type AxiosInstance } from 'axios'
import { BASE_URL } from '@/settings/settings'
import { APIError } from '@/errors/api'
import { objectToCamel } from 'ts-case-convert'

export interface ClientConfig {
  url: string
  needAuthorization: boolean
  data?: object
}

export interface Response {
  message: string
  data: object | [any]
  errors: [string]
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
    let response = undefined
    this.handleConfig(config)
    try {
      response = await this.client.request({
        method: method,
        url: config.url,
        data: config.data
      })
    } catch (error: any) {
      throw APIError(error.message, 500, [''])
    }
    const data: Response = response.data
    if (response.status >= 400) {
      throw APIError(data.message, response.status, data.errors)
    }
    return data
  }

  async get(config: ClientConfig) {
    const data = await this.call('get', config)
    return objectToCamel(data.data)
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
