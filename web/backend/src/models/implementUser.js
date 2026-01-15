import {PasswordTemp} from './passawordtemp.js'
import {User} from './userModels.js'

User.hasMany(PasswordTemp, {
  foreignKey: 'user_id',
  as: 'passwordTemp',
  onDelete: 'CASCADE'
});

PasswordTemp.belongsTo(User, {
  foreignKey: 'user_id'
});

export { User, PasswordTemp };