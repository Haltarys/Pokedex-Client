import axios, { AxiosError } from 'axios';

interface IError {
  statusCode: number;
  message: string;
  error: string;
}

const api = () => axios.create({ baseURL: process.env.REACT_APP_API || '' });

export const handleError = (reason: AxiosError) => {
  if (reason.response?.status && (reason.response.status < 200 || reason.response.status > 300)) {
    const err: IError = reason.response.data as IError;
    throw new Error(`[[ ${err.statusCode} : ${err.error} ]] ${err.message}`);
  } else {
    throw new Error('An error occurred on your side, please try again.');
  }
};

export default api;
