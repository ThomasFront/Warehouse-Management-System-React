import { Box, Grid, Skeleton } from "@mui/material"
import { PageInfo } from "../../../components/PageInfo"
import { useMessage } from "../../../hooks/useMessage"
import { Message } from "../../../components/Message"
import { CustomPagination } from "../../../components/CustomPagination"
import { useState } from "react"

export const MessageList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { messages, areMessagesLoading, areMessagesRefetching } = useMessage(true, currentPage)

  const messagesLoadingSkeleton = Array.from(new Array(4)).map((_, index) => (
    <Skeleton key={index} height={200} sx={{ mx: 1 }} />
  ))

  return (
    <Box>
      <PageInfo
        title="Message list"
        subtitle="On this page you can view all messages sent by other users. The message list allows you to quickly access correspondence and manage communication"
      />
      {(areMessagesLoading || areMessagesRefetching) ?
        messagesLoadingSkeleton : (
          <>
            <Grid container spacing={4}>
              {messages?.data.map(message => <Message key={message.id} message={message} />)}
            </Grid>
            <CustomPagination
              page={currentPage}
              meta={messages?.meta}
              onChange={(_, v) => setCurrentPage(v)}
            />
          </>
        )}
    </Box>
  )
}
