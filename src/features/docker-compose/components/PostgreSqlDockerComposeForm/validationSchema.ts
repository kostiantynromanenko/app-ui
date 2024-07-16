import * as yup from 'yup';
import {
  DATABASE_NAME_PATTERN,
  PASSWORD_PATTERN,
  PORT_PATTERN,
  USERNAME_PATTERN,
  VOLUME_PATTERN,
} from '@features/utils';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .matches(
      USERNAME_PATTERN,
      'Username name must contain only letters, digits, and underscores'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      PASSWORD_PATTERN,
      'Password must contain at least one digit, one letter, and one special character (@#$%^&+=)'
    ),
  database: yup
    .string()
    .required('Database name is required')
    .min(3, 'Database name must be at least 3 characters long')
    .matches(
      DATABASE_NAME_PATTERN,
      'Database name must contain only letters, digits, and underscores'
    ),
  volume: yup
    .string()
    .required('Volume is required')
    .matches(
      VOLUME_PATTERN,
      'Invalid volume format. Expected format: /path:/var/lib/postgresql/data, where /path is a valid directory path'
    ),
  port: yup
    .string()
    .required('Port mapping is required')
    .matches(
      PORT_PATTERN,
      'Port mapping must be in the format host:container. Port range: 1024-65535'
    ),
});

export default validationSchema;
