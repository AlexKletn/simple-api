export const mongo = {
  url: `${
    process.env.SIMPLE_DB_HOST
  }:${
    process.env.SIMPLE_DB_PORT
  }`,
  dbName: process.env.SIMPLE_DB_NAME,

  user: process.env.SIMPLE_DB_USER,
  pass: process.env.SIMPLE_DB_PASS,

  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default {
  mongo,
};
