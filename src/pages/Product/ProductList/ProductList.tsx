import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Tooltip } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { GridRenderCellParams } from "@mui/x-data-grid"
import { productColumns } from "./columns"
import { DataGrid } from "../../../components/DataGrid"
import { Nullable } from "../../../types/common"
import { ProductType } from "../../../api/product"
import { DeleteProductModal } from "../../../components/Modals/Product/DeleteProductModal"
import { EditProductModal } from "../../../components/Modals/Product/EditProductModal"
import { useProduct } from "../../../hooks/useProduct"

export const ProductList = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProductData, setSelectedProductData] = useState<Nullable<ProductType>>(null)
  const { exportToCsv, isExportToCsvLoading } = useProduct()

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
        <>
          <Tooltip title={t("Edit")}>
            <IconButton
              color="secondary"
              onClick={() => {
                setShowEditModal(true)
                setSelectedProductData(params.row)
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
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
        </>
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
          csvExport={{
            action: exportToCsv,
            isLoading: isExportToCsvLoading
          }}
        />
      </Box>
      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={selectedProductData}
      />
      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        productId={selectedProductData?.id}
      />
    </Box>
  )
}