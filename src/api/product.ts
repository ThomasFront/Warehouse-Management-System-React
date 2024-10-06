import { EditProductPayloadType } from "../components/Modals/Product/EditProductModal/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse } from "../types/axios";
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

type ProductResponseType = ApiAxiosResponse<{
  product: ProductType
}>

export const addProduct = (category: CreateProductRequestType) => backendApi.post<CreateProductResponseType>("products", category)

export const destroyProduct = (id: number) => backendApi.delete<ApiAxiosWithMessageResponse>(`products/${id}`)

export const editMessage = ({id, ...props}: EditProductPayloadType) => backendApi.patch<CreateProductResponseType>(`products/${id}`, props)

export const getProductById = (productId?: number) => backendApi.get<ProductResponseType>(`products/${productId}`).then(({data}) => data.data.product)

export const exportProductsToCsv = () => backendApi.get("products/export",  {
  responseType: "blob"
}).then(res => {
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const localStorageLanguage = localStorage.getItem("lang")
  const fileName = localStorageLanguage === "en" ? "products_export.csv" : "eksport_produktow.csv"
      
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link);
})