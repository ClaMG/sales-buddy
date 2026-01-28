import {Reprocessing} from './reprocessingModel.js';
import {ItemReprocessing} from './itemsReprocessing.js';

Reprocessing.hasMany(ItemReprocessing, {
  foreignKey: 'reprocessingId',
  as: 'itens',
  onDelete: 'CASCADE'
});


ItemReprocessing.belongsTo(Reprocessing, {
  foreignKey: 'reprocessingId'
});

export { Reprocessing, ItemReprocessing };