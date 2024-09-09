import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Tooltip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { GridRenderCellParams } from "@mui/x-data-grid"
import { PageInfo } from "../../../components/PageInfo"
import { DataGrid } from "../../../components/DataGrid"
import { categoryColumns } from "./helpers"
import { EditCategoryModal } from "../../../components/Modals/EditCategoryModal"
import { Nullable } from "../../../types/common"
import { CategoryType } from "../../../api/category"
import { DeleteCategoryModal } from "../../../components/Modals/DeleteCategoryModal"

export const CategoryList = () => {
  const { t } = useTranslation()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategoryData, setSelectedCategoryData] = useState<Nullable<CategoryType>>(null)

  const categoryColumnsWithActions = [
    ...categoryColumns(t),
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
                setSelectedCategoryData(params.row)
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
                setSelectedCategoryData(params.row)
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
    <>
      <EditCategoryModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        category={selectedCategoryData}
      />
      <DeleteCategoryModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        categoryId={selectedCategoryData?.id}
      />
      <Box>
        <PageInfo
          title="Category list"
          subtitle="Here you will find a complete list of categories that you can easily view, edit and delete"
        />
        <DataGrid
          endpoint="categories"
          columns={categoryColumnsWithActions}
        />
      </Box>
    </>
  )
}
