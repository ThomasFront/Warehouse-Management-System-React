import { SelectProps } from "@mui/material"
import { Control, FieldErrors, FieldValues } from "react-hook-form"

export type SelectOptionType = {
  label: string
  value: string | number
}

export type SelectWithControlType<TFormValues extends FieldValues> = {
  name: keyof TFormValues
  label: string
  errors: FieldErrors<TFormValues>
  control: Control<TFormValues>
  requiredSign?: boolean
  options: SelectOptionType[]
  loading?: boolean
} & SelectProps