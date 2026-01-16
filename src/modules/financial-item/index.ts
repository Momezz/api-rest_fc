import { Router } from 'express';

import {
  createFinancialItemHandler,
  deleteFinancialItemHandler,
  getFinancialItemHandler,
  listFinancialItemHandler,
  updateFinancialItemHandler,
} from './financial-item.controller';

const router = Router();

/**
 * @openapi
 * /api/financialitems:
 *  get:
 *    tags:
 *    - FinancialItems
 *    summary: Get all financialitems
 *    description: Get all financialitems from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get all financialitems
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListFinancialItemsResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/', listFinancialItemHandler);
router.delete('/:id', deleteFinancialItemHandler);

/**
 * @openapi
 * /api/financialitems/{id}:
 *  get:
 *    tags:
 *    - FinancialItems
 *    summary: Get financialitem
 *    description: Get financialitem from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get financialitem
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListFinancialItemResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/:id', getFinancialItemHandler);
router.patch('/:id', updateFinancialItemHandler);

/**
 * @openapi
 * /api/financialitems:
 *  post:
 *    tags:
 *    - FinancialItems
 *    summary: Create financialitem
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFinancialItemRequest'
 *    responses:
 *      200:
 *        description: Create financialitem
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateFinancialItemResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.post('/', createFinancialItemHandler);

export default router;
