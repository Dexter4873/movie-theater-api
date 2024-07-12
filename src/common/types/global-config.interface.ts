export interface GlobalConfig {
  port: number;
  database: DbConfig;
  jwtSecrets: JwtSecrets;
}

export interface DbConfig {
  username: string;
  password: string;
  port: number;
  database: string;
}

export interface JwtSecrets {
  access: string;
  refresh: string;
}
