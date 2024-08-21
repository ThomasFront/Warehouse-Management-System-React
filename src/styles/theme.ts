import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4944FF"
    },
    secondary: {
      main: "#663399"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: "contained"
      }
    },
  }
})