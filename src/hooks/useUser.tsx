import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewUser } from "../api/user";
import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";

export const useUser = () => {
  const { t } = useTranslation()

  const { mutate: createUser, isPending: isCreateUserLoading } = useMutation({
    mutationFn: (userData: CreateUserFormType) => createNewUser(userData),
    onSuccess: () => {
      toast.success(t("The user has been created"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to create new user")
  });

  return {
    createUser,
    isCreateUserLoading
  }
}