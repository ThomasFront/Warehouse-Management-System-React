import { t } from "i18next"
import { Box, Paper } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { FormWrapperType } from "./types"

export const FormWrapper = ({ children, submitButton, onSubmit }: FormWrapperType) => {
  const { name, icon, loading } = submitButton

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{ p: 2 }}
    >
      <Box>
        {children}
      </Box>
      <Box
        display="flex"
        justifyContent="end"
        mt={2}
      >
        <LoadingButton
          startIcon={icon}
          type="submit"
          loading={loading}
          color="secondary"
        >
          {t(name)}
        </LoadingButton>
      </Box>
    </Paper>
  )
}
