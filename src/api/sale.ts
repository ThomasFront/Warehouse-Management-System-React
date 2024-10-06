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

export const exportSalesToCsv = () => backendApi.get("sales/export",  {
  responseType: "blob"
}).then(res => {
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const localStorageLanguage = localStorage.getItem("lang")
  const fileName = localStorageLanguage === "en" ? "sales_export.csv" : "eksport_sprzedazy.csv"
      
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link);
})