import { MINMAX } from './utils.model';

export interface IStat {
  name: string;
  value: number;
}

export type IPokemonBasic = {
  id: number;
  name: string;
  types: string[];
  img: string;
};

export interface IPokemonTranslation {
  value: string;
  lang: string;
}

export type IPokemon = {
  shinyImg: string;
  abilities: string[];
  stats: IStat[];
  happiness: number;
  descriptions: ({ version: string } & IPokemonTranslation)[];
  genera: IPokemonTranslation[];
  names: IPokemonTranslation[];
  habitat: string;
} & Omit<IPokemonBasic, 'name'>;

export interface IPokemonListElem {
  name: string;
  url: string;
}

export type IPokemonList = Array<IPokemonListElem>;

export const pokemonGenerations = [
  'KANTO',
  'JOHTO',
  'HOENN',
  'SINNOH',
  'UNYS',
  'KALOS',
  'ALOLA',
  'GALAR',
  'HISUI',
  'PALDEA'] as const;
export type IGenera = typeof pokemonGenerations[number];

export type IGeneraValue = { [key in IGenera]: MINMAX };

export const generaValue: IGeneraValue = {
  KANTO: { min: 1, max: 151 },
  JOHTO: { min: 152, max: 251 },
  HOENN: { min: 252, max: 386 },
  SINNOH: { min: 387, max: 493 },
  UNYS: { min: 494, max: 649 },
  KALOS: { min: 650, max: 721 },
  ALOLA: { min: 722, max: 807 },
  GALAR: { min: 810, max: 898 },
  HISUI: { min: 899, max: 905 },
  PALDEA: { min: 906, max: 1008 },
};
