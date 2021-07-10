import { Schema, Types } from '../../modules/Storage/DB';

export default new Schema({
  name: Types.String,
  appraisals: [{
    type: Types.ObjectId,
    ref: 'Appraisal',
  }],
  users: [{
    type: Types.ObjectId,
    ref: 'User',
  }],
});
