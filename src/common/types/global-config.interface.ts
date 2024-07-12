export interface GlobalConfig {
  port: number;
  database: DbConfig;
}

export interface DbConfig {
  username: string;
  password: string;
  port: number;
  database: string;
}
