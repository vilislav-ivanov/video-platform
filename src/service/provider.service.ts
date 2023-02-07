import ProviderModel, { ProviderDocument } from '../model/provider.model';
import { ConflictError, NotFoundError } from '../utils/errors/errors';

export async function createProvider(userId: string, info: string) {
  try {
    const provider = await getProviderByUserId(userId);
    if (provider) throw new ConflictError('provider already exist.');
    return await ProviderModel.create({
      user: userId,
      info,
    });
  } catch (error: any) {
    throw error;
  }
}

export async function getAll() {
  return await find({});
}

export async function getById(providerId: string) {
  const providers = await find({ _id: providerId });
  return providers;
}

export async function findAndUpdate(filter?: any, update?: any) {
  return await ProviderModel.findOneAndUpdate(filter, update, { new: true });
}

export async function findByIdAndDelete(providerId: string) {
  return await ProviderModel.findByIdAndDelete(providerId);
}

async function find(filter: any, projection?: any) {
  return await ProviderModel.findOne(filter, projection).lean();
}

async function getProviderByUserId(userId: string) {
  return await find({ user: userId });
}
