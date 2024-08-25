import { SubmitHandler, useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from "../FormWrapper"
import { TextFieldWithControl } from '../../TextFieldWithControl';
import { addCategorySchema } from '../../../utils/schema';
import { AddCategoryFormType } from './types';
import { useCategory } from '../../../hooks/useCategory';

export const AddCategoryForm = () => {
  const { createCategory, isCreateCategoryLoading } = useCategory()

  const { handleSubmit, formState: { errors }, control } = useForm<AddCategoryFormType>({
    resolver: yupResolver(addCategorySchema)
  })

  const onSubmit: SubmitHandler<AddCategoryFormType> = (data) => createCategory(data)

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Add category",
        icon: <AddIcon />,
        loading: isCreateCategoryLoading
      }}
    >
      <TextFieldWithControl
        name="name"
        label="Category name"
        requiredSign
        control={control}
        errors={errors}
      />
    </FormWrapper>
  )
}
