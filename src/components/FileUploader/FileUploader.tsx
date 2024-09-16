import { useTranslation } from "react-i18next";
import { Box, Typography, useTheme } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FileUploaderType } from "./types";

export const FileUploader = ({ fileName, progress, onChange }: FileUploaderType) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const grayColor = theme.palette.grey[400]
  const successColor = theme.palette.success.light
  const isUploaded = progress === 100 && fileName
  const isShowPercentUpload = progress > 0 && progress <= 99

  return (
    <Box>
      <input
        id="upload"
        type="file"
        onChange={(e) => {
          onChange(e.target?.files?.[0] || null);
        }}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <label htmlFor="upload">
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          gap={1}
          width="100%"
          border={`1px solid ${grayColor}`}
          borderRadius={1}
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: grayColor
            },
            transition: "background-color 0.2s"
          }}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            height="100%"
            width={`${progress}%`}
            sx={{
              bgcolor: successColor,
              transition: "width 0.2s"
            }}
          />
          {isUploaded ? <CheckCircleIcon sx={{ zIndex: 1 }} /> : <CloudUploadIcon sx={{ zIndex: 1 }} />}
          {isShowPercentUpload && <Typography zIndex={1}>{progress}%</Typography>}
          <Typography zIndex={1}>{isUploaded ? fileName : t("Upload avatar")}</Typography>
        </Box>
      </label>
    </Box >
  )
}
