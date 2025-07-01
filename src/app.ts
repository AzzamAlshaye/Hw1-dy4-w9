import 'dotenv/config';            
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from '../utils/logger';
import { connectDB } from '../config/database';

import carDealerRouter from './routers/carDealer.routes';
import carMakeRouter from './routers/carMake.routes';
import carRouter from './routers/car.routes';

const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny', {
  stream: { write: (msg: string) => logger.info(msg.trim()) }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/car-dealer', carDealerRouter);
app.use('/api/car-make',    carMakeRouter);
app.use('/api/car',         carRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Car Dealer API - Welcome!' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(' Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

async function startServer() {
  await connectDB();  
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}

startServer();
