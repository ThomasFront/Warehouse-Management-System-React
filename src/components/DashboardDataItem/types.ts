export type DashboardDataItemType = {
  title: string
  count?: number | string
  icon: JSX.Element
  color: string
  navigateTo: string
  isLoading: boolean
}