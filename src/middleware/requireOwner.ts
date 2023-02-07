import { Request, Response, NextFunction } from 'express';
import { getById as getProviderById } from '../service/provider.service';
import { get } from 'lodash';

async function requireOwner(req: Request, res: Response, next: NextFunction) {
  const userId = get(req, 'user._id');
  const providerId = get(req, 'params.providerId') as string;

  const provider = await getProviderById(providerId);

  if (!provider) {
    return res.status(404).send({ provider: 'provider not found' });
  }

  if (provider.user._id.toString() === userId) {
    return next();
  }
  return res.status(401).send({ user: 'user is not authorized.' });
}

export default requireOwner;
