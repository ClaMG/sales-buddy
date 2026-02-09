import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST, 
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

