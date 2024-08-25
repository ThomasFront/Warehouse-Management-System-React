import { Backdrop, BackdropProps, CircularProgress, useTheme } from "@mui/material"

export const FullScreenLoading = ({ ...props }: BackdropProps) => {
  const theme = useTheme()
  const primaryColor = theme.palette.primary.main

  return (
    <Backdrop
      sx={{
        zIndex: 2000,
        backgroundColor: primaryColor,
        color: "#fff"
      }}
      {...props}
      data-testid="backdrop"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
