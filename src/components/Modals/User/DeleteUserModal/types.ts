import { Nullable } from "../../../../types/common"
import { CommonModalType } from "../../ModalWrapper/types"

export type DeleteUserModalType = {
  userId?: Nullable<number>
} & CommonModalType