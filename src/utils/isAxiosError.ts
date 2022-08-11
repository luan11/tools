import axios, { AxiosError } from 'axios';

const isAxiosError = <ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> => axios.isAxiosError(error);

export default isAxiosError;
