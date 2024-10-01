import { Box } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { AddProductForm } from "../../../components/Forms/AddProductForm"

export const ProductAdd = () => {
  return (
    <Box>
      <PageInfo
        title="Add product"
        subtitle="On this page you can easily add a new product to your offer. Complete the form to enter product details and save it in the system"
      />
      <AddProductForm />
    </Box>
  )
}
