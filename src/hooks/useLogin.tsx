import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api/auth';
import { LoginFormType } from '../components/LoginForm/types';

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: (userData: LoginFormType) => loginUser(userData),
    onSuccess: ({ data }) => {
      const token = data.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Incorrect e-mail address or password");
    },
  });

  return { login, isLoginLoading };
};
