import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import i18next from '../i18n';
import PokemonService from '../service/pokemon.service';
import { IPokemon, IPokemonTranslation } from '../models/pokemon.model';

import '../styles/pokemonInfo.scss';

function PokemonInfo() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [error, setError] = useState<string>('');
  const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined);

  useEffect(() => {
    const nId = Number(id);
    const retreivePokemon = async (): Promise<IPokemon> => {
      const res = await PokemonService.fetchPokemon(Number(nId));
      return res.data as IPokemon;
    };

    const handlePokemonRetreive = () => {
      retreivePokemon()
        .then((res: IPokemon) => {
          setPokemon(res);
          setError('');
        })
        .catch((err: Error) => setError(err.message));
    };

    if (!Number.isNaN(nId) && nId < 1) {
      setError('pokemonInfo.idError');
    }
    if (!pokemon || !Object.keys(pokemon).length) {
      handlePokemonRetreive();
    }
  }, [id, pokemon, setPokemon, setError]);

  const renderStats = () => pokemon?.stats.map((e) => <li>{`${e.name} -> ${e.value}`}</li>);

  return (
    <div className="pokemonInfo">
      <h1>{t('pokemonInfo.title')}</h1>
      {error ? <div className="error">{t(error) || ''}</div> : null}
      <section className="content">
        <aside className="stats">
          <label htmlFor="img">
            {t('pokemonInfo.img')}
            <img src={pokemon?.img} alt="pokemon shape" />
          </label>
          <label htmlFor="shiny">
            {t('pokemonInfo.shiny')}
            <img src={pokemon?.shinyImg} alt="pokemon shape when shiny" />
          </label>
          {t('pokemonInfo.statsHeader')}
          <ul>
            {renderStats()}
            <li>{`happiness -> ${pokemon?.happiness || ''}`}</li>
          </ul>
        </aside>

        <article className="main">
          <div className="names">
            <h3>{t('pokemonInfo.name')}</h3>
            {pokemon?.names.map((name: IPokemonTranslation) => (
              name.lang === i18next.language ? name.value : null
            ))}
          </div>
          <div className="separator" />
          <div className="types">
            <h3>{t('pokemonInfo.types')}</h3>
            {pokemon?.types.join(' | ')}
          </div>
          <div className="separator" />
          <div className="habitat">
            <h3>{t('pokemonInfo.habitat')}</h3>
            {pokemon?.habitat}
          </div>
          <div className="separator" />
          <div className="genera">
            <h3>{t('pokemonInfo.genera')}</h3>
            {pokemon?.genera.map((genera: IPokemonTranslation) => (
              genera.lang === i18next.language ? genera.value : null
            ))}
          </div>
          <div className="separator" />
          <div className="descriptions">
            <h3>{t('pokemonInfo.descriptions')}</h3>
            {pokemon?.descriptions.map((des) => (des.lang === i18next.language ? (
              <div className="description">
                <div className="version">{des.version}</div>
                <div className="value">{des.value}</div>
              </div>
            ) : null))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default PokemonInfo;
