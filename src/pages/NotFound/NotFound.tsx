import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { Box, Button, Typography } from "@mui/material"

export const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={1}
      minHeight="20vh"
    >
      <Typography component="h1">{t("We're sorry, but we can't find this page.")}</Typography>
      <Button
        onClick={() => navigate("/dashboard")}
      >
        {t("Return to the dashboard page")}
      </Button>
    </Box>
  )
}
