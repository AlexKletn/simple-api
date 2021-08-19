import mongoose from 'mongoose';
import Schema from './Schema';

export default (modelName, schemaConfig) => mongoose.model(modelName, new Schema(schemaConfig));
