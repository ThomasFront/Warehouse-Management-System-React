import { AnimatePresence } from 'framer-motion';
import { FormHelperText } from "@mui/material"
import { ErrorMessageProps } from "./types"
import { AnimationWrapper } from "../AnimationWrapper";
import { useTranslation } from 'react-i18next';

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {message && (
        <AnimationWrapper
          initial={{ x: "25px", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ x: "25px", opacity: 0 }}
        >
          <FormHelperText data-testid="formHelperText">{t(message)}</FormHelperText>
        </AnimationWrapper>
      )}
    </AnimatePresence>
  )
}
