import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'src/components/ui/form';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { LancamentosTableData } from '../AcaoModal/components/Lancamentos';

type LancamentoForm = {
  lancamento: number;
};

const FormLancamentos = ({ row }: { row: LancamentosTableData }) => {
  const form = useForm<LancamentoForm>({
    defaultValues: {
      lancamento: row.valorCredito,
    },
  });

  const onSubmit = (data) => {
    console.log(data, row);
  };

  return (
    <Form {...form}>
      <div className="flex flex-wrap gap-2">
        <FormField
          control={form.control}
          name="lancamento"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          className="bg-purple-500 hover:bg-purple-600 text-white hover:text-white"
          onClick={form.handleSubmit(onSubmit)}
        >
          Salvar
        </Button>
      </div>
    </Form>
  );
};

export { FormLancamentos };
