import { Box } from "@mui/material"
import { LoginForm } from "../../components/LoginForm"

export const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="main"
      p={2}
      sx={{
        backgroundImage: `
      repeating-linear-gradient(0deg, rgb(250, 250, 250) 0px, rgb(250, 250, 250) 1px, transparent 1px, transparent 21px),
        repeating-linear-gradient(90deg, rgb(250, 250, 250) 0px, rgb(250, 250, 250) 1px, transparent 1px, transparent 21px),
        linear-gradient(90deg, hsl(229, 0%, 100%), hsl(229, 0%, 100%))`
      }}
    >
      <LoginForm />
    </Box>
  )
}
