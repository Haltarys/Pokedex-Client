import React from 'react';
import { IRoute } from '../models/routes.model';
import PokeList from '../components/pokelist.component';
import Login from '../components/login.component';
import User from '../components/user.component';
import PokemonInfo from '../components/pokemonInfo.component';
import Chat from '../components/chat.component';

const menuItems: Array<IRoute> = [
  { path: '/', title: 'header.list', content: <PokeList /> },
  { path: '/pokemon/:id', title: '', content: <PokemonInfo /> },
  { path: '/chat', title: 'header.chat', content: <Chat /> },
  { path: '/login', title: 'header.login', content: <Login /> },
  { path: '/user', title: 'header.user', content: <User /> },
];

export default menuItems;
