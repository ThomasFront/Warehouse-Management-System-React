import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CircleIcon from '@mui/icons-material/Circle';
import TimelineIcon from '@mui/icons-material/Timeline';
import StarIcon from '@mui/icons-material/Star';

export const handleMenuItemIcon = (menuItemName: string) => {
  switch (menuItemName) {
    case "Dashboard":
      return <DashboardIcon />
    case "Products":
      return <WarehouseIcon />
    case "Categories":
      return <CategoryIcon />
    case "Sales":
      return <PaidIcon />
    case "Sales history":
      return <TimelineIcon />
    case "My profile":
      return <AccountCircleIcon />
    case "Messages":
      return <ForumIcon />
    case "Users":
      return <SupervisedUserCircleIcon />
    case "Product list":
    case "Category list":
    case "Message list":
    case "User list":
      return <FormatListBulletedIcon />
    case "Add product":
    case "Add category":
    case "Add message":
    case "Add sale":
      return <AddCircleOutlineIcon />
    case "Add user":
      return (
        <>
          <AddCircleOutlineIcon />
          <StarIcon sx={{ mb: 0.5, color: "#ffd32c" }} />
        </>
      )
    default:
      return <CircleIcon />
  }
}