import ItemUsuario from './items'
import Usuario from './userModels'

Usuario.hasMany(ItemUsuario, {
  foreignKey: 'usuario_id',
  as: 'item',
  onDelete: 'CASCADE'
});

ItemUsuario.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

export default {Usuario, ItemUsuario}
