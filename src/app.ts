import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConfig } from './configs/dbConfig';
import { envConfig } from './configs/envConfig';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

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


