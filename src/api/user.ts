import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { EditUserFormType } from "../components/Modals/User/EditUserModal/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse } from "../types/axios";

type UserResponseType = ApiAxiosResponse<{
  user: UserType
}>

export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  colorTheme: string
  createdAt: string
}

export const getCurrentUser = () => backendApi.get<UserResponseType>("auth/me").then(({data}) => data.data.user)

export const createNewUser = (userData: CreateUserFormType) => backendApi.post<ApiAxiosWithMessageResponse>("auth/register", userData)

export const deleteUserById = (userId: number) => backendApi.delete<ApiAxiosWithMessageResponse>(`users/${userId}`)

export const editUser = (userData: EditUserFormType) => backendApi.patch<UserResponseType>(`users/${userData.id}`, userData)