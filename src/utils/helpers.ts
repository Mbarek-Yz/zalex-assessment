import { translate } from '_i18n';
import axios, { AxiosError } from 'axios';

const extractApiErrorMessage = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null;

  const errorData = data as any;

  if (errorData.message) return errorData.message;
  if (errorData.error) return errorData.error;

  return null;
};

export const handleError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError;

    if (!axiosError.response) {
      if (
        axiosError.code === 'ECONNABORTED' ||
        axiosError.message.includes('timeout')
      ) {
        return translate('errors.timeout');
      }
      return translate('errors.network');
    }

    const apiMessage = extractApiErrorMessage(axiosError.response.data);
    if (apiMessage) return apiMessage;

    const statusCode = axiosError.response.status;
    if (statusCode === 404) return translate('errors.not_found');
    if (statusCode >= 500) return translate('errors.server');
  }

  if (err instanceof Error) {
    return err.message;
  }

  return translate('errors.unknown');
};
