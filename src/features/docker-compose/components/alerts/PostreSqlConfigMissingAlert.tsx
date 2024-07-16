import { FC } from 'react';
import { Alert } from '@mui/material';

export const PostreSqlConfigMissingAlert: FC = () => (
  <Alert severity="error">
    Docker compose file is present but no PostgreSql service found
  </Alert>
);
