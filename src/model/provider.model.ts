import mongoose, { Document } from 'mongoose';
import { UserDocument } from './user.model';
import { VideoDocument } from './video.model';

export interface ProviderDocument extends Document {
  user: UserDocument['_id'];
  info: string;
  videos: VideoDocument[];
}

const ProviderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    info: { type: String, required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  },
  {
    timestamps: true,
  }
);

const ProviderModel = mongoose.model<ProviderDocument>(
  'Provider',
  ProviderSchema
);

export default ProviderModel;
