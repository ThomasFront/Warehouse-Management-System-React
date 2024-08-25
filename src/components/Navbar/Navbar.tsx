import { useState } from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StarIcon from '@mui/icons-material/Star';
import { Skeleton, Tooltip } from '@mui/material';
import { AppBar, DrawerHeader, drawerWidth, Main } from './styledComponents';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { FullScreenLoading } from '../FullScreenLoading';
import { useMenu } from '../../hooks/useMenu';
import { MenuItem } from './MenuItem';
import { LanguageSelector } from '../LanguageSelector';
import { CustomAvatar } from './CustomAvatar';

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { menu, isMenuLoading } = useMenu()
  const { currentUser, isCurrentUserLoading } = useCurrentUser()
  const isAdmin = currentUser?.role === 'admin'
  const userData = isCurrentUserLoading ? <Skeleton width={175} height={40} /> : <Typography>{currentUser?.firstName} {currentUser?.lastName}</Typography>

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const menuLoadingSkeleton = Array.from(new Array(7)).map((_, index) => (
    <Skeleton key={index} height={50} sx={{ mx: 1 }} />
  ))

  return (
    <Box sx={{ display: 'flex' }}>
      <FullScreenLoading open={isCurrentUserLoading} />
      <CssBaseline />
      <AppBar
        position="fixed"
        open={isDrawerOpen}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{
                display: { xs: "none", md: "block" }
              }}
            >
              Warehouse Management System
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              {isAdmin && (
                <Tooltip title="Admin">
                  <StarIcon sx={{ mb: 0.5, color: "#ffd32c" }} />
                </Tooltip>
              )}
              {userData}
            </Box>
            <CustomAvatar />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <LanguageSelector />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {isMenuLoading ? menuLoadingSkeleton : menu?.map(item => <MenuItem key={item.id} item={item} />)}
      </Drawer>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}