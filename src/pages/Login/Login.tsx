import { Box } from "@mui/material"
import { LoginForm } from "../../components/Forms/LoginForm"

export const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="main"
      p={2}
    >
      <LoginForm />
    </Box>
  )
}
