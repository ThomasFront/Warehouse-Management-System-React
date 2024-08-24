import { TextFieldProps } from "@mui/material"
import { Control, FieldErrors, FieldValues } from "react-hook-form"

export type TextFieldWithControlType<TFormValues extends FieldValues> = {
  name: keyof TFormValues
  label: string
  errors: FieldErrors<TFormValues>
  control: Control<TFormValues>
  requiredSign?: boolean
} & TextFieldProps