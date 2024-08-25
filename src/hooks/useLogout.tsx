import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logoutUser } from "../api/auth";

export const useLogout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: logout, isPending: isLogoutLoading } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      toast.error(t("Logout failed, please try again"));
    },
  });

  return { logout, isLogoutLoading };
}
