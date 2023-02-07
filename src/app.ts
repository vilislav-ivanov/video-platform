import express from 'express';
import config from 'config';
import logger from './logger';
import connect from './db/connect';
import connectRoutes from './routes';
import connectMiddlewares from './middleware';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, async () => {
  await connect();
  connectMiddlewares(app);
  connectRoutes(app);
  logger.info(`App up and running at http://${host}:${port}`);
});
