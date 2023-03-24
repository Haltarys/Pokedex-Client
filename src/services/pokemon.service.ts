import { AxiosResponse } from 'axios';
import Api, { handleError } from '../backend/axios';
import { IApiResponse } from '../models/api.model';
import { IPokemon, IPokemonList, IPokemonBasic } from '../models/pokemon.model';

const fetchPokemonList = async (
  limit: number,
): Promise<IApiResponse<IPokemonList>> => Api()
  .get(`/pokemons/list/${limit}`)
  .then(
    (response: AxiosResponse<IPokemonList>) => ({
      status: 'success',
      data: response.data,
    } as IApiResponse<IPokemonList>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const fetchPokemonBasic = async (
  id: number,
): Promise<IApiResponse<IPokemonBasic>> => Api()
  .get(`/pokemons/partial/${id}`)
  .then(
    (response: AxiosResponse<IPokemonBasic>) => ({
      status: 'success',
      data: response.data,
    } as IApiResponse<IPokemonBasic>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const fetchPokemon = async (id: number): Promise<IApiResponse<IPokemon>> => Api()
  .get(`/pokemons/full/${id}`)
  .then(
    (response: AxiosResponse<IPokemon>) => ({
      status: 'success',
      data: response.data,
    } as IApiResponse<IPokemon>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const PokemonService = {
  fetchPokemonList,
  fetchPokemonBasic,
  fetchPokemon,
};

export default PokemonService;
