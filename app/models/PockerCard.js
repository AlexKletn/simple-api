import { Schema, Types } from '../../modules/Storage/DB';

export default new Schema({
  name: Types.String,
  value: Types.Number,
  description: Types.String,
});
