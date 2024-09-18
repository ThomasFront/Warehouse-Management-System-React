import { ChangeEvent } from "react";
import { MetaType } from "../../types/axios";

export type CustomPaginationType =  {
  page: number
  onChange: (event: ChangeEvent<unknown>, page: number) => void | undefined
  meta?: MetaType
}