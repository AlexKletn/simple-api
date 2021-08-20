import { Model, Types } from '../../modules/Storage/DB';

export default Model('Contact', {
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
