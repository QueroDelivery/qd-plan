import { useForm } from 'react-hook-form';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
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

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Por favor, insira um e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
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
            name="password"
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
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export { LoginForm };
