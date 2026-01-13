import {ItemSales} from './items.js'
import {Sale} from './salesModels.js'

Sale.hasMany(ItemSales, {
  foreignKey: 'venda_id',
  as: 'itens',
  onDelete: 'CASCADE'
});

ItemSales.belongsTo(Sale, {
  foreignKey: 'venda_id'
});

export { Sale, ItemSales };