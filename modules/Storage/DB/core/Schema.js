import mongoose from 'mongoose';

const { Schema: SchemaMongoose } = mongoose;

export default class Schema extends SchemaMongoose {
  constructor({
    methods,
    statics,
    virtual,
    queries,

    ...values
  }) {
    super(values);

    Object.assign(this.methods, methods);
    Object.assign(this.statics, statics);
    Object.assign(this.query, queries);

    // eslint-disable-next-line no-restricted-syntax
    for (const virtualKey of Object.keys(virtual || {})) {
      Object.keys(virtual[virtualKey]).forEach((key) => {
        this.virtual(virtualKey)[key](virtual[virtualKey][key]);
      });
    }
  }
}

export const { Types } = SchemaMongoose;
