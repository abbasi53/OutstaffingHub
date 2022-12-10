import { Schema } from 'mongoose';

export const DimensionSchema = new Schema({
  dimension: String,
  comment: String,
  percentage: Number,
});
