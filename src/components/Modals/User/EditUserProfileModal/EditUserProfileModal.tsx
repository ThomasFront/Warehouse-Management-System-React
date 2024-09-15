import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Box } from "@mui/material";
import { ModalWrapper } from "../../ModalWrapper"
import { EditUserProfileFormType, EditUserProfileModalType } from "./types"
import { updateUserProfileSchema } from "../../../../utils/schema";
import { TextFieldWithControl } from "../../../TextFieldWithControl";
import { useUser } from "../../../../hooks/useUser";

export const EditUserProfileModal = ({ isOpen, onClose, user }: EditUserProfileModalType) => {
  const { editProfile, isEditProfileLoading } = useUser(user?.id.toString())

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<EditUserProfileFormType>({
    resolver: yupResolver(updateUserProfileSchema)
  })

  const onSubmit: SubmitHandler<EditUserProfileFormType> = async (data) => {
    if (user) {
      const payload = {
        ...data,
        id: user.id
      }

      const res = await editProfile(payload)

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
    setValue("colorTheme", user?.colorTheme)
  }, [user, setValue])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeAndClearErrors}
      title="Edit profile"
      agreeButton={{
        text: "Save",
        icon: <SaveAsIcon />,
        onClick: handleSubmit(onSubmit),
        loading: isEditProfileLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: closeAndClearErrors,
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextFieldWithControl
          name="colorTheme"
          label="Color theme"
          requiredSign
          control={control}
          errors={errors}
          type="color"
          InputLabelProps={{
            shrink: true
          }}
          data-testid="colorTheme"
        />
      </Box>
    </ModalWrapper>
  )
}
