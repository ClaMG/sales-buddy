import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ItemSales = sequelize.define('ItemSales', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sales_id:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

