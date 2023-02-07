import { Request, Response } from 'express';
import { get } from 'lodash';
import logger from '../logger';
import {
  createProvider,
  findAndUpdate,
  findByIdAndDelete,
  getAll,
  getById,
} from '../service/provider.service';
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

export async function getAllProvidersHandler(req: Request, res: Response) {
  try {
    const providers = await getAll();
    return res.status(200).json({ providers });
  } catch (error: any) {
    logger.error(error.message);
    errorHandler(error, res);
  }
}

export async function getProviderHandler(
  req: Request<{ providerId: string }>,
  res: Response
) {
  const { providerId } = req.params;
  try {
    const provider = await getById(providerId);
    return res.status(200).json({ provider });
  } catch (error: any) {
    logger.error(error.message);
    errorHandler(error, res);
  }
}

export async function editProviderHandler(
  req: Request<{ providerId: string }, {}, { info: string }>,
  res: Response
) {
  try {
    const { providerId } = req.params;
    const { info } = req.body;

    const provider = await findAndUpdate({ _id: providerId }, { info });
    return res.status(200).json({ provider });
  } catch (error: any) {
    logger.error(error.message);
    errorHandler(error, res);
  }
}

export async function deleteProviderHandler(
  req: Request<{ providerId: string }>,
  res: Response
) {
  try {
    const { providerId } = req.params;

    await findByIdAndDelete(providerId);

    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error.message);
    errorHandler(error, res);
  }
}
