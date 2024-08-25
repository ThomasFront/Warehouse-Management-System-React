import { Box, CircularProgress } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useEffect } from "react"

export const UserAdd = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isAdmin, isCurrentUserLoading } = useCurrentUser()

  useEffect(() => {
    if (!isAdmin && !isCurrentUserLoading) {
      navigate("/dashboard")
      toast.error(t("You do not have permission to view this subpage"))
    }
  }, [isAdmin, isCurrentUserLoading, navigate, t])

  if (isCurrentUserLoading) return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  )

  return (
    <Box>
      <PageInfo
        title="Add user"
        subtitle="On this page, available only to administrators, you can add a new user to the system. Complete the form to enter your new account details"
      />
    </Box>
  )
}
