import { Schema, Types } from '../../modules/Storage/DB';

export default new Schema({
  name: Types.String,
  description: Types.String,
  appraisals: [{
    type: Types.ObjectId,
    ref: 'Appraisal',
  }],
});
