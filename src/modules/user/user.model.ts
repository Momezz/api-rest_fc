import { Schema, model, Document } from 'mongoose';
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  categories: [object];
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }]
}, {
  timestamps: true,
  versionKey: false,
});

const User = model<UserDocument>('User', UserSchema);

export default User;
