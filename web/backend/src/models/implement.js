import {ItemUsuario} from './items.js'
import {User} from './userModels.js'

User.hasMany(ItemUsuario, {
  foreignKey: 'usuario_id',
  as: 'item',
  onDelete: 'CASCADE'
});

ItemUsuario.belongsTo(User, {
  foreignKey: 'usuario_id'
});

export { User as Usuario, ItemUsuario };