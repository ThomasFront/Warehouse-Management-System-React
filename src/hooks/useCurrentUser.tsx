import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../api/user"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export const useCurrentUser = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  })

  const isAdmin = currentUser?.role === "admin"

  if (!isCurrentUserLoading && !currentUser) {
    toast.error(t("There was an authentication problem, please log in again"))
    navigate("/")
  }

  return { currentUser, isCurrentUserLoading, isAdmin }
}
