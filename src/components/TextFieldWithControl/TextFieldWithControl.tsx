import { useTranslation } from "react-i18next"
import { Box, TextField } from "@mui/material"
import { Controller, FieldValues, Path } from "react-hook-form"
import { TextFieldWithControlType } from "./types"
import { ErrorMessage } from "../ErrorMessage"

export const TextFieldWithControl = <TFormValues extends FieldValues>({ name, label, errors, control, requiredSign, ...props }: TextFieldWithControlType<TFormValues>) => {
  const { t } = useTranslation()
  const labelValue = `${t(label)}${requiredSign ? "*" : ""}`
  const errorMessage = errors?.[name]?.message as string

  return (
    <Box>
      <Controller
        name={name as Path<TFormValues>}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={labelValue}
            error={!!errors.email}
            value={field.value || ""}
            {...props}
          />
        )}
      />
      <ErrorMessage message={errorMessage} />
    </Box>
  )
}
