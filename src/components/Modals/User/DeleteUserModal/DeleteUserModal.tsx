import { useTranslation } from "react-i18next"
import { Typography } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { DeleteUserModalType } from "./types"
import { ModalWrapper } from "../../ModalWrapper"
import { useUser } from "../../../../hooks/useUser";

export const DeleteUserModal = ({ isOpen, onClose, userId }: DeleteUserModalType) => {
  const { t } = useTranslation()
  const { deleteUser, isDeleteUserLoading } = useUser()

  const handleDeleteUser = async () => {
    if (userId) {
      const res = await deleteUser(userId)

      if (res.status === 200) {
        onClose()
      }
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete user"
      agreeButton={{
        text: "Delete",
        icon: <PersonRemoveIcon />,
        onClick: handleDeleteUser,
        loading: isDeleteUserLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: onClose,
      }}
    >
      <Typography>{t("Are you sure you want to delete this user?")}</Typography>
    </ModalWrapper>
  )
}
