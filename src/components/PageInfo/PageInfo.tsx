import { Box, Typography, useTheme } from "@mui/material"
import { PageInfoType } from "./types"
import { useTranslation } from "react-i18next"

export const PageInfo = ({ title, subtitle }: PageInfoType) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const subtitleColor = theme.palette.grey['600']

  return (
    <Box>
      <Typography component="h1" fontSize={20}>{t(title)}</Typography>
      <Typography component="h2" color={subtitleColor} fontSize={14}>{t(subtitle)}</Typography>
    </Box>
  )
}
