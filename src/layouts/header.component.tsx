import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import TranslationDropdown from '../components/translation.component';
import menuItems from '../routes/routes.config';
import { IRouteParams } from '../models/routes.model';
import { removeUser } from '../store/user/user.actions';

import '../styles/header.scss';

function Header() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const createPath = (path: string, paramsObj: Array<IRouteParams>) => {
    let newPath: string = path;
    paramsObj.forEach((param) => {
      newPath = newPath.replace(`:${param.id}`, param.value);
    });
    return newPath;
  };

  const renderRoutes = () => menuItems.map((item) => {
    if (!item.title || item.title.match(/login|user/)) return null;
    return (
      <Link
        className="link"
        key={item.title}
        to={
            item.containParam && item.params
              ? createPath(item.path, item.params)
              : item.path
          }
      >
        {t(item.title)}
      </Link>
    );
  });

  const renderLogin = () => {
    if (!user.email) {
      const loginBtn = menuItems.find((e) => e.title.match(/login/));
      if (!loginBtn) return null;
      return <Link to={loginBtn.path}>{t(loginBtn.title)}</Link>;
    }
    const userBtn = menuItems.find((e) => e.title.match(/user/));
    if (!userBtn) return null;
    return (
      <div id="dropdown">
        <label htmlFor="dropdown">
          {user.name}
          <div className="dropdown-content">
            <Link to={userBtn.path}>{t(userBtn.title)}</Link>
            <button type="button" onClick={() => dispatch(removeUser())}>
              {t('header.logout')}
            </button>
          </div>
        </label>
      </div>
    );
  };

  return (
    <div id="header">
      <div id="headerLinks">
        <div className="first_section links">
          <h1>{t('header.main_title')}</h1>
          <div className="navigation">{renderRoutes()}</div>
        </div>
        <div className="second_section links">
          <TranslationDropdown />
          {renderLogin()}
        </div>
      </div>
      <div id="headerWarning">
        {i18next.language === 'fr' ? t('warning.translation.noData') : null }
      </div>
    </div>
  );
}

export default Header;
