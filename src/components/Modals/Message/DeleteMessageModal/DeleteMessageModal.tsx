import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalWrapper } from '../../ModalWrapper';
import { DeleteMessageModalType } from './types';
import { useMessage } from '../../../../hooks/useMessage';

export const DeleteMessageModal = ({ isOpen, onClose, messageId }: DeleteMessageModalType) => {
  const { t } = useTranslation()
  const { deleteMessage, isDeleteMessageLoading } = useMessage()

  const handleDeleteMessageCategory = async () => {
    if (messageId) {
      const res = await deleteMessage(messageId)

      if (res.status === 200) {
        onClose()
      }
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete message"
      agreeButton={{
        text: "Delete",
        icon: <DeleteIcon />,
        onClick: handleDeleteMessageCategory,
        loading: isDeleteMessageLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: onClose,
      }}
    >
      <Typography>{t("Are you sure you want to delete this message?")}</Typography>
    </ModalWrapper>
  )
}
