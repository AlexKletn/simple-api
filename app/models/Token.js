import { Schema } from '../../modules/Storage/DB';

export default new Schema({
  value: 'string',
  expiresAt: 'date',

  methods: {
    check() {
      const currentDate = new Date();

      if(this.expiresAt <= currentDate) return false



      return true;
  },
});
