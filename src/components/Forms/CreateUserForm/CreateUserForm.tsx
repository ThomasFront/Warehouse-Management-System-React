import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Grid } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from "../FormWrapper"
import { TextFieldWithControl } from '../../TextFieldWithControl';
import { createUserSchema } from '../../../utils/schema';
import { CreateUserFormType } from './types';
import { SelectWithControl } from '../../SelectWithControl';
import { roleOptions } from '../../../utils/constants';
import { getUserInitials } from '../../../utils/user';
import { useUser } from '../../../hooks/useUser';

export const CreateUserForm = () => {
  const { t } = useTranslation()
  const { createUser, isCreateUserLoading } = useUser()

  const { handleSubmit, formState: { errors }, control, watch } = useForm<CreateUserFormType>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      role: "user"
    }
  })

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const initials = useMemo(() => {
    return getUserInitials(firstName, lastName)
  }, [firstName, lastName])

  const onSubmit: SubmitHandler<CreateUserFormType> = (data) => createUser(data)

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Create user",
        icon: <PersonAddIcon />,
        loading: isCreateUserLoading
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          sx={{ width: 75, height: 75, fontSize: 34 }}
        >
          {initials}
        </Avatar>
      </Box>
      <Grid container spacing={2}>
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
