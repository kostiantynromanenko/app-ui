export interface PostgreSqlDockerComposeRequest {
  port: string;
  username: string;
  password: string;
  database: string;
  volume: string;
}
