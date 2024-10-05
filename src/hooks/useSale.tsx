import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSale, exportSalesToCsv } from '../api/sale';
import { AddSaleFormType } from '../components/Forms/AddSaleForm/types';
import { ApiAxiosErrorResponse } from '../types/axios';
import { showApiErrorMessage } from '../utils/error';

export const useSale = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutate: addNewSale, isPending: isAddNewSaleLoading } = useMutation({
    mutationFn: (productData: AddSaleFormType) => addSale(productData),
    onSuccess: () => {
      toast.success(t("The sale has been added"))
      queryClient.invalidateQueries({ queryKey: ["sales"] })
      queryClient.invalidateQueries({ queryKey: ["product"] })
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Failed to add sale")
  });

  const { mutate: exportToCsv, isPending: isExportToCsvLoading } = useMutation({
    mutationFn: () => exportSalesToCsv(),
    onSuccess: () => {
      toast.success(t("Exported sales histories to CSV"))
    },
    onError: (err: ApiAxiosErrorResponse) => showApiErrorMessage(err, t, "Export of sales history to CSV file failed")
  });

  return {
    addNewSale,
    isAddNewSaleLoading,
    exportToCsv,
    isExportToCsvLoading
  }
}
