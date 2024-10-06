import { useState } from "react"
import { useTranslation } from "react-i18next"
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from "react-router"
import { Nullable } from '../../../types/common'
import { useLogout } from '../../../hooks/useLogout'
import { CustomAvatarType } from "./types";

export const CustomAvatar = ({ userId, userAvatar, userInitials }: CustomAvatarType) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { logout, isLogoutLoading } = useLogout()
  const navigate = useNavigate()
  const logoutLoadingColor = theme.palette.grey[600]
  const [anchorElUser, setAnchorElUser] = useState<Nullable<HTMLElement>>(null)
  const userAvatarUrl = `${import.meta.env.VITE_BACKEND_LARAVEL}${userAvatar}`

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }} data-testid="customAvatar">
      <Tooltip title={t("Settings")}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={userAvatarUrl}>{userInitials}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            navigate(`user/${userId}`)
            handleCloseUserMenu()
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }} src={userAvatarUrl}>{userInitials}</Avatar>
          <Typography textAlign="center">{t("My profile")}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logout()} disabled={isLogoutLoading}>
          <ListItemIcon>
            {isLogoutLoading ? <CircularProgress size={20} sx={{ color: logoutLoadingColor }} /> : <LogoutIcon />}
          </ListItemIcon>
          <Typography textAlign="center">{t("Logout")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
