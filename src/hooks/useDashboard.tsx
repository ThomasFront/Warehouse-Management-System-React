import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../api/dashboard'

export const useDashboard = () => {
  const { t } = useTranslation()

  const { data: dashboardData, isLoading: isDashboardDataLoading, isError: isDashboardDataError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  })

  if (isDashboardDataError) {
    toast.error(t("An error occurred while downloading the dashboard"))
  }

  return {
    dashboardData,
    isDashboardDataLoading
  }
}
