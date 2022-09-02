import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv'

dotenv.config();

let configs: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  synchronize: true,
  logging: true,
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
}

if (process.env.DATABASE_URL) {
configs = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    url: process.env.DATABASE_URL as string,
    synchronize: true,
    logging: true,
    entities: [`${process.env.DATABASE_ENTITIES}`],
    migrations: [`${process.env.DATABASE_MIGRATIONS}`],
    ssl: {
      rejectUnauthorized: false
    },
  };
}

const dataSource = new DataSource(configs as DataSourceOptions);

dataSource.initialize();

export default dataSource;
