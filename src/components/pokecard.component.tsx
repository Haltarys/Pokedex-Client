import { t } from 'i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPokemonBasic } from '../models/pokemon.model';
import { PokeType } from '../models/poketypes.model';

import '../styles/pokecard.scss';

type IPropTypes = {
  pokemon: IPokemonBasic,
};

function PokeCard(props: IPropTypes) {
  const navigate = useNavigate();
  const { pokemon } = props;
  const color = PokeType[pokemon.types[0]];
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    navigate(`/pokemon/${pokemon.id}`);
  }
  return (
    <div className="pokecard">
      <div className="face face1">
        <div className="content">
          <h2 className="name">{pokemon.name}</h2>
          <p className="text">{pokemon.types.join(' | ')}</p>
          <button
            className="button-27"
            type="button"
            onClick={() => setShouldRedirect(true)}
          >
            {t('details')}
          </button>
        </div>
      </div>
      <div
        className="face face2"
        style={{ backgroundImage: `linear-gradient(40deg, ${color} 5%, #000 82%)` }}
      >
        <img src={pokemon.img} alt={pokemon.name} />
        <h2>{pokemon.id}</h2>
      </div>
    </div>
  );
}

export default PokeCard;
