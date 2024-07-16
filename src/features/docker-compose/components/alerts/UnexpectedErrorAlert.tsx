import { FC } from 'react';
import { Alert } from '@mui/material';

export const UnexpectedErrorAlert: FC = () => (
  <Alert severity="error">
    Failed to fetch docker compose file config. Please try again later
  </Alert>
);
