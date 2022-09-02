import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv'

dotenv.config();

let configs = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'selftherapy',
  synchronize: true,
  logging: true,
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  extra: {
    ssl: true
  }
}

if (process.env.DATABASE_URL) {
configs = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string) || 5432,
    username: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_DB as string,
    synchronize: true,
    logging: true,
    migrations: ['./src/shared/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/typeorm/entities/*.ts'],
    extra: {
      ssl: true
    }
  };
}

const dataSource = new DataSource(configs as DataSourceOptions);

dataSource.initialize();

export default dataSource;
