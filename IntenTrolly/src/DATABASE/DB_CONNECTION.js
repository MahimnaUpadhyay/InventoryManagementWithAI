import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { DB_NAME } from '../constant.js';

dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_URL,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false
});

const DB_Connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {DB_Connect, sequelize};
