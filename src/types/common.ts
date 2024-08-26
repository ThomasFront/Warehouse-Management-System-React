export type Nullable<T> = null | T

type MetaType = {
  currentPage: number
  lastPage: number
  perPage: number
  from: number
  to: number
  total: number
}

export type ApiCollectionResponse<T> = {
  data: T[]
  meta: MetaType
}