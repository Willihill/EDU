import { SWRConfiguration, SWRInfiniteConfiguration } from 'swr'
import { SwrMutate } from 'utils/common/types'

export enum LogicalExclusionType {
  User = 'USUARIO',
  Company = 'EMPRESA',
  Product = 'PRODUTO',
  Category = 'CATEGORIA',
  Collection = 'COLECAO',
  Style = 'ESTILO',
  Color = 'COR',
  Material = 'MATERIAL',
  Brand = 'MARCA',
  Gender = 'GENERO',
  Prescription = 'PRESCRICAO',
  PrescriptionAccessory = 'PRESCRICAOACESSORIO',
  Customer = 'CLIENTE',
  Seller = 'VENDEDOR',
  Doctor = 'MEDICO',
  PaymentMethod = 'FORMAPAGAMENTO',
  Provider = 'FORNECEDOR'
}

export interface DataInExclusionProps {
  id: any
  logicalType: LogicalExclusionType
}

export interface LogicalExclusionOptions<Y, T extends Y[] | Y[][], K extends keyof Y> {
  exclusionData: Y
  dataKey: K
  logicalExclusionType: LogicalExclusionType
  removeDataOnInactive?: boolean
  mutate: SwrMutate<Y, T>
}

export interface SwrInfiniteAdapterLogicalExclusionProps<T> {
  exclusionType: LogicalExclusionType
  exclusionKey: keyof T
  removeDataOnInactive: boolean
}

export interface SwrAdapterOptionsProps<TData> {
  prefixKey: string
  limitByPage?: number
  logicalExclusion?: SwrInfiniteAdapterLogicalExclusionProps<TData>
  swrInfiniteConfiguration?: SWRInfiniteConfiguration | {}
  swrConfiguration?: SWRConfiguration | {}
}
