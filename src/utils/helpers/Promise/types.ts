import { AxiosError, AxiosResponse } from 'axios'

export interface AsyncPromiseResponseError {
  message: string
}

export interface AsyncPromiseResponse<T> {
  resp: AxiosResponse<T> | null
  err: AxiosError<AsyncPromiseResponseError> | null
}

export interface AsyncPromiseSimpleResponse<T> {
  resp: T | null
  err: Error | null
}
