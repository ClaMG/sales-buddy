import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ItemReprocessing = sequelize.define('ItemReprocessing', {
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
        model: 'Reprocessing',
        key: 'id'
    }
  }
}, {
  tableName: 'ItemReprocessing', 
  timestamps: false
});

