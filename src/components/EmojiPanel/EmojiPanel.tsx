import { Box } from "@mui/material"
import EmojiPicker from "emoji-picker-react"
import { EmojiPanelType } from "./types"

export const EmojiPanel = ({ marginTop, ...props }: EmojiPanelType) => {
  return (
    <Box display="flex" justifyContent="end" mt={marginTop}>
      <EmojiPicker
        {...props}
        reactionsDefaultOpen={true}
        width="100%"
      />
    </Box>
  )
}
