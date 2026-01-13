import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/app/database/database.sqlite',
  logging: false, 
});

export default sequelize;

