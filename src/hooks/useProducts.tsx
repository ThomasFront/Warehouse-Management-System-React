import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, CreateProductRequestType } from "../api/product";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";

export const useProducts = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: createProduct, isPending: isCreateProductsLoading } = useMutation({
    mutationFn: (productData: CreateProductRequestType) => addProduct(productData),
    onSuccess: () => {
      toast.success(t("The product has been added"))
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to add product")
  });

  return {
    createProduct,
    isCreateProductsLoading
  }
}
