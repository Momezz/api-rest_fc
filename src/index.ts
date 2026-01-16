import * as dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDb from './config/database';
import routes from './routes';
import configExpess from './config/express';

const app = express();
const port = process.env.PORT || 8080;
app.use(cookieParser());
configExpess(app);
connectDb();
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
