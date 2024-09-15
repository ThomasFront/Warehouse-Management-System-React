import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewUser, deleteUserById, editUser, editUserProfile, getUserById } from "../api/user";
import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";
import { EditUserFormType } from "../components/Modals/User/EditUserModal/types";
import { useEffect } from "react";
import { EditUserProfilePayloadType } from "../components/Modals/User/EditUserProfileModal/types";

export const useUser = (userId?: string) => {
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

  const { mutateAsync: editProfile, isPending: isEditProfileLoading } = useMutation({
    mutationFn: (userData: EditUserProfilePayloadType) => editUserProfile(userData),
    onSuccess: () => {
      toast.success(t("The user profile has been edited"))
      queryClient.invalidateQueries({ queryKey: ["user", userId] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to edit user profile")
  });

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })

  useEffect(() => {
    if (userId && isUserError) {
      toast.error(t("User download failed"))
    }
  }, [userId, isUserError, t])

  const isAdmin = user?.role === "admin"

  return {
    createUser,
    isCreateUserLoading,
    deleteUser,
    isDeleteUserLoading,
    updateUser,
    isUpdateUserLoading,
    user,
    isAdmin,
    isUserLoading,
    isUserError,
    editProfile,
    isEditProfileLoading
  }
}