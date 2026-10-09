import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

function configExpess(app) {
  app.use(cors({
    origin: [
    'http://localhost:3000',
    'https://control-financiero-green.vercel.app'
  ],
    credentials: true
  }));
  app.use(express.json());
  app.use(morgan('dev'));
}

export default configExpess;
