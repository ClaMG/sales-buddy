import {Reprocessing} from './reprocessingModel.js';
import {ItemReprocessing} from './itemsReprocessing.js';

Reprocessing.hasMany(ItemReprocessing, {
  foreignKey: 'salesId',
  as: 'itens',
  onDelete: 'CASCADE'
});


ItemReprocessing.belongsTo(Reprocessing, {
  foreignKey: 'salesId'
});

export { Reprocessing, ItemReprocessing };