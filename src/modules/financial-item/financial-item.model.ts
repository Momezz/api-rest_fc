import mongoose, { Schema, model, Document } from 'mongoose';

export interface FinancialItemDocument extends Document {
  transactionType: String,
  category: String,
  description: String
  amount: Number,
}

const financialItemSchema = new Schema({
  transactionType: {
    type: String,
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


