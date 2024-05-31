import { Model, FilterQuery } from 'mongoose';
import Category, { CategoryDocument } from './category.model';

export async function getCategoryById(id: string) {
  try {
    return await Category.findById(id);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCategories(filter?: FilterQuery<CategoryDocument>) {
  const categories = filter ? await Category.find(filter) : await Category.find();
  return categories;
}

export async function createCategory(
  input: Model<Omit<CategoryDocument, 'createdAt' | 'updatedAt'>>,
) {
  return Category.create(input);
}

export async function updateCategory(
  filter: FilterQuery<CategoryDocument>,
  input: Model<CategoryDocument>,
) {
  const category = await Category.findOneAndUpdate(filter, input, { new: true });
  return category;
}

export async function deleteCategory(filter: FilterQuery<CategoryDocument>) {
  const category = await Category.findOneAndDelete(filter);
  return category;
}
