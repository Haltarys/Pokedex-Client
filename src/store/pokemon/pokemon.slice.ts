import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonList, IPokemonBasic, IGenera } from '../../models/pokemon.model';

interface IPokemonState {
  list: IPokemonList;
  pokemons: IPokemonBasic[];
  genera: IGenera,
}

const inititalPokemonState: IPokemonState = {
  list: [],
  pokemons: [],
  genera: 'KANTO',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: inititalPokemonState,
  reducers: {
    setGenera(state, action: PayloadAction<IGenera>) {
      let current = state;
      current = { ...state, genera: action.payload };
      return current;
    },
    setPokemonList(state, action: PayloadAction<IPokemonList>) {
      let current = state;
      current = { ...state, list: [...action.payload] };
      return current;
    },
    addPokemon(state, action: PayloadAction<IPokemonBasic>) {
      let current = state;
      current = {
        ...state,
        pokemons: [...current.pokemons, action.payload]
          .sort((a, b) => a.id - b.id),
      };
      return current;
    },
    removePokemon(state, action: PayloadAction<number>) {
      let current = state;
      current = {
        ...state,
        pokemons: current.pokemons.filter(
          (e: IPokemonBasic) => e.id !== action.payload,
        ),
      };
      return current;
    },
    clearPokemon(state) {
      let current = state;
      current = { ...state, pokemons: [] };
      return current;
    },
  },
});

export default pokemonSlice;
