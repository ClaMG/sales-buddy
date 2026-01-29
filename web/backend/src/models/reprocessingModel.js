import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Reprocessing = sequelize.define('Reprocessing', {
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
    valorVenda: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valorRecebido: { 
  type: DataTypes.FLOAT, 
  allowNull: false,
  },
   troco: {
    type: DataTypes.FLOAT
  }, 
  reprocessado: {
    type: DataTypes.BOOLEAN
  }
  
}, {
    tableName: 'Reprocessing',  
    freezeTableName: true, // Impede o Sequelize de tentar pluralizar o nome
    timestamps: false       // campos 'createdAt' e 'updatedAt'
});