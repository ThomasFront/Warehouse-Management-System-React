import { LoginFormType } from "../components/LoginForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

type LoginUserResponseType = ApiAxiosResponse<{
  token: string
}>

export const loginUser = (userData: LoginFormType) => backendApi.post<LoginUserResponseType>("auth/login", userData)