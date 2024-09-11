import useAcaoModalStore from 'src/store/useAcaoModalStore';
import { Modal } from '../Modal';

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
import { useForm } from 'react-hook-form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover';

import { Calendar } from 'src/components/ui/calendar';
import { Button } from 'src/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { ptBR } from 'date-fns/locale';
import { Switch } from 'src/components/ui/switch';
import { PlacesLancamentos } from './components/PlacesLancamentos';

const AcaoModal = () => {
  const { isOpen, onClose, data } = useAcaoModalStore();

  const countLines = (text: string) => {
    return text.split('\n').length + 2;
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  const form = useForm({
    values: {
      acao: data?.acaoTipo || '',
      acaoCriador: data?.nomeCriador || '',
      data: data?.createdAt ? formatDate(data?.createdAt) : '',
      influencers: Boolean(data?.influencerId),
      places: Boolean(data?.placeIds),
      credito: Boolean(data?.isCreditoFaturaPlace),
      como: data?.como || '',
      cidade: 'A definir',
      prazoInicio: data?.prazoInicio ? new Date(data?.prazoInicio) : new Date(),
      prazoFim: data?.prazoFim ? new Date(data?.prazoFim) : new Date(),
      valorRealizado: data?.valorRealizado || 0,
      quantoCusta: data?.quantoCusta || 0,
      acaoFinalidade: data?.acaoFinalidade || '',
      comentario: data?.comentario || '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
  };

  const bodyContent = (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="acao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Ação</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acaoFinalidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Finalidade</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
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
                <FormLabel className="text-purple-500 truncate">
                  Responsável pelo plano
                </FormLabel>
                <FormControl>
                  <Input disabled {...field} />
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
                  <Input disabled {...field} />
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
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 my-6 flex-wrap">
          <FormField
            control={form.control}
            name="influencers"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormLabel className="text-purple-500">
                  Ação com influencer?
                </FormLabel>
                <FormControl>
                  <Switch
                    className="data-[state=checked]:bg-purple-500"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="places"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormLabel className="text-purple-500">
                  Ação com parceiro?
                </FormLabel>
                <FormControl>
                  <Switch
                    className="data-[state=checked]:bg-purple-500"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credito"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormLabel className="text-purple-500">
                  Crédito em fatura?
                </FormLabel>
                <FormControl>
                  <Switch
                    className="data-[state=checked]:bg-purple-500"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch('places') && (
          <PlacesLancamentos
            placeIds={(data?.placeIds as string) || ''}
            municipioId={data?.municipioId as string}
          />
        )}
        {form.watch('credito') && <div>Lançamentos</div>}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="quantoCusta"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-purple-500">
                  Investimento Previsto
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="number"
                      className="pl-8 border-input text-gray-700"
                      {...field}
                    />
                    <span className="absolute top-[34px] left-3 text-sm text-gray-700">
                      R$
                    </span>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorRealizado"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-purple-500">
                  Investimento Realizado
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="number"
                      className="pl-8 border-input text-gray-700"
                      {...field}
                    />
                    <span className="absolute top-[34px] left-3 text-sm text-gray-700">
                      R$
                    </span>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prazoInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Prazo início</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal text-gray-700',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Selecionar data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ptBR}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prazoFim"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500">Prazo fim</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal text-gray-700',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Selecionar data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ptBR}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="como"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-500">Como</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none border-input text-gray-700"
                  {...field}
                  rows={countLines(field.value)}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comentario"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-500">Comentário</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none border-input text-gray-700"
                  {...field}
                  rows={countLines(field.value)}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Deixe seu comentário..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  return (
    <Modal
      title="editar ação"
      onClose={onClose}
      isOpen={isOpen}
      body={bodyContent}
      onSubmit={form.handleSubmit(onSubmit)}
      actionLabel="Salvar"
      secondaryAction={onClose}
      secondaryActionLabel="Cancelar"
      // adicionar disabled no loading
    />
  );
};

export { AcaoModal };
