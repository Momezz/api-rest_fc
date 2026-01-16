import mongoose from 'mongoose';

export type financialItem = {
  user: mongoose.Schema.Types.ObjectId,
  isAsset: Boolean,
  category: String,
  description: String
  amount: Number,
}
