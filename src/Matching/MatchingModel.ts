import { Document, model, Types } from 'mongoose';

import { MatchingSchema } from './schema';
import { MatchedCompany } from './types';

export interface IMatching extends Document {
  specification: Types.ObjectId;
  matchedCompanies: Array<MatchedCompany>;
  draftMatchedCompanies: Array<MatchedCompany>;
  status: string;
  chosenCompany: Types.ObjectId;
  client: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default model<IMatching>('Matching', MatchingSchema);
