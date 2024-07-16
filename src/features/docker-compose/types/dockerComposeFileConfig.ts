import { PostgreSqlServiceConfig } from './postgreSqlServiceConfig.ts';

type Environment = PostgreSqlServiceConfig['environment'];
type ServiceKey = 'postgresql';

export interface DockerComposeFileConfig {
  version: string;
  services: {
    [key in ServiceKey]: {
      image: string;
      ports: string[];
      environment: Environment;
      volumes: string[];
    };
  };
}
