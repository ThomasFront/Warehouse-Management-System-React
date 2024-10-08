import { Box, Grid } from "@mui/material"
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import { PageInfo } from "../../components/PageInfo"
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardDataItem } from "../../components/DashboardDataItem"
import { DashboardCharts } from "../../components/DashboardCharts";

export const Dashboard = () => {
  const { dashboardData, isDashboardDataLoading } = useDashboard()
  const iconColor = "rgba(0, 0, 0, 0.2)"
  const userCount = dashboardData?.userCount
  const productCount = dashboardData?.productCount
  const categoryCount = dashboardData?.categoryCount
  const totalPrice = dashboardData?.totalPrice
  const monthlySales = dashboardData?.monthlySales
  const topProducts = dashboardData?.topProducts

  return (
    <Box>
      <PageInfo
        title="Dashboard"
        subtitle="The dashboard provides a complete overview of the most important data that allows you to effectively manage and analyze your business"
      />
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardDataItem
            title="Users"
            icon={<SupervisedUserCircleIcon sx={{ color: iconColor, fontSize: 48 }} />}
            count={userCount}
            color="#47a3ec"
            navigateTo="/user-list"
            isLoading={isDashboardDataLoading}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardDataItem
            title="Products"
            icon={<WarehouseIcon sx={{ color: iconColor, fontSize: 48 }} />}
            count={productCount}
            color="#b746d6"
            navigateTo="/product-list"
            isLoading={isDashboardDataLoading}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardDataItem
            title="Categories"
            icon={<CategoryIcon sx={{ color: iconColor, fontSize: 48 }} />}
            count={categoryCount}
            color="#ff9f50"
            navigateTo="/category-list"
            isLoading={isDashboardDataLoading}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <DashboardDataItem
            title="Total sales"
            icon={<PaidIcon sx={{ color: iconColor, fontSize: 48 }} />}
            count={totalPrice}
            color="#02b2af"
            navigateTo="/sales-history"
            isLoading={isDashboardDataLoading}
          />
        </Grid>
      </Grid>
      <DashboardCharts
        monthlySales={monthlySales}
        topProducts={topProducts}
      />
    </Box>
  )
}
