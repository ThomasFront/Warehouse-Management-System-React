import { AddMessageFormType } from "../components/Forms/AddMessageForm/types";
import { backendApi } from "../config/axios";
import { ApiAxiosResponse, ApiCollectionResponse } from "../types/axios";
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

export const addMessage = (messageData: AddMessageFormType) => backendApi.post<CreateMessageResponseType>("messages", messageData)

export const getMessages = () => backendApi.get<GetMessagesResponseType>("messages").then(({data}) => data)