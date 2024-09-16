import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";
import { AddMessageFormType } from "../components/Forms/AddMessageForm/types";
import { addMessage, getMessages } from "../api/message";

export const useMessage = (shouldGetMessages = false) => {
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

  const { data: messages, isLoading: areMessagesLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    enabled: shouldGetMessages
  })

  return {
    messages,
    areMessagesLoading,
    createMessage,
    isCreateMessageLoading
  }
}
