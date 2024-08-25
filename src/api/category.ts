import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

export type CategoryType = {
  id: number
  name: string
}

export type CreateCategoryResponseType = ApiAxiosResponse<CategoryType>

export const createProductCategory = (categoryName: Omit<CategoryType, 'id'>) => backendApi.post<CreateCategoryResponseType>("categories", categoryName)