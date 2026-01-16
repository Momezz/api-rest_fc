import { Router } from 'express';
import {
  listCategoryHandler,
  createCategoryHandeler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler
} from './category.controller';

const router = Router();

router.get('/', listCategoryHandler);
router.get('/:id', getCategoryHandler);
router.post('/', createCategoryHandeler);
router.patch('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;
