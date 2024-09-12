import { UserType } from "../../../../api/user"
import { Nullable } from "../../../../types/common"
import { CreateUserFormType } from "../../../Forms/CreateUserForm/types"
import { CommonModalType } from "../../ModalWrapper/types"

export type EditUserModalType = {
  user: Nullable<UserType>
} & CommonModalType

export type EditUserFormType = Omit<CreateUserFormType, "password"> & {
  id?: number;
  colorTheme?: string;
  password?: Nullable<string>
}

