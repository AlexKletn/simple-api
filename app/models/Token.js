import { Schema, Types } from '../../modules/Storage/DB';

export default new Schema({
  value: Types.String,
  expiresAt: Types.Date,

  methods: {
    check() {
      if (this.expiresAt <= new Date()) return false;

      return true;
    },
  },
});
