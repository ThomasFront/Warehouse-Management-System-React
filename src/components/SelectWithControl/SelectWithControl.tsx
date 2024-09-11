import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { Controller, FieldValues, Path } from "react-hook-form"
import { ErrorMessage } from "../ErrorMessage"
import { useTranslation } from "react-i18next"
import { SelectWithControlType } from "./types"

export const SelectWithControl = <TFormValues extends FieldValues>({
  name,
  label,
  errors,
  control,
  options,
  requiredSign,
  ...props
}: SelectWithControlType<TFormValues>) => {
  const { t } = useTranslation()
  const labelValue = `${t(label)}${requiredSign ? "*" : ""}`
  const errorMessage = errors?.[name]?.message as string

  return (
    <Box>
      <FormControl fullWidth error={!!errors?.[name]}>
        <InputLabel>{labelValue}</InputLabel>
        <Controller
          name={name as Path<TFormValues>}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label={labelValue}
              value={field.value || ""}
              {...props}
            >
              {options.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <ErrorMessage message={errorMessage} />
    </Box>
  )
}
