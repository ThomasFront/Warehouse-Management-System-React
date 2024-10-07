import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Grid, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from "../FormWrapper"
import { TextFieldWithControl } from '../../TextFieldWithControl';
import { createUserSchema } from '../../../utils/schema';
import { CreateUserFormType } from './types';
import { SelectWithControl } from '../../SelectWithControl';
import { roleOptions } from '../../../utils/constants';
import { getUserInitials, removeEmptyStrings, showImageAvatar } from '../../../utils/common';
import { useUser } from '../../../hooks/useUser';
import { FileUploader } from '../../FileUploader';
import { Nullable } from '../../../types/common';
import { uploadImage } from '../../../api/user';
import { toast } from 'react-toastify';

export const CreateUserForm = () => {
  const { t } = useTranslation()
  const { createUser, isCreateUserLoading } = useUser()
  const theme = useTheme()
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState("")
  const grayColor = theme.palette.grey[400]

  const { handleSubmit, formState: { errors }, control, watch } = useForm<CreateUserFormType>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      role: "user"
    }
  })

  const onFileUpload = async (file: Nullable<File>) => {
    if (file) {
      const fileName = file.name
      try {
        const { data } = await uploadImage(file, setProgress, "users/avatar")

        setAvatarUrl(data.data.image)
        setUploadedFileName(fileName)
      } catch {
        toast.error(t("Failed to upload avatar"))
      }
    }
  }

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const initials = useMemo(() => {
    return getUserInitials(firstName, lastName)
  }, [firstName, lastName])

  const onSubmit: SubmitHandler<CreateUserFormType> = (data) => {
    const payload = {
      ...data,
      avatarUrl
    }

    createUser(removeEmptyStrings(payload))
  }

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Create user",
        icon: <PersonAddIcon />,
        loading: isCreateUserLoading
      }}
    >
      <Box display="flex" justifyContent="center" mb={1}>
        <Avatar
          sx={{
            height: 125,
            width: 125,
            border: `1px solid ${grayColor}`,
            fontSize: 56
          }}
          src={avatarUrl && showImageAvatar(avatarUrl)}
        >
          {initials}
        </Avatar>
      </Box>
      <FileUploader
        label="Upload user avatar"
        fileName={uploadedFileName}
        progress={progress}
        onChange={onFileUpload}
      />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
          <TextFieldWithControl
            name="firstName"
            label="First name"
            requiredSign
            control={control}
            errors={errors}
            data-testid="firstName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWithControl
            name="lastName"
            label="Last name"
            requiredSign
            control={control}
            errors={errors}
            data-testid="lastName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithControl
            name="email"
            label="E-mail address"
            requiredSign
            control={control}
            errors={errors}
            data-testid="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectWithControl
            name="role"
            label="Role"
            requiredSign
            control={control}
            errors={errors}
            options={roleOptions(t)}
            data-testid="role"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWithControl
            name="password"
            label="Password"
            requiredSign
            control={control}
            errors={errors}
            type="password"
            data-testid="password"
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}
