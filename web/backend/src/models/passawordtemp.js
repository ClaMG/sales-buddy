import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const PasswordTemp = sequelize.define('PasswordTemp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { 
    tableName: 'passwordTemps',
    timestamps: false       // campos 'createdAt' e 'updatedAt'
});

