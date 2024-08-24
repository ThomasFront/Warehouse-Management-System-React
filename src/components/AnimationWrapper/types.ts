import { MotionProps } from "framer-motion"
import { ReactNode } from "react"

export type AnimationWrapperType = {
  children: ReactNode
  delay?: number
} & MotionProps