export interface IApiResponse<T> {
  status: 'pending' | 'error' | 'success';
  data: T | string;
}
