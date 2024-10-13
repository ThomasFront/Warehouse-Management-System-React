import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab"
import { Box, IconButton, InputAdornment, Typography, useTheme } from "@mui/material"
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import arrowDown from "../../../assets/images/arrowDown.png"
import warehouse from "../../../assets/images/warehouse.jpg"
import { LoginFormType } from "./types";
import { useLogin } from "../../../hooks/useLogin";
import { LanguageSelector } from "../../LanguageSelector";
import { AnimationWrapper } from "../../AnimationWrapper";
import { loginFormSchema } from "../../../utils/schema";
import { TextFieldWithControl } from "../../TextFieldWithControl";
import { Notation } from "../../Notation";

export const LoginForm = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { login, isLoginLoading } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const shadowColor = theme.palette.grey[300]
  const subheadColor = theme.palette.grey[500]

  const { handleSubmit, formState: { errors }, control } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "thomas.admin@example.com",
      password: "thomas"
    }
  })

  const onSubmit: SubmitHandler<LoginFormType> = data => login(data)

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      width="100%"
    >
      <Box
        position="fixed"
        top={20}
        right={20}
      >
        <LanguageSelector />
      </Box>
      <AnimationWrapper
        initial={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        delay={0.5}
      >
        <Box
          mb={1}
          sx={{
            display: { xs: "none", sm: "block" }
          }}
        >
          <img src={arrowDown} alt="arrow down" width="60px" />
        </Box>
      </AnimationWrapper>
      <Box
        zIndex={1}
        display="flex"
        justifyContent="center"
        width="100%"
        maxWidth="1200px"
        minHeight={300}
        border={`1px solid ${shadowColor}`}
        boxShadow={`0 0 16px ${shadowColor}`}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={3}
          p={3}
          bgcolor="#FFF"
          width="100%"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            <Typography fontSize={20}>{t("Log in")}</Typography>
            <Typography color={subheadColor} fontWeight={100} fontSize={14}>{t("If you do not have an account, please contact your manager")}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextFieldWithControl
              name="email"
              label="E-mail address"
              requiredSign
              control={control}
              errors={errors}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
              data-testid="emailInput"
            />
            <TextFieldWithControl
              name="password"
              label="Password"
              requiredSign
              control={control}
              errors={errors}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(prev => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              data-testid="passwordInput"
            />
          </Box>
          <LoadingButton
            type="submit"
            loading={isLoginLoading}
          >
            {t("Log in")}
          </LoadingButton>
        </Box>
        <Box
          zIndex={-1}
          position="relative"
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={1}
          sx={{
            backgroundImage: `url(${warehouse})`,
            display: { xs: "none", sm: "flex" }
          }}
        >
          <Box
            sx={{
              zIndex: -1,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(247,68,106, 0.9)",
            }}
          />
          <Typography color="#FFF" fontWeight={100}>{t("Welcome to")}</Typography>
          <Notation animationDelay={1000}>
            <Typography
              color="#FFF"
              fontWeight={600}
              sx={{
                fontSize: { xs: 16, md: 18, lg: 20 }
              }}
            >
              Warehouse Management System
            </Typography>
          </Notation>
          <Typography color="#FFF" fontWeight={100}>by Thomas</Typography>
        </Box>
      </Box>
    </Box>
  )
}
