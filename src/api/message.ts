import { AddMessageFormType } from "../components/Forms/AddMessageForm/types";
import { EditMessageFormType } from "../components/Modals/Message/EditMessageModal/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiAxiosWithMessageResponse, ApiCollectionResponse } from "../types/axios";
import { UserType } from "./user";

export type MessageType = {
  id: number
  title: string
  message: string
  priority: string
  createdAt: string,
  user: UserMessageType
}

type UserMessageType = Omit<UserType, "email" | "colorTheme">

export type CreateMessageResponseType = ApiAxiosResponse<{
  message: MessageType
}>

type GetMessagesResponseType = ApiCollectionResponse<MessageType>

export type EditMessagePayloadType = EditMessageFormType & {
  id: number
}

export const addMessage = (messageData: AddMessageFormType) => backendApi.post<CreateMessageResponseType>("messages", messageData)

export const getMessages = (page: number) => backendApi.get<GetMessagesResponseType>("messages", {
  params: {
    page
  }
}).then(({data}) => data)

export const deleteUserMessage = (id: number) => backendApi.delete<ApiAxiosWithMessageResponse>(`messages/${id}`)

export const editUserMessage = ({id, ...props}: EditMessagePayloadType) => backendApi.patch<CreateMessageResponseType>(`messages/${id}`, props)
