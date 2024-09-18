import { MessageType } from "../../../../api/message";
import { Nullable } from "../../../../types/common";
import { CommonModalType } from "../../ModalWrapper/types";

export type EditMessageModalType = {
  message: Nullable<MessageType>
} & CommonModalType

export type EditMessageFormType = {
  title: string
  priority: string
  message: string
}