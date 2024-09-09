import { useState } from "react"
import { useTranslation } from "react-i18next"
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Nullable } from '../../../types/common'
import { useLogout } from '../../../hooks/useLogout'
import { useNavigate } from "react-router"

export const CustomAvatar = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { logout, isLogoutLoading } = useLogout()
  const navigate = useNavigate()
  const logoutLoadingColor = theme.palette.grey[600]
  const [anchorElUser, setAnchorElUser] = useState<Nullable<HTMLElement>>(null)

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
          <Avatar />
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
        <MenuItem onClick={() => {
          navigate("my-profile")
          handleCloseUserMenu()
        }}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
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
