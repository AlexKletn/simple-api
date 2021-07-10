import { randomBytes, pbkdf2Sync } from 'crypto';
import jwt from 'jsonwebtoken';
import { Schema, Types } from '../../modules/Storage/DB';

import RoleSchema from './Role';
import TokenSchema from './Token';

export default new Schema({
  email: Types.String,
  nickname: Types.String,
  firstName: Types.String,
  middleName: Types.String,
  roles: [{
    type: Types.ObjectId,
    ref: 'Role',
  }],
  publicKey: Types.String,
  privateKey: Types.String,
  salt: Types.String,
  passwordHash: Types.String,
  tokens: [{
    type: Types.ObjectId,
    ref: 'Token',
  }],

  virtual: {
    password: {
      set(password) {
        this.plainPassword = password;

        if (password) {
          this.salt = randomBytes(128).toString('base64');
          this.passwordHash = pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
          this.salt = undefined;
          this.passwordHash = undefined;
        }
      },
      get() {
        return this.plainPassword;
      },
    },
  },

  methods: {
    async checkPassword(password) {
      if (!password) return false;
      if (!this.passwordHash) return false;
      return pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
    },

    async login(password) {
      if (await this.checkPassword(password)) {
        const payload = {
          id: this.id,
          email: this.email,
        };

        const token = jwt.sign(payload, Secure.jwt.private, {
          ...Secure.opts,
          expiresIn: '30d',
        });

        this.tokens.push(token);
        await this.save();

        return token;
      }
      return null;
    },
  },
});
