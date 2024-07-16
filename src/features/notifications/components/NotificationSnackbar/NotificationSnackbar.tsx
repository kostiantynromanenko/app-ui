import { FC, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar';
import { hideNotification } from '@features/notifications/state';
import { useAppSelector } from '@store/store';

export const NotificationSnackbar: FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = (
    _: SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
