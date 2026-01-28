import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'salesbuddy_db', 
  process.env.DB_USER || 'admin', 
  process.env.DB_PASS || '123456', 
  {
    host: process.env.DB_HOST || 'db_postgres', 
    dialect: 'postgres',
    port: 5432,
    logging: false,
    define: {
        timestamps: true, // Recomendo manter para o Postgres
        underscored: true // Transforma camelCase em snake_case (user_id)
    }
  }
);

export default sequelize;

