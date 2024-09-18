import { AxiosError, AxiosResponse } from "axios";

export type ApiAxiosResponse<T> = AxiosResponse<T>

type ApiErrorType = {
  message: string
  errors: {
    [key: string]: string[]
  }
}

export type ApiAxiosErrorResponse = AxiosError<ApiErrorType>

export type MetaType = {
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

export type ApiAxiosWithMessageResponse = ApiAxiosResponse<{
  message: string
}>