import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
}

if (process.env.DATABASE_URL) {
configs = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: true,
    logging: true,
    migrations: ['./src/shared/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/typeorm/entities/*.ts'],
    extra: {
      ssl: true
    }
  };
}

console.log(configs);

const dataSource = new DataSource(configs);

dataSource.initialize();

export default dataSource;
