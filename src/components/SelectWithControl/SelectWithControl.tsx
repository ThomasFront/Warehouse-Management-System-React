import { Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, CircularProgress } from "@mui/material"
import { Controller, FieldValues, Path } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ErrorMessage } from "../ErrorMessage"
import { SelectWithControlType } from "./types"

export const SelectWithControl = <TFormValues extends FieldValues>({
  name,
  label,
  errors,
  control,
  options,
  requiredSign,
  loading,
  ...props
}: SelectWithControlType<TFormValues>) => {
  const { t } = useTranslation()
  const labelValue = `${t(label)}${requiredSign ? "*" : ""}`
  const errorMessage = errors?.[name]?.message as string

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel>{labelValue}</InputLabel>
        <Controller
          name={name as Path<TFormValues>}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label={labelValue}
              value={field.value || ""}
              disabled={loading}
              endAdornment={
                loading && (
                  <InputAdornment position="end">
                    <CircularProgress color="secondary" size={20} sx={{ mr: 3 }} />
                  </InputAdornment>
                )
              }
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
