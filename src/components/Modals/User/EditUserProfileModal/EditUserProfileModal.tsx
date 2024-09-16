import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Box } from "@mui/material";
import { ModalWrapper } from "../../ModalWrapper"
import { EditUserProfileFormType, EditUserProfileModalType } from "./types"
import { updateUserProfileSchema } from "../../../../utils/schema";
import { TextFieldWithControl } from "../../../TextFieldWithControl";
import { useUser } from "../../../../hooks/useUser";
import { FileUploader } from "../../../FileUploader";
import { Nullable } from "../../../../types/common";
import { uploadAvatar } from "../../../../api/user";
import { removeEmptyStrings } from "../../../../utils/common";

export const EditUserProfileModal = ({ isOpen, onClose, user }: EditUserProfileModalType) => {
  const { t } = useTranslation()
  const [avatarUrl, setAvatarUrl] = useState("")
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const { editProfile, isEditProfileLoading } = useUser(user?.id.toString())
  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<EditUserProfileFormType>({
    resolver: yupResolver(updateUserProfileSchema)
  })

  const onSubmit: SubmitHandler<EditUserProfileFormType> = async (data) => {
    if (user) {
      const payload = {
        ...data,
        avatarUrl,
        id: user.id
      }

      const clearedPayload = removeEmptyStrings(payload)

      const res = await editProfile(clearedPayload)

      if (res.status === 200) {
        closeAndClearErrors()
      }
    }
  }

  const onFileUpload = async (file: Nullable<File>) => {
    if (file) {
      const fileName = file.name
      try {
        const { data } = await uploadAvatar(file, setProgress)

        setAvatarUrl(data.data.avatarUrl)
        setUploadedFileName(fileName)
      } catch {
        toast.error(t("Failed to upload avatar"))
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
        <FileUploader
          fileName={uploadedFileName}
          progress={progress}
          onChange={onFileUpload}
        />
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
