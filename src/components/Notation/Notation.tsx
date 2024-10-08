import { RoughNotation } from "react-rough-notation"
import { NotationType } from "./types"
import { useTheme } from "@mui/material"

export const Notation = ({ children, animationDelay }: NotationType) => {
  const theme = useTheme()
  const darkPrimaryColor = theme.palette.primary.dark

  return (
    <RoughNotation
      type="highlight"
      show
      animationDelay={animationDelay}
      color={darkPrimaryColor}
    >
      {children}
    </RoughNotation>
  )
}
