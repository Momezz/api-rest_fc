import { Application } from 'express';
import user from './modules/user';
import financialItem from './modules/financial-item';
import category from './modules/category';
import authLocal from './auth/local';

function routes(app: Application) {
  app.use('/api/users', user);
  app.use('/api/financial-item', financialItem);
  app.use('/api/categories', category);
  app.use('/auth/local', authLocal);
}

export default routes;
