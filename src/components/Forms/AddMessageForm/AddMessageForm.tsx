import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from "../FormWrapper"
import { TextFieldWithControl } from '../../TextFieldWithControl';
import { addMessageSchema } from '../../../utils/schema';
import { AddMessageFormType } from './types';
import { SelectWithControl } from '../../SelectWithControl';
import { messagePriorityOptions } from '../../../utils/constants';
import { useMessage } from '../../../hooks/useMessage';
import { EmojiClickData } from "emoji-picker-react"
import { EmojiPanel } from '../../EmojiPanel';

export const AddMessageForm = () => {
  const { t } = useTranslation()
  const { createMessage, isCreateMessageLoading } = useMessage()

  const { handleSubmit, formState: { errors }, control, setValue, getValues } = useForm<AddMessageFormType>({
    resolver: yupResolver(addMessageSchema),
    defaultValues: {
      priority: "medium"
    }
  })

  const handleEmojiClick = (e: EmojiClickData) => {
    setValue("message", `${getValues("message") || ""}${e.emoji}`)
  }

  const onSubmit: SubmitHandler<AddMessageFormType> = (data) => createMessage(data)

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Add message",
        icon: <AddIcon />,
        loading: isCreateMessageLoading
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextFieldWithControl
            name="title"
            label="Title"
            requiredSign
            control={control}
            errors={errors}
            data-testid="title"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectWithControl
            name="priority"
            label="Priority"
            requiredSign
            control={control}
            errors={errors}
            options={messagePriorityOptions(t)}
            data-testid="priority"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithControl
            name="message"
            label="Message"
            requiredSign
            control={control}
            errors={errors}
            multiline
            minRows={10}
            data-testid="message"
          />
          <EmojiPanel
            onEmojiClick={handleEmojiClick}
            onReactionClick={handleEmojiClick}
            marginTop={2}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}
