import { Model, Types } from '../../modules/Storage/DB';
import User from './User';

export default Model('Message', {
  contact: {
    type: Types.ObjectId,
    ref: User,
  },
  message: {
    type: Types.String,
    required: true,
  },
});
