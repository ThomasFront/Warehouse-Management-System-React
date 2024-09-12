import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewUser, deleteUserById, editUser } from "../api/user";
import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";
import { EditUserFormType } from "../components/Modals/User/EditUserModal/types";

export const useUser = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutate: createUser, isPending: isCreateUserLoading } = useMutation({
    mutationFn: (userData: CreateUserFormType) => createNewUser(userData),
    onSuccess: () => {
      toast.success(t("The user has been created"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to create new user")
  });

  const { mutateAsync: deleteUser, isPending: isDeleteUserLoading } = useMutation({
    mutationFn: (userId: number) => deleteUserById(userId),
    onSuccess: () => {
      toast.success(t("The user has been removed"))
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to delete user")
  });

  const { mutateAsync: updateUser, isPending: isUpdateUserLoading } = useMutation({
    mutationFn: (userData: EditUserFormType) => editUser(userData),
    onSuccess: () => {
      toast.success(t("The user has been edited"))
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to edit user")
  });

  return {
    createUser,
    isCreateUserLoading,
    deleteUser,
    isDeleteUserLoading,
    updateUser,
    isUpdateUserLoading
  }
}