import { motion } from "framer-motion";
import { AnimationWrapperType } from "./types";

export const AnimationWrapper = ({ children, delay = 0, ...props }: AnimationWrapperType) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
