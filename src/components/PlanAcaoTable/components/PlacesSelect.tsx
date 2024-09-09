import { ImSpinner8 } from 'react-icons/im';
import Select from 'react-select';
import usePlaces from 'src/hooks/usePlaces';
import { singleSelectStyles } from 'src/styles/selectStyles';

type Option = {
  value: string;
  label: string;
};

type TPlacesSelect = {
  value: Option;
  onChange: (value: Option) => void;
  municipioId: string;
};

const PlacesSelect = ({ value, onChange, municipioId }: TPlacesSelect) => {
  const placesQuery = usePlaces(municipioId);

  const options = placesQuery.data?.map((place) => ({
    label: place.nomeExibicao,
    value: place.placeId,
  }));

  if (placesQuery.isPending) {
    return (
      <div className="flex justify-center items-center">
        <ImSpinner8 className="animate-spin text-purple-500" size={24} />
      </div>
    );
  }

  return (
    <Select
      options={options}
      placeholder="Place"
      isMulti={false}
      noOptionsMessage={() => 'Place não encontrado.'}
      onChange={(option) => onChange(option as Option)}
      styles={singleSelectStyles}
      value={value}
      isClearable
    />
  );
};

export { PlacesSelect };
