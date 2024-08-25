import { LoginFormType } from "../components/Forms/LoginForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

type LoginUserResponseType = ApiAxiosResponse<{
  token: string
}>

type LogoutUserResponseType = ApiAxiosResponse<{
  message: string
}>

export const loginUser = (userData: LoginFormType) => backendApi.post<LoginUserResponseType>("auth/login", userData).then(({data}) => data)

export const logoutUser = () => backendApi.post<LogoutUserResponseType>("auth/logout").then(() => localStorage.removeItem("token")) 