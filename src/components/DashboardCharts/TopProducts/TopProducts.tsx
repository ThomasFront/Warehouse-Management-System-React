import { useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { useTranslation } from "react-i18next"
import { TopProductsProps } from "./types"

export const TopProducts = ({ topProducts }: TopProductsProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const currentYear = new Date().getFullYear()
  const primaryColor = theme.palette.primary.main
  const seriesData = topProducts?.map(({ quantity }) => quantity)
  const yAxisData = topProducts?.map(({ productName }) => productName)

  return (
    <BarChart
      series={[
        {
          data: seriesData || [],
          color: primaryColor,
          label: `${t("Top products")} ${currentYear} (${t("Sale")})`
        },
      ]}
      height={400}
      xAxis={[{
        data: yAxisData || [],
        scaleType: 'band'
      }]}
    />
  )
}
