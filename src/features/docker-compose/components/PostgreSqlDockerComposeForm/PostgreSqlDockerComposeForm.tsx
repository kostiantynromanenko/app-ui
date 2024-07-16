import { FC, useMemo } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import {
  PostgreSqlDockerComposeFormValue,
  PostgreSqlServiceConfig,
} from '@features/docker-compose/types';
import { useSavePostgreSqlDockerComposeMutation } from '@features/docker-compose/api';
import validationSchema from './validationSchema';
import { useNotification } from '@features/notifications/hooks';
import { StyledTextField } from './styled';

export interface DockerComposeFormProps {
  gameId: string;
  config?: PostgreSqlServiceConfig;
}

export const PostgreSqlDockerComposeForm: FC<DockerComposeFormProps> = ({
  gameId,
  config,
}) => {
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const [createDockerCompose] = useSavePostgreSqlDockerComposeMutation();

  const initialValues = useMemo(
    () => ({
      username: config?.environment.POSTGRES_USER || '',
      password: config?.environment.POSTGRES_PASSWORD || '',
      database: config?.environment.POSTGRES_DB || '',
      volume: config?.volumes[0] || '',
      port: config?.ports[0].toString() || '',
    }),
    [config]
  );

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = useFormik<PostgreSqlDockerComposeFormValue>({
    initialValues,
    onSubmit: (values) => {
      createDockerCompose({
        gameId: gameId,
        request: values,
      })
        .unwrap()
        .then(() => showSuccessNotification('PostgreSQL configuration saved'))
        .catch(() =>
          showErrorNotification('Failed to save PostgreSQL configuration')
        );
    },
    validationSchema,
    enableReinitialize: true,
  });

  const hasError = (field: keyof PostgreSqlDockerComposeFormValue) =>
    Boolean(errors[field] && touched[field]);

  const getFieldError = (field: keyof PostgreSqlDockerComposeFormValue) =>
    hasError(field) ? errors[field] : '';

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack rowGap={2}>
        <StyledTextField
          id="username"
          label="Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasError('username')}
          helperText={getFieldError('username')}
        />
        <StyledTextField
          id="password"
          label="Password"
          type="password"
          autoComplete="false"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasError('password')}
          helperText={getFieldError('password')}
        />
        <StyledTextField
          id="database"
          label="Database"
          value={values.database}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasError('database')}
          helperText={getFieldError('database')}
        />
        <StyledTextField
          id="port"
          label="Port"
          value={values.port}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasError('port')}
          helperText={getFieldError('port')}
        />
        <StyledTextField
          id="volume"
          label="Volume"
          value={values.volume}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasError('volume')}
          helperText={getFieldError('volume')}
        />
        <Button type="submit" disabled={!isValid} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};
