import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux.hooks';

function User() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.email || !user.name) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div id="user-page">
      <h1>{t('user.page')}</h1>
      <div className="data">
        {`ID: ${user.id}`}
        <br />
        <span>
          {t('user.name')}
          :
          {' '}
          {user.name}
        </span>
        <br />
        <span>
          {t('user.email')}
          :
          {' '}
          {user.email}
        </span>
      </div>
    </div>
  );
}

export default User;
