
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import { toast } from '@/hooks/use-toast';

export const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Axios instance configuration with base URL and authentication credentials
 */
export const AXIOS_INSTANCE = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Custom axios instance with error handling
 * @param config Axios request configuration
 * @returns Promise with response data
 */
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => (
  AXIOS_INSTANCE(config)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      // Check if it's an authentication error
      if (
        error.response?.status === 401
        || error.response?.status === 403
      ) {
        // Redirect to auth page on authentication error
        localStorage.removeItem('isAuthenticated');
        window.location.pathname = '/auth';
      } else {
        // Display error message
        const errorData = error.response?.data as { message?: string };
        const errorMessage = errorData?.message || 'Произошла ошибка';
        toast({
          title: 'Ошибка',
          description: errorMessage,
          variant: 'destructive',
        });
        throw error.response?.data || error;
      }
    })
);

export default customInstance;
export type ErrorType<Error> = AxiosError<Error>;
