import { AxiosResponse } from "axios";
import { backendApi } from "../config/axios";
import { DropdownVariant } from "../hooks/useDropdownProvider";

export type DropdownItemType = {
  label: string
  value: string | number
}

export type DropdownResponseType = AxiosResponse<{
  dropdown: DropdownItemType[]
}>

export const getDropdownProvider = (name: DropdownVariant) => backendApi.get<DropdownResponseType>(`${name}/dropdown`).then(({data}) => data.data.dropdown)