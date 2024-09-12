import { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Tooltip } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PageInfo } from "../../../components/PageInfo"
import { DataGrid } from "../../../components/DataGrid"
import { userColumns } from "./columns"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { Nullable } from "../../../types/common"
import { DeleteUserModal } from "../../../components/Modals/User/DeleteUserModal"
import { UserType } from "../../../api/user"
import { EditUserModal } from "../../../components/Modals/User/EditUserModal"

export const UserList = () => {
  const { t } = useTranslation()
  const { currentUser, isAdmin } = useCurrentUser()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUserData, setSelectedUserData] = useState<Nullable<UserType>>(null)
  const [userId, setUserId] = useState<Nullable<number>>()

  const userColumnsWithActions = [
    ...userColumns(t),
    {
      field: 'actions',
      headerName: t("Actions"),
      width: isAdmin ? 150 : 100,
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell: (params: GridRenderCellParams) => {
        const userId = params.row.id
        const isCurrentUser = currentUser?.id === userId

        return (
          <>
            <Tooltip title={t("See profile")}>
              <IconButton
                color="secondary"
                onClick={() => navigate(`/user/${userId}`)}
              >
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>
            {isAdmin && (
              <>
                <Tooltip title={t("Edit")}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setShowEditModal(true)
                      setSelectedUserData(params.row)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={isCurrentUser ? t("You cannot delete your account") : t("Delete")}>
                  <span>
                    <IconButton
                      color="secondary"
                      disabled={isCurrentUser}
                      onClick={() => {
                        setShowDeleteModal(true)
                        setUserId(userId)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )}
          </>
        )
      },
    },
  ]

  return (
    <>
      <Box>
        <PageInfo
          title="User list"
          subtitle="On this page you will find a table with the full list of users. You can view basic information about each of them"
        />
        <DataGrid
          endpoint="users"
          columns={userColumnsWithActions}
        />
      </Box>
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={selectedUserData}
      />
      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        userId={userId}
      />
    </>
  )
}
