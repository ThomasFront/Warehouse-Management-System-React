import { AxiosError, AxiosResponse } from "axios";

export type ApiAxiosResponse<T> = AxiosResponse<T>

type ApiErrorType = {
  message: string
  errors: {
    [key: string]: string[]
  }
}

export type ApiAxiosErrorResponse = AxiosError<ApiErrorType>