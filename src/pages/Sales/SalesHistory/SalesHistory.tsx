import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { PageInfo } from "../../../components/PageInfo"
import { DataGrid } from "../../../components/DataGrid"
import { saleColumns } from "./columns"
import { useSale } from "../../../hooks/useSale"

export const SalesHistory = () => {
  const { t } = useTranslation()
  const { exportToCsv, isExportToCsvLoading } = useSale()

  const saleColumnsWithActions = [
    ...saleColumns(t)
  ]

  return (
    <Box>
      <PageInfo
        title="Sales history"
        subtitle="On this page you can view your complete sales history in an easy-to-read table. We also offer the ability to export data, which facilitates further analysis and archiving"
      />
      <DataGrid
        endpoint="sales"
        columns={saleColumnsWithActions}
        csvExport={{
          action: exportToCsv,
          isLoading: isExportToCsvLoading
        }}
      />
    </Box>
  )
}
