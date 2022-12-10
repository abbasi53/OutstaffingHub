import { GraphQLList, GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';
import MatchingModel from '../MatchingModel';

import { MatchingConnection } from '../MatchingType';
import * as MatchingLoader from '../MatchingLoader';
import SpecificationModel from '../../Specification/SpecificationModel';
import { CompanyMatchingInputType } from './types/inputTypes';

const mutation = mutationWithClientMutationId({
  name: 'MatchingCreation',
  description: 'Create new Matching',
  inputFields: {
    specification: {
      type: GraphQLString,
    },
    matchedCompanies: {
      type: GraphQLList(CompanyMatchingInputType),
    },
  },

  mutateAndGetPayload: async (args, _context) => {
    const { id: specificationId } = fromGlobalId(args.specification);
    const specificationOwnerId = await SpecificationModel.findOne(
      { _id: specificationId },
      'owner -_id',
    );

    try {
      const matching = await new MatchingModel({
        ...args,
        specification: specificationId,
        client: specificationOwnerId?.owner,
      }).save();

      if (matching) {
        // try {
        //   await SpecificationModel.findOneAndUpdate(
        //     { _id: args.specification },
        //     { status: 'WAITING_FOR_MATCHES' },
        //   );
        // } catch (e) {
        //   console.log(e);
        // }

        return {
          id: matching._id,
          error: null,
        };
      }

      return {
        id: null,
        error: 'Error creating matching',
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  },

  outputFields: {
    MatchingEdge: {
      type: MatchingConnection.edgeType,
      resolve: async ({ id }, _args, ctx) => {
        const matching = await MatchingLoader.load(ctx, id);

        if (!matching) return null;

        return {
          cursor: toGlobalId('Matching', id),
          node: matching,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});

const mutationField = {
  extensions: {
    authenticatedOnly: true,
    adminOnly: true,
  },
  ...mutation,
};

export default mutationField;
