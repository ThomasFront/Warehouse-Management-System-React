import { Box, Typography } from "@mui/material"
import { FancyDataItemType } from "./types"

export const FancyDataItem = ({ label, value, colorTheme }: FancyDataItemType) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height="100%"
      data-testid="fancyDataItem"
    >
      <Box width={3} height={"100%"} bgcolor={colorTheme} />
      <Box>
        <Typography color={colorTheme}>{label}</Typography>
        <Typography>{value}</Typography>
      </Box>
    </Box>
  )
}
