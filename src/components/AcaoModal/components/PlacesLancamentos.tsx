import Select, { MultiValue } from 'react-select';
import { ImSpinner8 } from 'react-icons/im';
import usePlaces from 'src/hooks/usePlaces';
import { multiSelectStyles } from 'src/styles/selectStyles';
import { useState } from 'react';
import { Lancamentos } from './Lancamentos';

const PlacesLancamentos = ({
  municipioId,
  placeIds,
  hasLancamentos,
  planAcaoId,
}: {
  municipioId: string;
  placeIds: string;
  hasLancamentos: boolean;
  planAcaoId: number;
}) => {
  const [selectedPlaces, setSelectedPlaces] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const placesQuery = usePlaces(municipioId);

  if (placesQuery.data) {
    const options = placesQuery.data.map((place) => {
      return { value: place.placeId, label: place.nomeExibicao };
    });

    const arrPlaceIds = new Set(placeIds.split(','));

    const defaultSelectValues = options.filter((place) =>
      arrPlaceIds.has(place.value)
    );

    return (
      <div className="flex flex-col gap-6">
        <Select
          defaultValue={defaultSelectValues}
          isMulti
          options={options}
          value={selectedPlaces || defaultSelectValues}
          onChange={(value) => setSelectedPlaces(value)}
          name="places"
          className="basic-multi-select"
          classNamePrefix="select"
          noOptionsMessage={() => 'Opção não encontrada'}
          placeholder="Selecionar..."
          styles={multiSelectStyles}
        />
        {hasLancamentos && (
          <Lancamentos
            places={selectedPlaces || defaultSelectValues}
            planAcaoId={planAcaoId}
          />
        )}
      </div>
    );
  }

  if (placesQuery.isLoading)
    return (
      <div className="flex justify-center py-3">
        <ImSpinner8 className="animate-spin text-purple-500" size={24} />
      </div>
    );
};

export { PlacesLancamentos };
