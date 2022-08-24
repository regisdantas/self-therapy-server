import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
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
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
