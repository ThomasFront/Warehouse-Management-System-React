import { useEffect } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { EditCategoryFormType, EditCategoryModalType } from "./types"
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCategory } from '../../../../hooks/useCategory';
import { editCategorySchema } from '../../../../utils/schema';
import { ModalWrapper } from '../../ModalWrapper';
import { TextFieldWithControl } from '../../../TextFieldWithControl';

export const EditCategoryModal = ({ isOpen, onClose, category }: EditCategoryModalType) => {
  const { updateCategory, isUpdateCategoryLoading } = useCategory()

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<EditCategoryFormType>({
    resolver: yupResolver(editCategorySchema)
  })

  const onSubmit: SubmitHandler<EditCategoryFormType> = async ({ name }) => {
    if (category?.id) {
      const res = await updateCategory({
        id: category?.id,
        name
      })

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
    setValue("name", category?.name || "")
  }, [category, setValue])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeAndClearErrors}
      title="Edit category"
      agreeButton={{
        text: "Save",
        icon: <SaveAsIcon />,
        onClick: handleSubmit(onSubmit),
        loading: isUpdateCategoryLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: closeAndClearErrors,
      }}
    >
      <TextFieldWithControl
        name="name"
        label="Category name"
        requiredSign
        control={control}
        errors={errors}
      />
    </ModalWrapper>
  )
}
