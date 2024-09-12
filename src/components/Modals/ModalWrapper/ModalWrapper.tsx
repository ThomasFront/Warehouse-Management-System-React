import { forwardRef, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Dialog as MuiDialog } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { TransitionProps } from "@mui/material/transitions";
import Slide from '@mui/material/Slide';
import { ModalWrapperType } from "./types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalWrapper = ({ isOpen, onClose, title, children, agreeButton, disagreeButton }: ModalWrapperType) => {
  const { t } = useTranslation()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <MuiDialog
      component="form"
      open={isOpen}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <DialogTitle>{t(title)}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 0.75
          }}
        >
          {children}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {disagreeButton && (
          <Button
            onClick={disagreeButton.onClick}
            startIcon={disagreeButton.icon}
            variant="outlined"
          >
            {t(disagreeButton.text)}
          </Button>
        )}
        {agreeButton && (
          <LoadingButton
            onClick={agreeButton.onClick}
            loading={agreeButton.loading}
            startIcon={agreeButton.icon}
          >
            {t(agreeButton.text)}
          </LoadingButton>
        )}
      </DialogActions>
    </MuiDialog>
  )
}
