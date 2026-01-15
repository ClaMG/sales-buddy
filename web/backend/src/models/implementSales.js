import {ItemSales} from './items.js'
import {Sale} from './salesModels.js'

Sale.hasMany(ItemSales, {
  foreignKey: 'sales_id',
  as: 'itens',
  onDelete: 'CASCADE'
});

ItemSales.belongsTo(Sale, {
  foreignKey: 'sales_id'
});

export { Sale, ItemSales };