import { TFunction } from "i18next";
import { toast } from "react-toastify";
import { ApiAxiosErrorResponse } from "../types/axios";

export const showApiErrorMessage = (err: ApiAxiosErrorResponse, t: TFunction, defaultMessage: string) => {
  const errorMessage = err.response?.data.message

  if (errorMessage) {
    toast.error(t(errorMessage));
  } else {
    toast.error(t(defaultMessage));
  }
}