import Select from 'react-select';
import { ImSpinner8 } from 'react-icons/im';
import usePlaces from 'src/hooks/usePlaces';
import { multiSelectStyles } from 'src/styles/selectStyles';

const PlacesLancamentos = ({
  municipioId,
  placeIds,
}: {
  municipioId: string;
  placeIds: string;
}) => {
  const placesQuery = usePlaces(municipioId);

  if (placesQuery.isLoading)
    return (
      <div className="flex justify-center py-3">
        <ImSpinner8 className="animate-spin text-purple-500" size={24} />
      </div>
    );

  const options = placesQuery.data?.map((place) => {
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
        styles={multiSelectStyles}
      />
    </div>
  );
};

export { PlacesLancamentos };
