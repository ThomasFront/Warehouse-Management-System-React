import { TFunction } from "i18next";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { capitalizeFirstLetter, getUserInitials } from "../../../utils/common";

export const userColumns = (t: TFunction) => ([
  {
    field: "id",
    headerName: "ID",
    width: 100
  },
  {
    field: "avatar",
    headerName: t("Avatar"),
    width: 150,
    filterable: false,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      const firstName = row.firstName
      const lastName = row.lastName
      const userColorTheme = row.colorTheme
      const userInitials = getUserInitials(firstName, lastName)

      return <Avatar sx={{ border: `2px solid ${userColorTheme}` }}>{userInitials}</Avatar>
    }
  },
  {
    field: "firstName",
    headerName: t("First name"),
    width: 175
  },
  {
    field: "lastName",
    headerName: t("Last name"),
    width: 175
  },
  {
    field: "role",
    headerName: t("Role"),
    width: 175,
    filterable: false,
    renderCell: ({ value }: GridRenderCellParams) => {
      const isAdmin = value === "admin"
      return (
        <Box display="flex" alignItems="center" gap={0.5}>
          {isAdmin && (
            <Tooltip title={t("Admin")}>
              <StarIcon sx={{ mb: 0.5, color: "#ffd32c" }} />
            </Tooltip>
          )}
          <Typography fontSize={14}>{t(capitalizeFirstLetter(value))}</Typography>
        </Box>
      )
    }
  },
  {
    field: "email",
    headerName: t("E-mail address"),
    width: 200
  },
])