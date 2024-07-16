import { FC } from 'react';
import { Alert } from '@mui/material';

export const DockerComposeFileMissingAlert: FC = () => (
  <Alert severity="warning" sx={{ mb: 2 }}>
    Docker compose file is missing. It will be created after you submit the form
  </Alert>
);
