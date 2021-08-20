import mongoose from 'mongoose';

// eslint-disable-next-line no-return-assign
export default ({ url, ...dbConfig }) => {
  mongoose.connect(`mongodb://${url}`, dbConfig);
};
