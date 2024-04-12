import { Application } from 'express';

import user from './modules/user';

function routes(app: Application) {
  app.use('/api/users', user);
}

export default routes;
