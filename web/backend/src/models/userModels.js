import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const User = sequelize.define('User', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    },
    usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    nome: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    empresa: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    senha: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    }
}, {
    tableName: 'Users',  
    freezeTableName: true, // Impede o Sequelize de tentar pluralizar o nome
    timestamps: true       // Adiciona campos 'createdAt' e 'updatedAt'
});