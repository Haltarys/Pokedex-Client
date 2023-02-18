import {
  Action, AnyAction, configureStore, ThunkAction, ThunkDispatch,
} from '@reduxjs/toolkit';
import pokemonSlice from './pokemon/pokemon.slice';
import userSlice from './user/user.slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    pokemon: pokemonSlice.reducer,
  },
});

export type AppThunk<RT = void> = ThunkAction<Promise<RT>, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
