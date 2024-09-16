import { Box, Grid, Skeleton } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { useMessage } from "../../../hooks/useMessage"
import { Message } from "../../../components/Message"

export const MessageList = () => {
  const { messages, areMessagesLoading } = useMessage(true)

  const messagesLoadingSkeleton = Array.from(new Array(4)).map((_, index) => (
    <Skeleton key={index} height={200} sx={{ mx: 1 }} />
  ))

  return (
    <Box>
      <PageInfo
        title="Message list"
        subtitle="On this page you can view all messages sent by other users. The message list allows you to quickly access correspondence and manage communication"
      />
      {areMessagesLoading ?
        messagesLoadingSkeleton : (
          <Grid container spacing={2}>
            {messages?.data.map(message => <Message key={message.id} message={message} />)}
          </Grid>
        )}
    </Box>
  )
}
