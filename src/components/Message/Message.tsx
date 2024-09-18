import { useState } from "react";
import { Avatar, Box, Button, Divider, Grid, Paper, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router";
import WarningIcon from '@mui/icons-material/Warning';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MessageProps } from "./types"
import { capitalizeFirstLetter, formatDateTimeToDisplay, getUserInitials, handleMessagePriorityColor } from "../../utils/common"
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { DeleteMessageModal } from "../Modals/Message/DeleteMessageModal";
import { EditMessageModal } from "../Modals/Message/EditMessageModal";

export const Message = ({ message }: MessageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false)
  const [showEditMessageModal, setShowEditMessageModal] = useState(false)
  const { title, message: messageText, createdAt, priority, user, id: messageId } = message
  const { firstName, lastName, avatar, id, role } = user
  const isAdmin = role === "admin"
  const userInitials = getUserInitials(firstName, lastName)
  const userAvatarUrl = `${import.meta.env.VITE_BACKEND_LARAVEL}${avatar}`
  const dateTimeFormatToDisplay = formatDateTimeToDisplay(createdAt)
  const canManageMessage = currentUser?.id === id

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{ overflow: "hidden" }}
          data-testid="messageWrapper"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            px={2}
            bgcolor={handleMessagePriorityColor(priority)}
            data-testid="messageHeader"
          >
            <Typography>{t("Priority")}: {t(capitalizeFirstLetter(priority))}</Typography>
            <WarningIcon />
          </Box>
          <Box p={2}>
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Box
                position="relative"
              >
                {isAdmin && (
                  <Box position="absolute" top={-14} zIndex={1} left="50%" sx={{ transform: "translateX(-50%)" }}>
                    <Tooltip title={t("Admin")}>
                      <StarIcon sx={{ mb: 0.5, color: "#ffd32c" }} />
                    </Tooltip>
                  </Box>
                )}
                <Avatar
                  sx={{ width: 50, height: 50, cursor: "pointer" }}
                  src={userAvatarUrl}
                  onClick={() => navigate(`/user/${id}`)}
                >
                  {userInitials}
                </Avatar>
              </Box>
              <Box>
                <Typography
                  onClick={() => navigate(`/user/${id}`)}
                  fontWeight="bold"
                  sx={{ cursor: "pointer" }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography fontSize={14}>{dateTimeFormatToDisplay}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography fontWeight="bold" fontSize={20} my={2}>{title}</Typography>
            <Typography>{messageText}</Typography>
          </Box>
          {canManageMessage && (
            <Box
              display="flex"
              flexDirection="column"
              gap={1.5}
              p={2}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setShowEditMessageModal(true)}
              >
                {t("Edit")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setShowDeleteMessageModal(true)}
              >
                {t("Delete")}
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>
      <EditMessageModal
        isOpen={showEditMessageModal}
        onClose={() => setShowEditMessageModal(false)}
        message={message}
      />
      <DeleteMessageModal
        isOpen={showDeleteMessageModal}
        onClose={() => setShowDeleteMessageModal(false)}
        messageId={messageId}
      />
    </>
  )
}
