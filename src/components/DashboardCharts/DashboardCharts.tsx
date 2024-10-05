import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { chartMonths } from './helpers';
import { DashboardChartsProps } from './types';

export const DashboardCharts = ({ monthlySales }: DashboardChartsProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const primaryColor = theme.palette.primary.main
  const currentYear = new Date().getFullYear()

  return (
    <BarChart
      series={[
        {
          data: monthlySales || [],
          color: primaryColor,
          label: `${t("Sales in the year")} ${currentYear} (PLN)`
        },
      ]}
      height={400}
      xAxis={[{
        data: chartMonths(t),
        scaleType: 'band'
      }]}
    />
  )
}