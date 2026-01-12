import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
    nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
    troco: {
    type: DataTypes.DECIMAL(10, 2)
  },
})

