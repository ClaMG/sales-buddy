import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const PasswordTemp = sequelize.define('PasswordTemp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
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
    tableName: 'password_temps',
    timestamps: false       // campos 'createdAt' e 'updatedAt'
});

