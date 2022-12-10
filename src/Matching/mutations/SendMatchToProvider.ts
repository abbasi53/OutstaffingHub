import { GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';
import MatchingModel from '../MatchingModel';

import { MatchingConnection } from '../MatchingType';
import * as MatchingLoader from '../MatchingLoader';
import { CompanyMatchingInputType } from './types/inputTypes';
import SpecificationModel from '../../Specification/SpecificationModel';
import { NotifyCompanyMatchedWithSpecification } from '../emails/providerAcceptance';
import { SEND_EMAILS } from '../../../config';

const MAX_COMPANIES_PER_MATCHING = 10;

const mutation = mutationWithClientMutationId({
  name: 'SendMatchToProvider',
  description: 'Send Match to Provider',
  inputFields: {
    matchedCompany: {
      type: CompanyMatchingInputType,
      description: 'Company matched to the specification',
    },
    specificationId: {
      type: GraphQLString,
      description: 'Specification ID',
    },
  },

  mutateAndGetPayload: async (args, _context) => {
    const { matchedCompany, specificationId } = args;

    try {
      const { id } = fromGlobalId(specificationId);
      // if a match already exists just add the company to the list
      const existMatching = await MatchingModel.findOne({
        specification: id,
      });

      if (existMatching) {
        const currentMatchedCompanies = existMatching.matchedCompanies.length;

        if (currentMatchedCompanies < MAX_COMPANIES_PER_MATCHING) {
          // added to list
          existMatching.matchedCompanies.push({
            ...matchedCompany,
            status: 'PENDING',
          });

          const draftCompaniesUpdated = existMatching.draftMatchedCompanies.filter(
            company => company.companyId !== matchedCompany.companyId,
          );

          existMatching.draftMatchedCompanies = draftCompaniesUpdated;

          await existMatching.save();

          // send email to the matched company
          if (SEND_EMAILS) {
            await NotifyCompanyMatchedWithSpecification(
              matchedCompany.companyId,
            );
          }

          return {
            id: existMatching.id,
            error: null,
          };
        }

        return {
          error: 'Maximum companies per matching reached.',
        };
      }

      // create a new match if is not created yet
      try {
        const specificationOwnerId = await SpecificationModel.findOne(
          { _id: id },
          'owner -_id',
        );

        const matching = await new MatchingModel({
          ...args,
          specification: id,
          client: specificationOwnerId?.owner,
          matchedCompanies: [{ ...matchedCompany, status: 'PENDING' }],
        }).save();

        if (matching) {
          await SpecificationModel.findOneAndUpdate(
            { _id: id },
            { status: 'WAITING_PROVIDER_CONFIRMATION' },
          );

          // send email to the matched company
          if (SEND_EMAILS) {
            await NotifyCompanyMatchedWithSpecification(
              matchedCompany.companyId,
            );
          }

          return {
            id: matching?._id,
            error: null,
          };
        }
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      return {
        error: err,
      };
    }

    return {
      id: null,
      error: 'Error creating matching',
    };
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
