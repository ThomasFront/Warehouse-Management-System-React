import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { CategoryType, createProductCategory } from "../api/category";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";

export const useCategory = () => {
  const { t } = useTranslation()

  const { mutate: createCategory, isPending: isCreateCategoryLoading } = useMutation({
    mutationFn: (categoryName: Omit<CategoryType, 'id'>) => createProductCategory(categoryName),
    onSuccess: () => {
      toast.success(t("The product category has been added"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to add product category")
  });

  return { createCategory, isCreateCategoryLoading };
}
