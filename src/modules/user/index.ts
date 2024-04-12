import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  listUserHandler,
  updateUserHandler,
} from './user.controller';

const router = Router();

/**
 * @openapi
 * /api/users:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get all users
 *    description: Get all users from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get all users
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListUsersResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/', listUserHandler);
router.delete('/:id', deleteUserHandler);

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get user
 *    description: Get user from the database
 *    security:
 *    - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Get user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListUserResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.get('/:id', getUserHandler);
router.patch('/:id', updateUserHandler);

/**
 * @openapi
 * /api/users:
 *  post:
 *    tags:
 *    - Users
 *    summary: Create user
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *    responses:
 *      200:
 *        description: Create user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server error
 */
router.post('/', createUserHandler);

export default router;
