import { useAppDispatch } from '@store/store';
import { showNotification as show } from '@features/notifications/state';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const showSuccessNotification = (message: string) =>
    dispatch(show({ message, severity: 'success' }));

  const showErrorNotification = (message: string) =>
    dispatch(show({ message, severity: 'error' }));

  return {
    showSuccessNotification,
    showErrorNotification,
  };
};
