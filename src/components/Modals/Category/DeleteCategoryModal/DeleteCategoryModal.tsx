import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCategoryModalType } from "./types"
import { ModalWrapper } from '../../ModalWrapper';
import { useCategory } from '../../../../hooks/useCategory';

export const DeleteCategoryModal = ({ isOpen, onClose, categoryId }: DeleteCategoryModalType) => {
  const { t } = useTranslation()
  const { deleteCategory, isDeleteCategoryLoading } = useCategory()

  const handleDeleteProductCategory = async () => {
    if (categoryId) {
      const res = await deleteCategory(categoryId)

      if (res.status === 200) {
        onClose()
      }
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete category"
      agreeButton={{
        text: "Delete",
        icon: <DeleteIcon />,
        onClick: handleDeleteProductCategory,
        loading: isDeleteCategoryLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: onClose,
      }}
    >
      <Typography>{t("Are you sure you want to delete this product category?")}</Typography>
    </ModalWrapper>
  )
}
