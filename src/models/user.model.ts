export interface IUser {
  id: string;
  name: string;
  email: string;
  pokemon_team: number[];
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IToken {
  jwt: string;
}
