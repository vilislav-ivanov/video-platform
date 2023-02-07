import { Request, Response } from 'express';
import { get } from 'lodash';
import logger from '../logger';
import { createProvider } from '../service/provider.service';
import errorHandler from '../utils/errors/error-handler';
import { UnauthorizedError } from '../utils/errors/errors';

interface CreateProviderInput {
  info: string;
}

export async function createProviderHandler(
  req: Request<{}, {}, CreateProviderInput, {}>,
  res: Response
) {
  try {
    const userId = get(req, 'user._id');
    if (!userId) throw new UnauthorizedError('user is required');
    const { info } = req.body;
    const provider = await createProvider(userId, info);

    return res.status(200).json({ provider });
  } catch (error: any) {
    logger.error(error.message);
    errorHandler(error, res);
  }
}
