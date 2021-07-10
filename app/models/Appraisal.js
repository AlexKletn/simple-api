import { Schema, Types } from '../../modules/Storage/DB';

export default new Schema({
  value: Types.Number,
  description: Types.String,
  evaluatingRoles: [{
    type: Types.ObjectId,
    ref: 'role',
  }],
  userID: {
    type: Types.ObjectId,
    ref: 'User',
  },
});
