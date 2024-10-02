import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";
import { AddMessageFormType } from "../components/Forms/AddMessageForm/types";
import { addMessage, deleteUserMessage, EditMessagePayloadType, editUserMessage, getMessages } from "../api/message";

export const useMessage = (shouldGetMessages = false, page = 1) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutate: createMessage, isPending: isCreateMessageLoading } = useMutation({
    mutationFn: (messageData: AddMessageFormType) => addMessage(messageData),
    onSuccess: () => {
      toast.success(t("The message has been added"))
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to add message")
  });

  const { data: messages, isLoading: areMessagesLoading, isRefetching: areMessagesRefetching } = useQuery({
    queryKey: ["messages", page],
    queryFn: () => getMessages(page),
    enabled: shouldGetMessages
  })

  const { mutateAsync: deleteMessage, isPending: isDeleteMessageLoading } = useMutation({
    mutationFn: (messageId: number) => deleteUserMessage(messageId),
    onSuccess: () => {
      toast.success(t("The message has been removed"))
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to delete message")
  });

  const { mutateAsync: updateMessage, isPending: isUpdateMessageLoading } = useMutation({
    mutationFn: (message: EditMessagePayloadType) => editUserMessage(message),
    onSuccess: () => {
      toast.success(t("The message has been edited"))
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to edit message")
  });

  return {
    messages,
    areMessagesLoading,
    areMessagesRefetching,
    createMessage,
    isCreateMessageLoading,
    deleteMessage,
    isDeleteMessageLoading,
    updateMessage,
    isUpdateMessageLoading
  }
}
