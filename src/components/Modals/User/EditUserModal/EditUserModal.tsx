import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { ModalWrapper } from "../../ModalWrapper"
import { updateUserSchema } from "../../../../utils/schema";
import { EditUserFormType, EditUserModalType } from "./types"
import { TextFieldWithControl } from "../../../TextFieldWithControl";
import { roleOptions } from "../../../../utils/constants";
import { SelectWithControl } from "../../../SelectWithControl";
import { useUser } from "../../../../hooks/useUser";
import { removeEmptyStrings } from "../../../../utils/common";

export const EditUserModal = ({ isOpen, onClose, user }: EditUserModalType) => {
  const { t } = useTranslation()
  const { updateUser, isUpdateUserLoading } = useUser()

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<EditUserFormType>({
    resolver: yupResolver(updateUserSchema)
  })

  const onSubmit: SubmitHandler<EditUserFormType> = async (data) => {
    const clearedData = removeEmptyStrings(data)
    if (user) {
      const payload = {
        ...clearedData,
        id: user.id
      }

      const res = await updateUser(payload)

      if (res.status === 200) {
        onClose()
      }
    }
  }

  const closeAndClearErrors = () => {
    onClose()
    clearErrors()
  }

  useEffect(() => {
    setValue("firstName", user?.firstName || "")
    setValue("lastName", user?.lastName || "")
    setValue("role", user?.role || "")
    setValue("email", user?.email || "")
  }, [user, setValue])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeAndClearErrors}
      title="Edit user"
      agreeButton={{
        text: "Save",
        icon: <SaveAsIcon />,
        onClick: handleSubmit(onSubmit),
        loading: isUpdateUserLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: closeAndClearErrors,
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextFieldWithControl
          name="firstName"
          label="First name"
          requiredSign
          control={control}
          errors={errors}
          data-testid="firstName"
        />
        <TextFieldWithControl
          name="lastName"
          label="Last name"
          requiredSign
          control={control}
          errors={errors}
          data-testid="lastName"
        />
        <SelectWithControl
          name="role"
          label="Role"
          requiredSign
          control={control}
          errors={errors}
          options={roleOptions(t)}
          data-testid="role"
        />
        <TextFieldWithControl
          name="email"
          label="E-mail address"
          requiredSign
          control={control}
          errors={errors}
          data-testid="email"
        />
        <TextFieldWithControl
          name="password"
          label="New password"
          control={control}
          errors={errors}
          type="password"
          data-testid="newPassword"
        />
      </Box>
    </ModalWrapper>
  )
}
