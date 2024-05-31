import { Application } from 'express';
import user from './modules/user';
import financialItem from './modules/financial-item';
import category from './modules/category';

function routes(app: Application) {
  app.use('/api/users', user);
  app.use('/api/financial-item', financialItem);
  app.use('/api/categories', category);
}

export default routes;
