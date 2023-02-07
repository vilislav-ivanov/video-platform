import { Express, Request, Response } from 'express';
import { createUserHandle } from './controller/user.controller';
import {
  createSessionHandler,
  invalidateSessionHandler,
} from './controller/session.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createOrEditProviderSchema } from './schema/provider.schema';
import requireUser from './middleware/requireUser';
import requireOwner from './middleware/requireOwner';
import {
  createProviderHandler,
  getAllProvidersHandler,
  getProviderHandler,
  editProviderHandler,
  deleteProviderHandler,
} from './controller/provider.controller';

function connectRoutes(app: Express) {
  app.post('/api/users', validateRequest(createUserSchema), createUserHandle);
  app.post(
    '/api/sessions',
    validateRequest(createSessionSchema),
    createSessionHandler
  );
  app.delete('/api/sessions', requireUser, invalidateSessionHandler);

  app.post(
    '/api/providers',
    validateRequest(createOrEditProviderSchema),
    requireUser,
    createProviderHandler
  );
  app.get('/api/providers', getAllProvidersHandler);
  app.get('/api/providers/:providerId', getProviderHandler);
  app.put(
    '/api/providers/:providerId',
    validateRequest(createOrEditProviderSchema),
    [requireUser, requireOwner],
    editProviderHandler
  );
  app.delete(
    '/api/providers/:providerId',
    [requireUser, requireOwner],
    deleteProviderHandler
  );
}

export default connectRoutes;
