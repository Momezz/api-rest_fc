import User from '../user/user.model';
import {
  getCategories,
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} from './category.services';
import { Request, Response, NextFunction } from 'express';

export async function getCategoryHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ msg: 'Category not found' })
    }
    return res.status(200).json(category);
  } catch (e: any) {
    return next(e);
  }
}

export async function listCategoryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (e: any) {
    return next(e);
  }
}

export async function createCategoryHandeler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const category = await createCategory(data);
    const user = await User.findById(data.id);
    if (user) {
      user.categories.push(category._id);
      await user.save();
    }
    return res.status(201).json(category);
  } catch (e: any) {
    return next(e);
  }
}

export async function updateCategoryHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ msg: 'Category not found' });
    }
    const updatedCategory = await updateCategory({ _id: id }, data);
    return res.status(200).json(updatedCategory);
  } catch (e: any) {
    return next(e)
  }
}

export async function deleteCategoryHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const query = { _id: id };
    const category = await deleteCategory(query);
    if (!category) {
      res.status(404).json({ msg: "Category not found" })
    }
    return res.status(200).json(category);
  } catch (e: any) {
    return next(e);
  }
}
