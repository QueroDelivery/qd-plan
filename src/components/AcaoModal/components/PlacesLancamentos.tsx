import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from 'react-select';
import { ImSpinner8 } from 'react-icons/im';

type Place = {
  nomeExibicao: string;
  placeId: string;
};

type PlacesByMunicipioResponse = {
  r: boolean;
  data: Place[];
};

const getAllPlacesByMunicipioId = async (municipioId: string) => {
  const { data: response } = await axios.get<PlacesByMunicipioResponse>(
    `https://69p49iiw43.execute-api.us-east-2.amazonaws.com/getAllPlacesByMunicipioId?municipioId=${municipioId}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return response.data;
};

const PlacesLancamentos = ({
  municipioId,
  placeIds,
}: {
  municipioId: string;
  placeIds: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['places'],
    queryFn: () => getAllPlacesByMunicipioId(municipioId),
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-3">
        <ImSpinner8 className="animate-spin text-purple-500" size={24} />
      </div>
    );

  const options = data?.map((place) => {
    return { value: place.placeId, label: place.nomeExibicao };
  });

  const arrPlaceIds = new Set(placeIds.split(','));

  const defaultSelectValues = options?.filter((place) =>
    arrPlaceIds.has(place.value)
  );

  return (
    <div>
      <Select
        defaultValue={defaultSelectValues}
        isMulti
        options={options}
        name="places"
        className="basic-multi-select"
        classNamePrefix="select"
        noOptionsMessage={() => 'Opção não encontrada'}
        placeholder="Selecionar..."
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: '1px solid rgba(168, 85, 247, 0.5)',
            boxShadow: 'none',
            ':hover': {
              border: '1px solid rgba(168, 85, 247, 0.5)',
            },
          }),
          option: (baseStyles, { isDisabled, isSelected, isFocused }) => ({
            ...baseStyles,
            color: '#374151',
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? 'rgba(168, 85, 247, 0.5)'
              : isFocused
              ? 'rgba(168, 85, 247, 0.6)'
              : undefined,
            ':active': {
              ...baseStyles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? 'rgba(168, 85, 247, 0.5)'
                  : 'rgba(168, 85, 247, 0.8)'
                : undefined,
            },
          }),
          multiValue: (baseStyles) => {
            return {
              ...baseStyles,
              backgroundColor: 'rgba(168, 85, 247, 0.5)',
              borderRadius: '25px',
            };
          },
          multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            color: 'rgba(168, 85, 247, 1)',
            ':hover': {
              borderRadius: '0 25px 25px 0',
            },
          }),
        }}
      />
    </div>
  );
};

export { PlacesLancamentos };
