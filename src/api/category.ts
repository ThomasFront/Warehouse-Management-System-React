import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse, ApiCollectionResponse } from "../types/axios";

export type CategoryType = {
  id: number
  name: string
}

export type CategoriesResponseType = ApiCollectionResponse<CategoryType>

export type CreateCategoryResponseType = ApiAxiosResponse<{
  category: CategoryType
}>

export const createProductCategory = (categoryName: Omit<CategoryType, 'id'>) => backendApi.post<CreateCategoryResponseType>("categories", categoryName)

export const editProductCategory = ({id, name}: CategoryType) => backendApi.patch<CreateCategoryResponseType>(`categories/${id}`, {name})

export const deleteProductCategory = (id: number) => backendApi.delete<ApiAxiosWithMessageResponse>(`categories/${id}`)