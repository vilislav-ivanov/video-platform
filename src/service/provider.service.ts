import ProviderModel from '../model/provider.model';
import { ExecutionError } from '../utils/errors/errors';

export async function createProvider(userId: string, info: string) {
  try {
    return await ProviderModel.create({
      user: userId,
      info,
    });
  } catch (error: any) {
    throw new ExecutionError(error.message);
  }
}
