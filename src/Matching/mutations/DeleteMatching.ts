import { GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';
import MatchingType from '../MatchingType';
import MatchingModel from '../MatchingModel';
import * as MatchingLoader from '../MatchingLoader';
import SpecificationModel from '../../Specification/SpecificationModel';

export const mutation = mutationWithClientMutationId({
  name: 'MatchingDeletion',
  description: 'Delete Matching',
  inputFields: {
    matchingId: {
      type: GraphQLString,
    },
  },

  mutateAndGetPayload: async ({ matchingId }, _context) => {
    try {
      const { id } = fromGlobalId(matchingId);

      const matching = await MatchingModel.findOneAndUpdate(
        {
          _id: id,
          isActive: true,
        },
        { isActive: false },
      );

      if (!matching) return { error: 'Matching not found' };

      await SpecificationModel.findOneAndUpdate(
        {
          _id: matching.specification,
        },
        { status: 'SUBMITTED' },
      );

      return {
        id: matchingId,
        error: null,
        success: true,
      };
    } catch (err) {
      console.log(err);

      return err;
    }
  },

  outputFields: {
    payload: {
      type: MatchingType,
      resolve: async ({ id }, _args, context) => {
        const matching = await MatchingLoader.load(context, id);

        if (!matching) return null;

        console.log('matching', matching);

        return {
          cursor: toGlobalId('Matching', id),
          node: matching,
        };
      },
      ...errorField,
      ...successField,
    },
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
