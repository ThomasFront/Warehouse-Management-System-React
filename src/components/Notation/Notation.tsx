import { RoughNotation } from "react-rough-notation"
import { NotationType } from "./types"
import { useTheme } from "@mui/material"

export const Notation = ({ children }: NotationType) => {
  const theme = useTheme()
  const darkPrimaryColor = theme.palette.primary.dark

  return (
    <RoughNotation
      type="highlight"
      show
      color={darkPrimaryColor}
    >
      {children}
    </RoughNotation>
  )
}
