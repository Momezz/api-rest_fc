import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/database';
import routes from './routes';
import configExpess from './config/express';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
configExpess(app);
connectDb();
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});

