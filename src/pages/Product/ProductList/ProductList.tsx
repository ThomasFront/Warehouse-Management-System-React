import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Tooltip } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import DeleteIcon from '@mui/icons-material/Delete'
import { GridRenderCellParams } from "@mui/x-data-grid"
import { productColumns } from "./columns"
import { DataGrid } from "../../../components/DataGrid"
import { Nullable } from "../../../types/common"
import { ProductType } from "../../../api/product"
import { DeleteProductModal } from "../../../components/Modals/Product/DeleteProductModal"

export const ProductList = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProductData, setSelectedProductData] = useState<Nullable<ProductType>>(null)

  const productColumnsWithActions = [
    ...productColumns(t),
    {
      field: 'actions',
      headerName: t("Actions"),
      width: 150,
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={t("Delete")}>
          <IconButton
            color="secondary"
            onClick={() => {
              setShowDeleteModal(true)
              setSelectedProductData(params.row)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ]

  return (
    <Box>
      <Box>
        <PageInfo
          title="Product list"
          subtitle="Here you will find a complete list of products that you can easily view, edit and delete"
        />
        <DataGrid
          endpoint="products"
          columns={productColumnsWithActions}
        />
      </Box>
      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        productId={selectedProductData?.id}
      />
    </Box>
  )
}