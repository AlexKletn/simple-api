import { Model, Types } from '../../modules/Storage/DB';

export default Model('File', {
  data: {
    type: Types.Buffer,
    required: true,
  },
  type: {
    type: Types.String,
    required: true,
  },
});
