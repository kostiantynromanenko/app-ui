import { ApiError } from '@features/utils/types/apiError.ts';

export const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object' && error != null && 'status' in error;

export const isNotFoundError = (error: unknown): error is ApiError =>
  isApiError(error) && error.status === 404;
