import { Application } from 'express';
import user from './modules/user';
import financialItem from './modules/financial-item';

function routes(app: Application) {
  app.use('/api/users', user);
  app.use('/api/financial-item', financialItem);
}

export default routes;
