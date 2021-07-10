import { Schema as SchemaMongoose } from 'mongoose';

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
    for (const virtualKey of Object.keys(virtual)) {
      Object.assign(this.virtual(virtualKey), virtual[virtualKey]);
    }
  }
}

export const { Types } = SchemaMongoose;
