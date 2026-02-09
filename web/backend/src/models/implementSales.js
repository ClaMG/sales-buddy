import {ItemSales} from './items.js'
import {Sale} from './salesModels.js'

Sale.hasMany(ItemSales, {
  foreignKey: 'salesId',
  as: 'itens',
  onDelete: 'CASCADE'
});

ItemSales.belongsTo(Sale, {
  foreignKey: 'salesId',
  as: 'parentSale'
});

export {Sale, ItemSales };