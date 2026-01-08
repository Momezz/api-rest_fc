import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  categories: object[];
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true, minlength: 6 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function save(next: Function) {
  const user = this as unknown as UserDocument;
  try {
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

async function comparePassword(
  this: UserDocument,
  candidatePassword: string,
  next: Function
): Promise<boolean> {
  const user = this;
  try {
    console.log(candidatePassword, user.password);
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
  } catch (error: any) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;
const User = model<UserDocument>('User', UserSchema);
export default User;
