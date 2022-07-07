import bcrypt from 'bcryptjs';
import Model from '../../lib/facade';
import userSchema from './user-schema';

class UserModel extends Model {
  async comparePassword(password: any, userP: any) { // eslint-disable-line class-methods-use-this
    let isMatch;
    try { isMatch = await bcrypt.compare(password, userP); } catch (e) { return Promise.reject(e); }
    return Promise.resolve(isMatch);
  }

  async encryptPswd(password: any) { // eslint-disable-line class-methods-use-this
    let salt, hash;
    try {
      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(password, salt);
    } catch (e) { return Promise.reject(e); }
    return Promise.resolve(hash);
  }
}
export default new UserModel(userSchema);
