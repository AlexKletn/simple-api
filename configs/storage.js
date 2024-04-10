export const mongo = {
  url: `${
    process.env.SIMPLE_DB_HOST
  }:${
    process.env.SIMPLE_DB_PORT
  }`,
  dbName: process.env.SIMPLE_DB_NAME,

  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default {
  mongo,
};
