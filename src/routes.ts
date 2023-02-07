import { Express, Request, Response } from 'express';
import { createUserHandle } from './controller/user.controller';
import {
  createSessionHandler,
  invalidateSessionHandler,
} from './controller/session.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';

function connectRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hello World' });
  });

  app.get('/api/private', requireUser, (req: Request, res: Response) => {
    res.send('Estou Aque');
  });

  app.post('/api/users', validateRequest(createUserSchema), createUserHandle);
  app.post(
    '/api/sessions',
    validateRequest(createSessionSchema),
    createSessionHandler
  );
  app.delete('/api/sessions', requireUser, invalidateSessionHandler);
}

export default connectRoutes;
