import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/loggers';
import routes from './routes';
import errorHandler from './middlewares/error-handler';

const PORT = process.env.PORT || 3000;

const app = express();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectMongo();

// Start the server
const startServer = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server: ', err);
  }
};

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', routes);

app.use(errors());
app.use(errorLogger);

app.use(errorHandler);

startServer();
