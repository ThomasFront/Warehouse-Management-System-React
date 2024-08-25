import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../api/auth';
import { LoginFormType } from '../components/Forms/LoginForm/types';

export const useLogin = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: (userData: LoginFormType) => loginUser(userData),
    onSuccess: ({ data }) => {
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error(t("Incorrect e-mail address or password"));
    },
  });

  return { login, isLoginLoading };
};
