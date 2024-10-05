import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

type DashboardDataType = {
  userCount: number
  productCount: number
  categoryCount: number
  totalPrice: string
  monthlySales: Array<number>
}

type DashboardResponseType = ApiAxiosResponse<DashboardDataType>

export const getDashboard = () => backendApi.get<DashboardResponseType>("dashboard").then(({data}) => data.data)