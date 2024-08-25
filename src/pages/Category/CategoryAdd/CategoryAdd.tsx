import { Box } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { AddCategoryForm } from "../../../components/Forms/AddCategoryForm"

export const CategoryAdd = () => {
  return (
    <Box>
      <PageInfo
        title="Add category"
        subtitle="On this page you can easily add a new category for your products. Complete the form to enter category details and save it in the system"
      />
      <AddCategoryForm />
    </Box>
  )
}
