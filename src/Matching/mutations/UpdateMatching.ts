import { GraphQLList, GraphQLString } from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { MatchingConnection } from '../MatchingType';
import MatchingModel from '../MatchingModel';
import * as MatchingLoader from '../MatchingLoader';
import { ObjectId } from '../../../../types';

import { MatchedCompany } from '../types';
import { CompanyMatchingInputType } from './types/inputTypes';

interface UpdateMatchingArgs {
  specification: ObjectId;
  agencies: Array<MatchedCompany>;
  agency: ObjectId | undefined;
  matchingId: string;
}

export const mutation = mutationWithClientMutationId({
  name: 'MatchingUpdate',
  description: 'Update Matching',
  inputFields: {
    specification: {
      type: GraphQLString,
    },
    agencies: {
      type: GraphQLList(CompanyMatchingInputType),
    },
    agency: {
      type: GraphQLString,
    },
    matchingId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args: UpdateMatchingArgs, _ctx) => {
    const { specification, agency, agencies, matchingId } = args;

    try {
      const { id } = fromGlobalId(matchingId);

      const updatedData = {
        specification,
        ...(agency ? { agency } : {}),
        ...(agencies ? { agencies } : {}),
      };

      const matching = await MatchingModel.findOneAndUpdate(
        { _id: id },
        updatedData,
      );

      if (!matching) return { error: 'Matching not found' };

      return {
        id,
        error: null,
      };
    } catch (err) {
      return {
        id: null,
        error: err,
      };
    }
  },
  outputFields: {
    matchingEdge: {
      type: MatchingConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const matching = await MatchingLoader.load(ctx, id);

        if (!matching) return null;

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
