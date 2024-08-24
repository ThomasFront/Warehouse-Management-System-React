import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F7446A"
    },
    secondary: {
      main: "#663399"
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: "contained"
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5"
        }
      }
    }
  }
})