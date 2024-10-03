import { useTranslation } from 'react-i18next'
import { Box, CircularProgress, Typography } from '@mui/material'
import { DashboardDataItemType } from './types'
import { Link } from 'react-router-dom'
import { AnimationWrapper } from '../AnimationWrapper'

export const DashboardDataItem = ({ title, icon, count, color, navigateTo, isLoading }: DashboardDataItemType) => {
  const { t } = useTranslation()

  return (
    <Link to={navigateTo}>
      <Box
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
            transform: "scale(1.02)"
          }
        }}
      >
        <Box>
          {isLoading ? <CircularProgress size={36} /> : <Typography color="#fff" fontSize={48} fontWeight="bold">{count}</Typography>
          }
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
      </Box>
    </Link>
  )
}
