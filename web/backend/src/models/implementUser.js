import {PasswordTemp} from './passawordtemp.js'
import {User} from './userModels.js'

User.hasMany(PasswordTemp, {
  foreignKey: 'userId',
  as: 'passwordTemp',
  onDelete: 'CASCADE'
});

PasswordTemp.belongsTo(User, {
  foreignKey: 'userId'
});

export { User, PasswordTemp };