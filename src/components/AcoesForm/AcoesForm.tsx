import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';

import { Textarea } from 'src/components/ui/textarea';

import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

import { useForm } from 'react-hook-form';

const AcoesForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={() => {}} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="acao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Ação</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-600/50"
                    disabled
                    {...field}
                    value={'Ação de recebido'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acaoCriador"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">
                  Responsável pelo plano
                </FormLabel>
                <FormControl>
                  <Input className="border-gray-600/50" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Cidade</FormLabel>
                <FormControl>
                  <Input className="border-gray-600/50" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">
                  Data de criação
                </FormLabel>
                <FormControl>
                  <Input className="border-gray-600/50" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="como"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Como</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none border-gray-600/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export { AcoesForm };
