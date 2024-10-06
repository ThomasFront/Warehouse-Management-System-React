import { Box } from '@mui/material';
import { DashboardChartsProps } from './types';
import { MonthlySales } from './MonthlySales';
import { TopProducts } from './TopProducts';

export const DashboardCharts = ({ monthlySales, topProducts }: DashboardChartsProps) => {

  return (
    <Box>
      <MonthlySales monthlySales={monthlySales} />
      <TopProducts topProducts={topProducts} />
    </Box>
  )
}