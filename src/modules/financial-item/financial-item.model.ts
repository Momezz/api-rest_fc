import mongoose, { Schema, model, Document } from 'mongoose';

export interface FinancialItemDocument extends Document {
  user: mongoose.Schema.Types.ObjectId,
  isAsset: Boolean,
  category: String,
  description: String
  amount: Number,
}

const financialItemSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isAsset: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const FinancialItem = model<FinancialItemDocument>('FinancialItem', financialItemSchema);

export default FinancialItem;


