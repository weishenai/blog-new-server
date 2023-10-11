interface Environment {
  SERVER: SERVER;
  DATABASE: DATABASE;
  LOG_CONFIG: LOG_CONFIG;
  SECURITY_CONFIG: SECURITY_CONFIG;
}

interface SERVER {
  host: string;
  port: number;
}

interface LOG_CONFIG {
  TIMESTAMP: boolean;
  LOG_LEVEL: string;
  LOG_ON: boolean;
}

interface DATABASE {
  user: string;
  password: string;
  database: string;
  host: string;
  port: string;
  type: string;
  synchronize: boolean;
}

interface SECURITY_CONFIG {
  secret: string;
}

export { Environment, SERVER, LOG_CONFIG, DATABASE, SECURITY_CONFIG };
