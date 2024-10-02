import { ProductType } from "../../../../api/product"
import { Nullable } from "../../../../types/common"
import { AddProductFormType } from "../../../Forms/AddProductForm/types"
import { CommonModalType } from "../../ModalWrapper/types"

export type EditProductModalType = {
  product: Nullable<ProductType>
} & CommonModalType

export type EditProductPayloadType = AddProductFormType & {
  id: number
  productImageUrl?: string
}