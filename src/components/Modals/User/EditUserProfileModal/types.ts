import { UserType } from "../../../../api/user"
import { CommonModalType } from "../../ModalWrapper/types"

export type EditUserProfileModalType = {
  user?: UserType
} & CommonModalType

export type EditUserProfileFormType = {
  colorTheme?: string
  avatarUrl?: string
}

export type EditUserProfilePayloadType = EditUserProfileFormType & {
  id?: number
}