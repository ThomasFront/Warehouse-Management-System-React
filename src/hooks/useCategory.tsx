import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryType, createProductCategory, deleteProductCategory, editProductCategory } from "../api/category";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";

export const useCategory = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutate: createCategory, isPending: isCreateCategoryLoading } = useMutation({
    mutationFn: (categoryName: Omit<CategoryType, 'id'>) => createProductCategory(categoryName),
    onSuccess: () => {
      toast.success(t("The product category has been added"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to add product category")
  });

  const { mutateAsync: updateCategory, isPending: isUpdateCategoryLoading } = useMutation({
    mutationFn: (category: CategoryType) => editProductCategory(category),
    onSuccess: () => {
      toast.success(t("The product category has been edited"))
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to edit product category")
  });

  const { mutateAsync: deleteCategory, isPending: isDeleteCategoryLoading } = useMutation({
    mutationFn: (categoryId: number) => deleteProductCategory(categoryId),
    onSuccess: () => {
      toast.success(t("The product category has been removed"))
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to delete product category")
  });

  return {
    createCategory,
    isCreateCategoryLoading,
    updateCategory,
    isUpdateCategoryLoading,
    deleteCategory,
    isDeleteCategoryLoading
  };
}
