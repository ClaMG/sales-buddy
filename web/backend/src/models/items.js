import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ItemUsuario = sequelize.define('ItemUsuario', {
  descricao: {
    type: DataTypes.STRING
  }
});

