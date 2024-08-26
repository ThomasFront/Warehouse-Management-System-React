import { CategoryType } from "../../../api/category";
import { Nullable } from "../../../types/common";
import { CommonModalType } from "../ModalWrapper/types";

export type EditCategoryModalType = {
  category: Nullable<CategoryType>
} & CommonModalType

export type EditCategoryFormType = {
  name: string
}