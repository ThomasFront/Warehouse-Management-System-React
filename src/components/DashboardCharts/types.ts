import { DashboardSaleType, TopProductType } from "../../api/dashboard"

export type DashboardChartsProps = {
  monthlySales?: Array<DashboardSaleType>
  topProducts?: Array<TopProductType>
}