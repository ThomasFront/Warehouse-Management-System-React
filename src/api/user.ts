import { CreateUserFormType } from "../components/Forms/CreateUserForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

type GetCurrentUserResponseType = ApiAxiosResponse<{
  user: UserType
}>

type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  colorTheme: string
  createdAt: string
}

type CreateNewUserResponseType = ApiAxiosResponse<{
  message: string
}>

export const getCurrentUser = () => backendApi.get<GetCurrentUserResponseType>("auth/me").then(({data}) => data.data.user)

export const createNewUser = (userData: CreateUserFormType) => backendApi.post<CreateNewUserResponseType>("auth/register", userData)