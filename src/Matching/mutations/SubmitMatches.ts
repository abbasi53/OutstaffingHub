import { GraphQLString } from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';
import MatchingModel, { IMatching } from '../MatchingModel';
import SpecificationModel from '../../Specification/SpecificationModel';
import { MatchingConnection } from '../MatchingType';
import * as MatchingLoader from '../MatchingLoader';
import { NotifyClientMatchesReady } from '../emails/submitMatches';
import { SEND_EMAILS } from '../../../config';

export const mutation = mutationWithClientMutationId({
  name: 'SubmitMatchesMutation',
  description: 'Submit matches after companies accepted to match specification',
  inputFields: {
    specificationId: {
      type: GraphQLString,
    },
    matchingId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async args => {
    const { specificationId, matchingId } = args;

    try {
      const { id } = fromGlobalId(matchingId);
      const { id: specID } = fromGlobalId(specificationId);

      const matching = await MatchingModel.findOneAndUpdate(
        { _id: id },
        { status: 'FINALLY_MATCHED' },
      ).lean();

      if (!matching) return { error: 'Matching not found' };

      const specificationUpdated = await SpecificationModel.findOneAndUpdate(
        {
          _id: specID,
          isActive: true,
        },
        {
          status: 'MATCHED_TO_PROVIDERS',
        },
      );

      if (!specificationUpdated) return { error: 'Specification not found' };

      // send email to client notifying them that matches are ready
      if (SEND_EMAILS) {
        await NotifyClientMatchesReady(specificationUpdated);
      }

      return {
        id,
        success: true,
        error: null,
      };
    } catch (err) {
      return {
        id: null,
        success: false,
        error: err,
      };
    }
  },
  outputFields: {
    matchingEdge: {
      type: MatchingConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const matching: IMatching | null = await MatchingLoader.load(ctx, id);

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
