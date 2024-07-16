export interface PostgreSqlServiceConfig {
  environment: {
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
  };
  ports: string[];
  volumes: string[];
}
