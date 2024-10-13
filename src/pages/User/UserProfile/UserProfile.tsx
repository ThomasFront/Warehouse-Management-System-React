import { useState } from "react";
import { useParams } from "react-router"
import { Avatar, Box, Button, Grid, Skeleton, Tooltip, useTheme } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser"
import { ErrorMessage } from "../../../components/ErrorMessage"
import { capitalizeFirstLetter, formatDateToDisplay, getUserInitials } from "../../../utils/common"
import { FancyDataItem } from "../../../components/FancyDataItem";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { EditUserProfileModal } from "../../../components/Modals/User/EditUserProfileModal";

export const UserProfile = () => {
  const { userId } = useParams()
  const theme = useTheme()
  const { user, isAdmin, isUserLoading, isUserError } = useUser(userId)
  const { currentUser, isAdmin: isCurrentUserAdmin } = useCurrentUser()
  const { t } = useTranslation()
  const [showEditUserProfileModal, setShowEditUserProfileModal] = useState(false)
  const canEditUser = Number(currentUser?.id) === user?.id || isCurrentUserAdmin
  const grayColor = theme.palette.grey[300]
  const userAvatar = user?.avatar
  const userInitials = getUserInitials(user?.firstName, user?.lastName)
  const userAvatarUrl = `${import.meta.env.VITE_BACKEND_LARAVEL}${userAvatar}`

  if (isUserLoading) return <Skeleton height={200} />

  if (isUserError) return (
    <Box display="flex" justifyContent="center">
      <ErrorMessage message={t("User download failed")} />
    </Box>
  )

  const dateToDisplay = formatDateToDisplay(user?.createdAt as string)

  return (
    <>
      <Box
        border={`1px solid ${grayColor}`}
        borderRadius={1}
        overflow="hidden"
      >
        <Box
          position="relative"
          bgcolor={user?.colorTheme}
          height={175}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: -75,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {isAdmin && (
              <Box
                zIndex={1}
                position="absolute"
                top={-20}
                left="50%"
                sx={{
                  transform: "translateX(-50%)",
                }}
              >
                <Tooltip title={t("Admin")}>
                  <StarIcon sx={{ mb: 0.5, color: "#ffd32c", fontSize: 40 }} />
                </Tooltip>
              </Box>
            )}
            <Avatar
              sx={{
                height: 150,
                width: 150,
                fontSize: 70,
                border: `2px solid ${user?.colorTheme}`
              }}
              src={userAvatarUrl}
            >
              {userInitials}
            </Avatar>
          </Box>
        </Box>
        <Box bgcolor="#fff" minHeight={175} px={2}>
          <Box pb={4}>
            <Grid container spacing={2} pt={12}>
              <Grid item xs={12} md={6} xl={3}>
                <FancyDataItem label={t("First name and last name")} value={`${user?.firstName} ${user?.lastName}`} colorTheme={user?.colorTheme} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <FancyDataItem label={t("E-mail address")} value={user?.email} colorTheme={user?.colorTheme} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <FancyDataItem label={t("Role")} value={t(capitalizeFirstLetter(user?.role as string))} colorTheme={user?.colorTheme} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <FancyDataItem label={t("Account created")} value={dateToDisplay} colorTheme={user?.colorTheme} />
              </Grid>
            </Grid>
          </Box>
          {canEditUser && (
            <Box display="flex" justifyContent="end" pb={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowEditUserProfileModal(true)}
              >
                {t("Edit")}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <EditUserProfileModal
        isOpen={showEditUserProfileModal}
        onClose={() => setShowEditUserProfileModal(false)}
        user={user}
      />
    </>
  )
}
