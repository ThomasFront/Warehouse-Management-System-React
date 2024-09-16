import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router";
import WarningIcon from '@mui/icons-material/Warning';
import { MessageProps } from "./types"
import { capitalizeFirstLetter, formatDateToDisplay, getUserInitials, handleMessagePriorityColor } from "../../utils/common"

export const Message = ({ message }: MessageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { title, message: messageText, createdAt, priority, user } = message
  const { firstName, lastName, avatar, id } = user
  const userInitials = getUserInitials(firstName, lastName)
  const userAvatarUrl = `${import.meta.env.VITE_BACKEND_LARAVEL}${avatar}`
  const dateToDisplay = formatDateToDisplay(createdAt)

  return (
    <Grid item xs={12}>
      <Paper sx={{ overflow: "hidden" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={1}
          px={2}
          bgcolor={handleMessagePriorityColor(priority)}
        >
          <Typography>{t("Priority")}: {t(capitalizeFirstLetter(priority))}</Typography>
          <WarningIcon />
        </Box>
        <Box p={2}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Avatar
              sx={{ width: 50, height: 50, cursor: "pointer" }}
              src={userAvatarUrl}
              onClick={() => navigate(`/user/${id}`)}
            >
              {userInitials}
            </Avatar>
            <Box>
              <Typography
                onClick={() => navigate(`/user/${id}`)}
                fontWeight="bold"
                sx={{ cursor: "pointer" }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography fontSize={14}>{dateToDisplay}</Typography>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Typography fontWeight="bold" fontSize={20} my={2}>{title}</Typography>
          <Typography>{messageText}</Typography>
        </Box>
      </Paper>
    </Grid>
  )
}
