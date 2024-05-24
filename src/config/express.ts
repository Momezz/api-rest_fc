import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

function configExpess(app) {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
}

export default configExpess;
