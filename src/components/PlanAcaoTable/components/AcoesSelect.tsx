import { ImSpinner8 } from 'react-icons/im';
import Select from 'react-select';
import useTipoAcoes from 'src/hooks/useTipoAcoes';
import { singleSelectStyles } from 'src/styles/selectStyles';

export type Option = {
  value: string;
  label: string;
};

type TAcoesSelect = {
  value: Option;
  onChange: (value: Option) => void;
};

const AcoesSelect = ({ value, onChange }: TAcoesSelect) => {
  const tipoAcoesQuery = useTipoAcoes();

  const options = tipoAcoesQuery.data?.map((tipoAcao) => ({
    value: tipoAcao.acaoId.toString(),
    label: tipoAcao.tipo,
  }));

  if (tipoAcoesQuery.isPending) {
    return (
      <div className="flex justify-center items-center">
        <ImSpinner8 className="animate-spin text-purple-500" size={24} />
      </div>
    );
  }

  return (
    <Select
      options={options}
      placeholder="Tipo ação"
      isMulti={false}
      noOptionsMessage={() => 'Ação não encontrada.'}
      onChange={(option) => onChange(option as Option)}
      styles={singleSelectStyles}
      value={value}
      isClearable
    />
  );
};

export { AcoesSelect };
