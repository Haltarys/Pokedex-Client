import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { IApiResponse } from '../models/api.model';
import { IUser, IUserLogin } from '../models/user.model';
import { fetchUser, registerUser } from '../store/user/user.actions';

import '../styles/login.scss';

function Login() {
  // translation
  const { t } = useTranslation();
  // router
  const navigate = useNavigate();
  // variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const checkPassRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [rightPanel, setRightPanel] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const doneTypingInterval = 1000;

  useEffect(() => {
    // notifications
    if (warning) {
      toast.warn(t(warning), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setWarning('');
    }
    if (error) {
      toast.error(t(error), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setError('');
    }
  }, [t, error, warning, setError, setWarning, email]);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (timer !== null) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const r = new RegExp(pattern, 'g');
      if (!r.test(event.target.value)) {
        setWarning('warning.login.email');
      }
    }, doneTypingInterval);
    setTimer(newTimer);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const checkPassword = (): boolean => {
    if (!checkPassRef.current || !checkPassRef.current.value || !password
      || checkPassRef.current.value !== password) {
      setWarning('');
      setError('error.register.password_check');
      return false;
    }
    return true;
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    (async () => {
      const params: IUserLogin = {
        email,
        password,
      };
      const res: IApiResponse<IUser> = await dispatch(fetchUser(params));
      // console.log(res);
      if (res.status === 'error') {
        setError(res.data as string);
      }
    })().catch((e: Error) => {
      // console.error(e);
      setError(e.message);
    });
  };

  const handleRegister = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name) {
      setError('error.register.missing_name');
      return;
    }
    if (!email) {
      setError('error.register.missing_email');
      return;
    }
    if (!checkPassword()) return;
    setError('');
    (async () => {
      const body = { name, email, password };
      const res: IApiResponse<IUser> = await dispatch(registerUser(body));
      if (res.status === 'error') {
        setError(res.data as string);
      }
    })().catch((e: Error) => setError(e.message));
  };

  if (user.email) {
    navigate('/user');
  }
  return (
    <div className="loginPage">
      <div
        className={`login-container ${rightPanel ? 'right-panel-active' : ''}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>{t('register.main_title')}</h1>
            <input
              type="text"
              placeholder="Name"
              onChange={(ev) => handleName(ev)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(ev) => handleEmail(ev)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(ev) => handlePassword(ev)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              ref={checkPassRef}
            />
            <button
              type="submit"
              id="signUp"
              disabled={!!error.length}
            >
              {t('register.action')}
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>{t('login.main_title')}</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(ev) => handleEmail(ev)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(ev) => handlePassword(ev)}
            />
            <button
              type="submit"
              disabled={!!error.length}
            >
              {t('login.action')}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>{t('register.title')}</h1>
              <p>{t('register.intro')}</p>
              <button
                className="ghost"
                id="signIn"
                type="button"
                onClick={() => setRightPanel(false)}
              >
                {t('register.move_to')}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>{t('login.title')}</h1>
              <p>{t('login.intro')}</p>
              <button
                className="ghost"
                id="signUp"
                type="button"
                onClick={() => setRightPanel(true)}
              >
                {t('login.move_to')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
