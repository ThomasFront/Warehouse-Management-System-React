import { useState } from "react"
import { useTranslation } from "react-i18next"
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Nullable } from '../../../types/common'
import { useLogout } from '../../../hooks/useLogout'

export const CustomAvatar = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { logout, isLogoutLoading } = useLogout()
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
