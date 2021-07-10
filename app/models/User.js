import Schema from '../../modules/Storage/DB';

export default new Schema({
  email: 'string',
  nickname: 'string',
  firstName: 'string',
  middleName: 'string',
  publicKey: 'string',
  privateKey: 'string',
  _password: 'string',
  tokens: 'array',
});
