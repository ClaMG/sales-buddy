import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ItemSales = sequelize.define('ItemSales', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  salesId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
        model: 'Sale',
        key: 'id'
    }
  }
}, {
  tableName: 'ItemSales', 
  timestamps: false
});

