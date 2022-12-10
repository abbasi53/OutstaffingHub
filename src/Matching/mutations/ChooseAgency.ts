import { GraphQLString } from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { MatchingConnection } from '../MatchingType';
import MatchingModel, { IMatching } from '../MatchingModel';
import * as MatchingLoader from '../MatchingLoader';
import SpecificationModel from '../../Specification/SpecificationModel';
import { ObjectId } from '../../../../types';
import { NotifyCompanyChosenOnMatching } from '../emails/choosenAgency';
import { SEND_EMAILS } from '../../../config';

interface ChooseAgencyArgs {
  specification: string;
  agency: ObjectId;
  matchingId: string;
}

export const mutation = mutationWithClientMutationId({
  name: 'ChooseAgencyOnMatching',
  description: 'Set agency chosen on matching.',
  inputFields: {
    specification: {
      type: GraphQLString,
    },
    agency: {
      type: GraphQLString,
    },
    matchingId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args: ChooseAgencyArgs) => {
    const { specification, agency, matchingId } = args;

    try {
      const { id } = fromGlobalId(matchingId);
      const { id: specID } = fromGlobalId(specification);

      const matching = await MatchingModel.findOneAndUpdate(
        { _id: id },
        { chosenCompany: agency, status: 'FINALLY_MATCHED' },
      ).lean();

      if (!matching) return { error: 'Matching not found' };

      if (matching) {
        const specificationUpdated = await SpecificationModel.findOneAndUpdate(
          {
            _id: specID,
          },
          {
            status: 'CHOSEN',
          },
        );

        if (!specificationUpdated) return { error: 'Specification not found' };

        if (SEND_EMAILS) {
          await NotifyCompanyChosenOnMatching(
            agency,
            specificationUpdated?.owner,
            specificationUpdated?.projectType.projectName,
          );
        }
      }

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
        const matching: IMatching | null = await MatchingLoader.load(ctx, id);

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
  },
  ...mutation,
};

export default mutationField;
