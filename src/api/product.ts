import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";
import { Nullable } from "../types/common";
import { CategoryType } from "./category";

export type ProductType = {
  id: number
  name: string
  price: string | number
  stock: number
  description: string
  image: Nullable<string>
  category: CategoryType
}

export type CreateProductRequestType = {
  name: string
  categoryId: number
  price: string | number
  stock: number
  description: string
  productImageUrl?: string
}

export type CreateProductResponseType = ApiAxiosResponse<{
  product: ProductType
}>

export const addProduct = (category: CreateProductRequestType) => backendApi.post<CreateProductResponseType>("products", category)