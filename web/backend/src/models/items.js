import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ItemSales = sequelize.define('ItemSales', {
  descricao: {
    type: DataTypes.STRING
  }
});

