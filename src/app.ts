import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConfig } from './configs/dbConfig';
import { envConfig } from './configs/envConfig';

import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import passport from 'passport';
import './configs/passport'

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize()); 

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

dbConfig.initialize().then(() => {
  console.log('Datasource initialized')
  const server = app.listen(envConfig.PORT, () => {
    console.log(`Server is running on port ${envConfig.PORT}`);
  });

  server.on('error', (err) => {
    console.error('Error occurred while starting the server', err);
    process.exit(1);
  });
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
  process.exit(1);
});


