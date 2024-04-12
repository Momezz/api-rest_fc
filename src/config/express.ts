import express from 'express';
import morgan from 'morgan';

function configExpess(app) {
  app.use(express.json());
  app.use(morgan('dev'));
}

export default configExpess;
