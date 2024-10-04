import { Box } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { AddSaleForm } from "../../../components/Forms/AddSaleForm"

export const SalesAdd = () => {
  return (
    <Box>
      <PageInfo
        title="Add sale"
        subtitle="On this page you can enter the details of a new sales transaction. Complete the form to register the sale in the system"
      />
      <AddSaleForm />
    </Box>
  )
}
