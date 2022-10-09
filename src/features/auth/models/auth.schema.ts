import { model, Model, Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

import { IAuthDocument } from 'src/features/auth/interfaces/auth.interface';

const authSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: String,
    email: String,
    password: String,
    avatarColor: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
)

const SALT_ROUND = 10;

authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
})

authSchema.methods.comparePassword = async function (password: string) {
  const hashedPassword: string = (this as IAuthDocument).password!;
  return compare(password, hashedPassword);
}

authSchema.methods.hashPassword = async function (password: string) {
  return hash(password, SALT_ROUND);
}

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };