import { Schema } from 'mongoose';
import { DimensionSchema } from './dimensions';

export const MatchedCompanySchema = new Schema({
  companyId: String,
  totalMatch: Number,
  status: String,
  details: String,
  dimensions: [DimensionSchema],
});
