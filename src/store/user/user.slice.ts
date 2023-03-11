import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user.model';

const initialUserState: IUser = {
  id: '',
  name: '',
  email: '',
  pokemon_team: [],
  jwt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      let current = state;
      current = { ...state, ...action.payload };
      return current;
    },
    removeUser(state) {
      let current = state;
      current = { ...initialUserState };
      return current;
    },
  },
});
export default userSlice;
