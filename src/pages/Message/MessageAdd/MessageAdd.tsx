import { Box } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"

export const MessageAdd = () => {
  return (
    <Box>
      <PageInfo
        title="Add message"
        subtitle="On this page you can write and send a new message. This also allows you to set the priority of your message, which will help it stand out"
      />
    </Box>
  )
}
