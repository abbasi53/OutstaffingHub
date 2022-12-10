import { GraphQLString } from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { MatchingConnection } from '../MatchingType';
import MatchingModel from '../MatchingModel';
import * as MatchingLoader from '../MatchingLoader';

import { MatchedCompany } from '../types';
import { CompanyMatchingInputType } from './types/inputTypes';
import SpecificationModel from '../../Specification/SpecificationModel';

interface UpdateMatchingArgs {
  matchingId: string;
  matchedCompany: MatchedCompany;
  specificationId: string;
}

export const mutation = mutationWithClientMutationId({
  name: 'UpdateMatchedCompanies',
  description: 'Update matched companies',
  inputFields: {
    specificationId: {
      type: GraphQLString,
      description: 'Specification ID',
    },
    matchingId: {
      type: GraphQLString,
      description: 'Matching ID',
    },
    matchedCompany: {
      type: CompanyMatchingInputType,
      description: 'Matched company object',
    },
  },
  mutateAndGetPayload: async (args: UpdateMatchingArgs, _ctx) => {
    const { matchingId, specificationId, matchedCompany } = args;

    const { id: specId } = fromGlobalId(specificationId);

    const {
      companyId,
      totalMatch,
      dimensions,
      status,
      details,
    } = matchedCompany;
    console.log(
      '🚀 ~ file: UpdateMatchedCompanies.ts ~ line 53 ~ mutateAndGetPayload: ~ matchedCompany',
      matchedCompany,
    );

    try {
      if (!matchingId) {
        const specificationOwnerId = await SpecificationModel.findOne(
          { _id: specId },
          'owner -_id',
        );

        const matching = await new MatchingModel({
          specification: specId,
          draftMatchedCompanies: [matchedCompany],
          matchedCompanies: [],
          client: specificationOwnerId?.owner,
          details,
        }).save();

        if (!matching) {
          return {
            error: 'Error creating matching',
          };
        }

        return {
          id: matching._id,
          error: false,
        };
      }

      const { id } = fromGlobalId(matchingId);
      const matching = await MatchingModel.findOne({
        _id: id,
        specification: specId,
      })
        .then(doc => {
          if (!doc) {
            return null;
          }

          const updatedCompanyIsOnDraft = doc.draftMatchedCompanies.find(
            company => company.companyId === companyId,
          );

          const updatedCompanyIsOnMatched = doc.matchedCompanies.find(
            company => company.companyId === companyId,
          );

          if (updatedCompanyIsOnDraft) {
            const draftMatchedCompanies = doc.draftMatchedCompanies.map(
              company =>
                company.companyId.toString() === companyId
                  ? {
                      companyId: company.companyId,
                      totalMatch,
                      dimensions,
                      status,
                      details,
                    }
                  : company,
            );

            doc.draftMatchedCompanies = draftMatchedCompanies;

            return doc.save();
          }

          if (updatedCompanyIsOnMatched) {
            const matchedCompanies = doc.matchedCompanies.map(company => {
              if (company.companyId.toString() === companyId) {
                return {
                  companyId: company.companyId,
                  totalMatch,
                  status,
                  dimensions,
                  details,
                };
              }

              return company;
            });

            doc.matchedCompanies = matchedCompanies;

            return doc.save();
          }

          if (!updatedCompanyIsOnMatched && !updatedCompanyIsOnDraft) {
            const draftMatchedCompanies = doc.draftMatchedCompanies.concat({
              companyId,
              totalMatch,
              dimensions,
              status,
              details,
            });

            doc.draftMatchedCompanies = draftMatchedCompanies;

            return doc.save();
          }

          return doc;
        })
        .catch(err => {
          console.log(err);
        });

      if (!matching) return { error: 'Matching not found' };

      return {
        id: matching._id,
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
