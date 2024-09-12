import { LoginFormType } from "../components/Forms/LoginForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse } from "../types/axios";

type LoginUserResponseType = ApiAxiosResponse<{
  token: string
}>

export const loginUser = (userData: LoginFormType) => backendApi.post<LoginUserResponseType>("auth/login", userData).then(({data}) => data)

export const logoutUser = () => backendApi.post<ApiAxiosWithMessageResponse>("auth/logout").then(() => localStorage.removeItem("token")) 