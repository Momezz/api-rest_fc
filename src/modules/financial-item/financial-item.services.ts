import { Model, FilterQuery } from 'mongoose';
import FinancialItem, { FinancialItemDocument } from './financial-item.model';

export async function createFinancialItem(
  input: Model<Omit<FinancialItemDocument, 'createdAt' | 'updatedAt'>>,
) {
  return FinancialItem.create(input);
}

export async function getFinancialItemByID(id: string) {
  try {
    return await FinancialItem.findById(id);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFinancialItem(filter: FilterQuery<FinancialItemDocument>) {
  const financialitem = await FinancialItem.findOne(filter);
  return financialitem;
}

export async function getFinancialItems(filter?: FilterQuery<FinancialItemDocument>) {
  const financialitems = filter ? await FinancialItem.find(filter) : await FinancialItem.find();
  return financialitems;
}

export async function updateFinancialItem(
  filter: FilterQuery<FinancialItemDocument>,
  input: Model<FinancialItemDocument>,
) {
  const financialitem = await FinancialItem.findOneAndUpdate(filter, input, { new: true });
  return financialitem;
}

export async function deleteFinancialItem(filter: FilterQuery<FinancialItemDocument>) {
  const financialitem = await FinancialItem.findOneAndDelete(filter);
  return financialitem;
}

export async function getFinancialItemByEmail(email: string) {
  const financialitem = await FinancialItem.findOne({ email });
  return financialitem;
}
