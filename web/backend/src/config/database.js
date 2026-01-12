import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME || 'meu_projeto', 'root', process.env.DB_ROOT_PASSWORD || 'senha_segura', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Desativa logs detalhados
});

export default sequelize;