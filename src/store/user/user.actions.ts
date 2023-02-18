import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import { AppThunk, RootState } from '..';
import { IRegisterUser, IUser, IUserLogin } from '../../models/user.model';
import UserService from '../../service/user.service';
import { IApiResponse } from '../../models/api.model';

export const userActions = userSlice.actions;

export const fetchUser = (
  params: IUserLogin,
): AppThunk<IApiResponse<IUser>> => (dispatch) => UserService.fetchUser(params).then((res) => {
  if (res.status === 'success') dispatch(userActions.setUser(res.data as IUser));
  return res;
});

export const registerUser = (
  body: IRegisterUser,
): AppThunk<IApiResponse<IUser>> => (dispatch) => UserService.registerUser(body).then((res) => {
  if (res.status === 'success') dispatch(userActions.setUser(res.data as IUser));
  return res;
});

export const removeUser = (): ThunkAction<void, RootState, unknown, AnyAction> => (
  async (dispatch, getState) => {
    if (getState().user.email) {
      return dispatch(userActions.removeUser());
    }
    return false;
  });
