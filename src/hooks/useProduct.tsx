import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, CreateProductRequestType, destroyProduct, editMessage, exportProductsToCsv, getProductById } from "../api/product";
import { ApiAxiosErrorResponse } from "../types/axios";
import { showApiErrorMessage } from "../utils/error";
import { EditProductPayloadType } from "../components/Modals/Product/EditProductModal/types";

export const useProduct = (productId?: number) => {
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

  const { mutateAsync: deleteProduct, isPending: isDeleteProductLoading } = useMutation({
    mutationFn: (productId: number) => destroyProduct(productId),
    onSuccess: () => {
      toast.success(t("The product has been removed"))
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to delete product")
  });

  const { mutateAsync: updateProduct, isPending: isUpdateProductLoading } = useMutation({
    mutationFn: (product: EditProductPayloadType) => editMessage(product),
    onSuccess: () => {
      toast.success(t("The product has been edited"))
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to edit product")
  });

  const { mutate: exportToCsv, isPending: isExportToCsvLoading } = useMutation({
    mutationFn: () => exportProductsToCsv(),
    onSuccess: () => {
      toast.success(t("Exported product list to CSV"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Export of products history to CSV file failed")
  });

  const { data: product, isLoading: isProductLoading, isError: isProductError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId
  })

  useEffect(() => {
    if (productId && isProductError) {
      toast.error(t("Product download failed"))
    }
  }, [productId, isProductError, t])

  return {
    createProduct,
    isCreateProductsLoading,
    deleteProduct,
    isDeleteProductLoading,
    updateProduct,
    isUpdateProductLoading,
    product,
    isProductLoading,
    exportToCsv,
    isExportToCsvLoading
  }
}
