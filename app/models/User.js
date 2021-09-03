import { pbkdf2Sync, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { Model, Types } from '../../modules/Storage/DB';
import { jwtRSA } from '../../configs/secure';
import File from './File';

export default Model('User', {
  email: {
    type: Types.String,
    required: true,
  },
  name: {
    type: Types.String,
    required: true,
  },
  image: {
    type: Types.ObjectId,
    ref: File,
  },

  salt: {
    type: Types.String,
  },
  passwordHash: {
    type: Types.String,
    required: true,
  },
  tokens: [{
    type: Types.String,
  }],

  virtual: {
    password: {
      set(password) {
        this.plainPassword = password;

        if (password) {
          const salt = randomBytes(128).toString('base64');

          const passwordHash = pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('binary');

          this.set({
            salt, passwordHash,
          });
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
      return pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('binary') === this.passwordHash;
    },
    async login(password) {
      if (await this.checkPassword(password)) {
        const payload = {
          id: this.id,
          email: this.email,
        };

        const token = jwt.sign(payload, jwtRSA.private, {
          algorithm: 'RS256',
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
