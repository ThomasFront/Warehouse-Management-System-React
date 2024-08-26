import { LoadingButtonProps } from "@mui/lab";

declare module '@mui/material/styles' {
  interface Components {
    MuiLoadingButton?: {
      defaultProps?: Partial<LoadingButtonProps>;
    }
    
    MuiDataGrid?: {
      styleOverrides?: ComponentsOverrides['MuiDataGrid']
    }
  }

  interface ComponentsPropsList {
    MuiLoadingButton: LoadingButtonProps;
  }
}