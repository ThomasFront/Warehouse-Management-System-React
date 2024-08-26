import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createTheme } from "@mui/material";
import { plPL, enUS } from '@mui/x-data-grid';

export const useThemeWithLanguage = () => {
  const { i18n } = useTranslation();

  const theme = useMemo(() => {
    const locale = i18n.language === "pl" ? plPL : enUS;

    return createTheme({
      palette: {
        primary: {
          main: "#F7446A"
        },
        secondary: {
          main: "#2f4858"
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
        },
        MuiDataGrid: {
          styleOverrides: {
            root: {
              backgroundColor: "#FFF"
            },
            columnHeaderTitle: {
              fontWeight: "bold"
            },
          },
        },
      },
    }, locale);
  }, [i18n.language]);

  return theme;
}
