import { backendApi } from "../config/axios";
import { ApiAxiosResponse } from "../types/axios";

export type MenuItemType = {
  id: number
  name: string
  url?: string
  sublinks?: MenuType
}

type MenuType = {
  menu: MenuItemType[]
}

type MenuResponseType = ApiAxiosResponse<MenuType>

export const getMenu = () => backendApi.get<MenuResponseType>("menu").then(({data}) => data.data.menu)