import mongoose from 'mongoose';

// eslint-disable-next-line no-return-assign
export default ({ url, ...dbConfig }) => (this.connection = mongoose.connect(url, dbConfig));
