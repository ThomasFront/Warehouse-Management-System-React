import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { DashboardDataItemType } from './types'
import { Link } from 'react-router-dom'
import { AnimationWrapper } from '../AnimationWrapper'

export const DashboardDataItem = ({ title, icon, count, color, navigateTo, isLoading }: DashboardDataItemType) => {
  const { t } = useTranslation()
  const showCurrency = title === "Total sales"

  return (
    <Link to={navigateTo}>
      <Box
        position="relative"
        overflow="hidden"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        minHeight={150}
        borderRadius={1}
        bgcolor={color}
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s",
          borderBottom: "4px solid rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "scale(1.004)"
          }
        }}
      >
        <Box>
          <Typography
            color="#fff"
            fontSize={36}
            fontWeight="bold"
          >
            {isLoading ? 0 : count}{showCurrency && <span style={{ fontSize: 16 }} >PLN</span>}
          </Typography>
          <Typography
            color="#fff"
            fontSize={18}
          >
            {t(title)}
          </Typography>
        </Box>
        <AnimationWrapper>
          {icon}
        </AnimationWrapper>
        <Box
          position="absolute"
          bgcolor="rgba(255, 255, 255, 0.05)"
          left={-50}
          width={200}
          height={200}
          borderRadius={50}
        />
      </Box>
    </Link>
  )
}
