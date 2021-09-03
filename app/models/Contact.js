import { Model, Types } from '../../modules/Storage/DB';
import File from './File';

export default Model('Contact', {
  image: {
    type: Types.ObjectId,
    ref: File,
  },
  name: Types.String,
  bio: Types.String,
  role: {
    type: Types.String,
  },
  phones: [{
    type: String,
  }],
  emails: [{
    type: String,
  }],
});
