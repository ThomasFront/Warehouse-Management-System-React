import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { EditUserFormType } from "../components/Modals/User/EditUserModal/types";
import { EditUserProfilePayloadType } from "../components/Modals/User/EditUserProfileModal/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse } from "../types/axios";
import { Nullable } from "../types/common";

type UserResponseType = ApiAxiosResponse<{
  user: UserType
}>

type UploadAvatarResponseType = ApiAxiosResponse<{
  avatarUrl: string
}>

export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  colorTheme: string
  createdAt: string
  avatar: Nullable<string>
}

export const getCurrentUser = () => backendApi.get<UserResponseType>("auth/me").then(({data}) => data.data.user)

export const createNewUser = (userData: CreateUserFormType) => backendApi.post<ApiAxiosWithMessageResponse>("auth/register", userData)

export const deleteUserById = (userId: number) => backendApi.delete<ApiAxiosWithMessageResponse>(`users/${userId}`)

export const editUser = (userData: EditUserFormType) => backendApi.patch<UserResponseType>(`users/${userData.id}`, userData)

export const editUserProfile = (userData: EditUserProfilePayloadType) => backendApi.patch<ApiAxiosWithMessageResponse>(`users/${userData.id}/profile`, userData)

export const getUserById = (userId?: string) => backendApi.get<UserResponseType>(`users/${userId}`).then(({data}) => data.data.user)

export const uploadAvatar = (file: File, onUploadProgress: (progress: number) => void) => {
  const formData = new FormData()
  formData.append('image', file)

  return backendApi.post<UploadAvatarResponseType>("users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => onUploadProgress(Math.round((progressEvent.loaded / (progressEvent?.total || 0)) * 100))
  })
}