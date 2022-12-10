import { GraphQLBoolean, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';
import MatchingModel from '../MatchingModel';
import { GraphQLContext } from '../../../../types';
import { NotifyCompanyDeclines } from '../emails/providerDeclines';
import { SEND_EMAILS } from '../../../config';

export const mutation = mutationWithClientMutationId({
  name: 'MatchingCompanyRejection',
  description: 'Company reject to be matched with specification.',
  inputFields: {
    matchingId: {
      type: GraphQLString,
    },
  },

  mutateAndGetPayload: async ({ matchingId }, context: GraphQLContext) => {
    const { id } = fromGlobalId(matchingId);

    try {
      const matching = await MatchingModel.findOne({
        _id: id,
        isActive: true,
      }).then(match => {
        const matchToBeUpdated = match?.matchedCompanies.find(
          item => item.companyId === context?.user?._id.toString(),
        );

        if (matchToBeUpdated) {
          matchToBeUpdated.status = 'REJECTED';

          match?.save();
        }

        // email if agency declines match
        if (SEND_EMAILS) {
          NotifyCompanyDeclines(context?.user?._id.toString());
        }

        return match;
      });

      if (!matching) return { error: 'Matching not found' };

      return {
        companyAccepted: true,
        error: null,
        success: true,
      };
    } catch (err) {
      console.log(err);

      return err;
    }
  },

  outputFields: {
    companyRejectToBeMatched: {
      type: GraphQLBoolean,
      resolve: ({ companyAccepted }) => companyAccepted,
    },
    ...errorField,
    ...successField,
  },
});

const mutationField = {
  extensions: {
    authenticatedOnly: true,
  },
  ...mutation,
};

export default mutationField;
