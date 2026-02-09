import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import {User} from './userModels.js'

export const PasswordTemp = sequelize.define('PasswordTemp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", 
            key: 'id'       
        }
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


// PasswordTemp pertence a um User
PasswordTemp.belongsTo(User, { 
    foreignKey: "userId", 
    as: "user" 
});

