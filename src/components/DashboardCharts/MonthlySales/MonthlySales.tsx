import { useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { MonthlySalesProps } from "./types"
import { chartMonths } from "../helpers"

export const MonthlySales = ({ monthlySales }: MonthlySalesProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const primaryColor = theme.palette.primary.main
  const currentYear = new Date().getFullYear()

  const monthlySalesData = useMemo(() => {
    return Array(12).fill(0).map((_, index) => {
      const sale = monthlySales?.find(({ month }) => month - 1 === index)
      return sale ? sale.totalPrice : 0
    })
  }, [monthlySales])

  return (
    <BarChart
      series={[
        {
          data: monthlySalesData,
          color: primaryColor,
          label: `${t("Sales in the year")} ${currentYear} (PLN)`
        },
      ]}
      height={400}
      xAxis={[{
        data: chartMonths(t),
        scaleType: 'band'
      }]}
      data-testid="monthlySalesChart"
    />
  )
}
