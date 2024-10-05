import { useForm } from 'react-hook-form';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { IoIosAlert } from 'react-icons/io';
import { Button } from 'src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { login } from 'src/services/auth/authService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from 'src/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';

export type FormCredentials = z.infer<typeof loginFormSchema>;

const loginFormSchema = z.object({
  login: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Por favor, insira um e-mail válido.'),
  pass: z.string().min(1, 'A senha é obrigatória.'),
});

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = useForm<FormCredentials>({
    defaultValues: {
      login: '',
      pass: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    mutate: authenticateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      const redirectTo = searchParams.get('to') || '/';
      navigate(redirectTo, {
        replace: true,
      });
    },
  });

  const onSubmit = async (data: FormCredentials) => {
    authenticateUser(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <div className="flex items-center gap-2 rounded-md border-[1px] bg-red-200/50 border-red-500/60 p-2 my-5">
            <IoIosAlert color="red" />
            <span className="text-sm">{error.message}</span>
          </div>
        )}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-neutral-500 tracking-wide font-normal">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-neutral-400 text-neutral-500 rounded-lg h-11 focus-visible:ring-0 pr-14 text-ellipsis"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pass"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-neutral-500 tracking-wide font-normal">
                  Senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisible ? 'text' : 'password'}
                      {...field}
                      className="border-neutral-400 text-neutral-500 rounded-lg h-11 focus-visible:ring-0 pr-14 text-ellipsis"
                    />
                    <button
                      className="absolute top-[10px] right-3 text-gray-500"
                      onClick={() => setPasswordVisible((value) => !value)}
                      type="button"
                    >
                      {passwordVisible ? (
                        <PiEyeLight size={24} />
                      ) : (
                        <PiEyeSlashLight size={24} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-md font-semibold bg-purple-500 hover:bg-purple-600 rounded-full h-12 transition-all mt-10"
        >
          {isPending ? <LoadingSpinner className="text-white" /> : 'Entrar'}
        </Button>
      </form>
    </Form>
  );
};

export { LoginForm };
