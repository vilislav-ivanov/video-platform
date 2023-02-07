import { Express, Request, Response } from 'express';
import { createUserHandle } from './controller/user.controller';
import {
  createSessionHandler,
  invalidateSessionHandler,
} from './controller/session.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createProviderSchema } from './schema/provider.schema';
import requireUser from './middleware/requireUser';
import { createProviderHandler } from './controller/provider.controller';

function connectRoutes(app: Express) {
  app.post('/api/users', validateRequest(createUserSchema), createUserHandle);
  app.post(
    '/api/sessions',
    validateRequest(createSessionSchema),
    createSessionHandler
  );
  app.delete('/api/sessions', requireUser, invalidateSessionHandler);

  app.post(
    '/api/provider',
    validateRequest(createProviderSchema),
    requireUser,
    createProviderHandler
  );
}

export default connectRoutes;
