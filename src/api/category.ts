import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";
import { ApiCollectionResponse } from "../types/common";

export type CategoryType = {
  id: number
  name: string
}

export type CategoriesResponseType = ApiCollectionResponse<CategoryType>

export type CreateCategoryResponseType = ApiAxiosResponse<{
  category: CategoryType
}>

type DeleteCategoryResponseType = ApiAxiosResponse<{
  message: string
}>

export const createProductCategory = (categoryName: Omit<CategoryType, 'id'>) => backendApi.post<CreateCategoryResponseType>("categories", categoryName)

export const editProductCategory = ({id, name}: CategoryType) => backendApi.patch<CreateCategoryResponseType>(`categories/${id}`, {name})

export const deleteProductCategory = (id: number) => backendApi.delete<DeleteCategoryResponseType>(`categories/${id}`)

export const getCategoryList = () => backendApi.get<CategoriesResponseType>("categories").then(({data}) => data)