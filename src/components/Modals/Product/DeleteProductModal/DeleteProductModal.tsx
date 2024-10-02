import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalWrapper } from '../../ModalWrapper';
import { DeleteProductModalType } from './types';
import { useProduct } from '../../../../hooks/useProduct';

export const DeleteProductModal = ({ isOpen, onClose, productId }: DeleteProductModalType) => {
  const { t } = useTranslation()
  const { deleteProduct, isDeleteProductLoading } = useProduct()

  const handleDeleteProduct = async () => {
    if (productId) {
      const res = await deleteProduct(productId)

      if (res.status === 200) {
        onClose()
      }
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete product"
      agreeButton={{
        text: "Delete",
        icon: <DeleteIcon />,
        onClick: handleDeleteProduct,
        loading: isDeleteProductLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: onClose,
      }}
    >
      <Typography>{t("Are you sure you want to delete this product?")}</Typography>
    </ModalWrapper>
  )
}
