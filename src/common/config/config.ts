import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

export const ENV = {
  DB_URL: process.env.DB_URL || `mongodb://localhost:27017/AvtoService?replicaSet=${process.env.DB_REPLICA_SET}&tls=true`,
  HOST: process.env.HOST || '0.0.0.0',
  PAYSYS_PORT: parseInt(process.env.PAYSYS_PORT) || 2000,
  EMPLOYEE_PORT: parseInt(process.env.EMPLOYEE_PORT) || 3000,
  USER_PORT: parseInt(process.env.USER_PORT) || 4000,
  UPLOAD_PORT: parseInt(process.env.UPLOAD_PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '1W',

};


export const API = {
  local: process.env.LOCAL || 'local'
};
