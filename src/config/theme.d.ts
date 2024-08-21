import { LoadingButtonProps } from "@mui/lab";

declare module '@mui/material/styles' {
  interface Components {
    MuiLoadingButton?: {
      defaultProps?: Partial<LoadingButtonProps>;
    };
  }

  interface ComponentsPropsList {
    MuiLoadingButton: LoadingButtonProps;
  }
}