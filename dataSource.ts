import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Users } from './src/entities/Users';
import { Boards } from 'src/entities/Boards';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Boards],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
