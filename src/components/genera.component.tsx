import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux.hooks';

import { IGenera, pokemonGenerations } from '../models/pokemon.model';
import { setGenera } from '../store/pokemon/pokemon.actions';

import '../styles/genera.scss';

function GeneraFilter() {
  const dispatch = useAppDispatch();
  const [currentGenera, setCurrentGenera] = useState<IGenera>('KANTO');

  const handleChange = (value: IGenera) => {
    setCurrentGenera(value);
    dispatch(setGenera(value));
  };

  const renderOption = () => (
    pokemonGenerations.map((genera: IGenera) => (
      <button
        key={genera}
        type="button"
        onClick={() => handleChange(genera)}
        className={currentGenera === genera ? 'selected' : ''}
      >
        {genera}
      </button>
    ))
  );

  const renderSmallScreen = () => (
    <select>
      {pokemonGenerations.map((genera: IGenera) => (
        <option key={genera} onClick={() => handleChange(genera)}>{genera}</option>
      ))}
    </select>
  );

  return (
    <div className="genera-filter">
      <div className="normalScreen">
        {renderOption()}
      </div>
      <div className="smallScreen">
        {renderSmallScreen()}
      </div>
    </div>
  );
}

export default GeneraFilter;
