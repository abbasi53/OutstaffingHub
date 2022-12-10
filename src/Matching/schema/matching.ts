import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import isActiveMongooseField from '../../../mongoose/isActiveMongooseField';

import { MatchingStatusEnum } from '../enum/status';
import { MatchedCompanySchema } from './matchedCompany';

const { ObjectId } = mongoose.Schema.Types;

export const MatchingSchema = new Schema(
  {
    specification: {
      type: ObjectId,
      required: true,
    },

    matchedCompanies: {
      type: [MatchedCompanySchema],
      ref: 'User',
      index: true,
    },

    draftMatchedCompanies: {
      type: [MatchedCompanySchema],
      ref: 'User',
      index: true,
    },

    status: {
      type: String,
      enum: MatchingStatusEnum,
      default: 'MATCHED_WITH_COMPANIES',
    },

    chosenCompany: {
      type: ObjectId,
      ref: 'User',
      index: true,
    },

    client: {
      type: ObjectId,
      ref: 'User',
      index: true,
    },

    ...isActiveMongooseField,
  },
  {
    collection: 'Matching',
    timestamps: true,
  },
);
