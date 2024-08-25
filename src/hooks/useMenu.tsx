import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { getMenu } from "../api/menu"

export const useMenu = () => {
  const { t } = useTranslation()

  const { data: menu, isLoading: isMenuLoading, isError: isMenuError } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  })

  if (isMenuError) {
    toast.error(t("An error occurred while downloading the menu"))
  }

  return { menu, isMenuLoading }
}
