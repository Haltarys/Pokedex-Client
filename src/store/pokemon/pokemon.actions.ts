import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import pokemonSlice from './pokemon.slice';
import { AppThunk, RootState } from '..';
import { IPokemonList, IPokemonBasic, IGenera } from '../../models/pokemon.model';
import PokemonService from '../../service/pokemon.service';
import { IApiResponse } from '../../models/api.model';

export const PokemonActions = pokemonSlice.actions;

export const setPokemonList = (
  limit: number,
): AppThunk<IApiResponse<IPokemonList>> => (dispatch) => PokemonService
  .fetchPokemonList(limit).then((res: IApiResponse<IPokemonList>) => {
    if (res.status === 'success') dispatch(PokemonActions.setPokemonList(res.data as IPokemonList));
    return res;
  });

export const addPokemon = (
  id: number,
): AppThunk<IApiResponse<IPokemonBasic>> => (dispatch) => PokemonService
  .fetchPokemonBasic(id).then((res: IApiResponse<IPokemonBasic>) => {
    if (res.status === 'success') dispatch(PokemonActions.addPokemon(res.data as IPokemonBasic));
    return res;
  });

export const removePokemon = (
  id: number,
): ThunkAction<void, RootState, unknown, AnyAction> => (
  async (dispatch, getState) => {
    if (getState().pokemon.pokemons.find((e: IPokemonBasic) => e.id === id)) {
      return dispatch(PokemonActions.removePokemon(id));
    }
    return false;
  }
);

export const setGenera = (
  genera: IGenera,
): ThunkAction<void, RootState, unknown, AnyAction> => (
  dispatch,
) => dispatch(PokemonActions.setGenera(genera));

export const clearPokemon = (): ThunkAction<void, RootState, unknown, AnyAction> => (
  dispatch,
) => dispatch(PokemonActions.clearPokemon());
