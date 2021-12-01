import { AxiosError, AxiosResponse } from 'axios'

import { AsyncPromiseResponse, AsyncPromiseSimpleResponse } from './types'

export const asyncPromise = async <T>(promise: Promise<AxiosResponse<T>>): Promise<AsyncPromiseResponse<T>> =>
  await promise.then((data: AxiosResponse<T>) => ({ resp: data, err: null })).catch((err: AxiosError<any>) => ({ resp: null, err: err }))

export const asyncPromiseSimple = async <T>(promise: Promise<T>): Promise<AsyncPromiseSimpleResponse<T>> =>
  await promise.then((data: T) => ({ resp: data, err: null })).catch((err: Error) => ({ resp: null, err: err }))

export const asyncPromiseSimpleDelay = async <T>(promise: Promise<T>, milliseconds: number): Promise<AsyncPromiseSimpleResponse<T>> => {
  await promiseDelay(true, milliseconds)
  return await promise.then((data: T) => ({ resp: data, err: null })).catch((err: Error) => ({ resp: null, err: err }))
}

export const promiseWithTimeout = async (promise: Promise<any>, milliseconds: number) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error(`Promise timeout reached (limit: ${milliseconds} ms)`)), milliseconds))

  return await Promise.race([
    timeout,
    promise
  ])
}

export const promiseMapSeries = async <T>(iterable: T[], action: Function) => {
  for (const x of iterable) {
    await action(x)
  }
}

export const promiseDelay = async <T>(value: T, milliseconds: number) => {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(value), milliseconds))
}
