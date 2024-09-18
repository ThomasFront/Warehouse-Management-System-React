import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editMessageSchema } from '../../../../utils/schema';
import { ModalWrapper } from '../../ModalWrapper';
import { TextFieldWithControl } from '../../../TextFieldWithControl';
import { EditMessageFormType, EditMessageModalType } from './types';
import { SelectWithControl } from '../../../SelectWithControl';
import { messagePriorityOptions } from '../../../../utils/constants';
import { useMessage } from '../../../../hooks/useMessage';

export const EditMessageModal = ({ isOpen, onClose, message }: EditMessageModalType) => {
  const { t } = useTranslation()
  const { updateMessage, isUpdateMessageLoading } = useMessage()

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<EditMessageFormType>({
    resolver: yupResolver(editMessageSchema)
  })

  const onSubmit: SubmitHandler<EditMessageFormType> = async (data) => {
    if (message?.id) {
      const res = await updateMessage({
        id: message?.id,
        ...data
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
    setValue("title", message?.title || "")
    setValue("message", message?.message || "")
    setValue("priority", message?.priority || "")
  }, [message, setValue])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeAndClearErrors}
      title="Edit message"
      agreeButton={{
        text: "Save",
        icon: <SaveAsIcon />,
        onClick: handleSubmit(onSubmit),
        loading: isUpdateMessageLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: closeAndClearErrors,
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextFieldWithControl
          name="title"
          label="Category name"
          requiredSign
          control={control}
          errors={errors}
        />
        <SelectWithControl
          name="priority"
          label="Priority"
          requiredSign
          control={control}
          errors={errors}
          options={messagePriorityOptions(t)}
        />
        <TextFieldWithControl
          name="message"
          label="Message"
          requiredSign
          control={control}
          errors={errors}
          multiline
          minRows={10}
        />
      </Box>
    </ModalWrapper>
  )
}
