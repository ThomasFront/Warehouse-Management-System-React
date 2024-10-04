import { AddSaleFormType } from "../components/Forms/AddSaleForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";
import { ProductType } from "./product";

export type SaleType = {
  id: number
  quantity: number
  totalPrice: number
  product: ProductType
}

export type AddSaleResponseType = ApiAxiosResponse<{
  sale: SaleType
}>

export const addSale = (saleData: AddSaleFormType) => backendApi.post<AddSaleResponseType>("sales", saleData)