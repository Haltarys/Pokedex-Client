import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hooks';

import { IGenera, generaValue } from '../models/pokemon.model';
import { MINMAX } from '../models/utils.model';
import Spinner from './spinner.component';
import GeneraFilter from './genera.component';

import '../styles/pokelist.scss';
import { addPokemon, clearPokemon } from '../store/pokemon/pokemon.actions';
import PokeCard from './pokecard.component';

function PokeList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const genera = useAppSelector((state) => state.pokemon.genera);
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const [status, setStatus] = useState('ready');
  const [error, setError] = useState('');
  const [generation, setGeneration] = useState<MINMAX>(generaValue[genera]);
  const [currentGenera, setCurrentGenera] = useState<IGenera>(genera);

  useEffect(() => {
    const clearPokemons = () => {
      dispatch(clearPokemon());
    };

    const retreivePokemon = async () => {
      const results = [];
      for (let i = generation.min; i <= generation.max; i += 1) {
        results.push(dispatch(addPokemon(i)));
      }
      await Promise.all(results);
    };

    const handlePokemonRetreive = () => {
      retreivePokemon()
        .then(() => {
          setError('');
          setStatus('success');
        })
        .catch((err: Error) => setError(err.message));
    };

    if (genera !== currentGenera) {
      setCurrentGenera(genera);
      setGeneration(generaValue[genera]);
      setStatus('ready');
    }

    if (status === 'ready') {
      clearPokemons();
      setStatus('pending');
      handlePokemonRetreive();
    }
  }, [
    setStatus,
    status,
    genera,
    setCurrentGenera,
    setGeneration,
    currentGenera,
    dispatch,
    generation,
  ]);

  const renderContainer = () => {
    if (pokemons.length && status !== 'pending') {
      return pokemons
        .map((e) => (
          <div key={e.id}>
            <PokeCard pokemon={e} />
          </div>
        ));
    }
    return null;
  };

  const renderSpinner = () => (status === 'pending' ? (
    <Spinner />
  ) : null);

  return (
    <>
      {renderSpinner()}
      <h1>{t('header.list')}</h1>
      {error || null}
      <GeneraFilter />
      <div className="container">{renderContainer()}</div>
    </>
  );
}

export default PokeList;
