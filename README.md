# Pokedex-Client

A simple (and incomplete) Pokédex-like application built with React. Currently a mirror from a Gitlab repository.

Credit to [@TIC](https://github.com/calvetalex/): he built it all!

## Deployement

This repo is automatically deployed on <https://fs3-pokedex.netlify.app/> thanks to a link with netlify. The linked is based on "main" branch, every modification on main will be deploy in production.

## CI

Gitlab CI has been configured for this project to run on each commit.
It will test:

- yarn run build
- yarn run lint

## How to work

The project is a REACT project with TYPESCRIPT as main language.

The package manager is "yarn" so please use this one to add dependencies and install current ones.
If you want to check the lint, you can use "yarn lint" and to avoid modification on save by your IDE you can use "yarn lint:fix" to automatically fix lint errors than can be managed by eslint.

## i18n: managing your language

You can find i18n translation in `src/translations`. To use i18n inside a component you can do:

```js
import { useTranslation } from 'react-i18next';

const myComp = () => {
  const { t } = useTranslation();

  return t('key.to.translation');
};
```

## Redux

Because we are working with Typescript, redux is using react hooks to work within the app. Define your schema in a `.slice.ts` and your action in a `.actions.ts` in store directory, then you can use hooks to dispatch events. To use a reducer, you must use the hook `useAppSelector`. It takes a callback looking like `(store) => {}` so you can select which slice to use. For exemple :

```js
import { useAppSelector, useAppDispatch } from '/hooks/redux.hooks';
import { loginUser } from '/store/user/user.actions';

const myComp = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const login = (email, password) => {
    // dispatch is used to trigger loginUser which is a store action
    dispatch(loginUser(email, password));
  };
};
```
