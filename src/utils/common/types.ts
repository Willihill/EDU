import { Action } from 'redux'
import { MutatorCallback } from 'swr/dist/types'

export interface PageRegisterProps<T> {
  isNotFound: boolean
  isNew: boolean
  error?: Error
  data?: T
}

export interface SwrHookResponseProps<T> {
  data: T[]
  hasMore?: boolean
  isValidating: boolean
  page?: number
  error?: Error
  loadMore?: () => Promise<T[][] | undefined>
  revalidate: () => Promise<boolean>
}

export interface PaginationListParamsProps {
  page: number
  limit: number
}

export interface ServerPaginationListParamsProps {
  pagina: number
  limite: number
}

export interface StaticListProps<T extends any = string | number> {
  id: T
  label: string
}

export interface ActionType extends Action {
  type: string
  payload: any
}

export interface ServerCommonDataProps<T extends any = string | number> {
  id: T
  nome: string
}

export interface CommonDataProps {
  id: number
  name: string
}

export type SwrMutate<Y, T extends Y[] | Y[][]> = (data?: T | Promise<T> | MutatorCallback<T>, shouldRevalidate?: boolean) => Promise<T | undefined>

export interface FileProps {
  file: string
}

export interface ServerFileProps {
  conteudoArquivo: string
}

type Cons<H, T> = T extends readonly any[] ?
    ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
  : never

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...Array<0>]

export type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: [K] | (Paths<T[K], Prev[D]> extends infer P ?
      P extends [] ? never : Cons<K, P> : never
    ) }[keyof T]
  : []

export type Leaves<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: Cons<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : []
