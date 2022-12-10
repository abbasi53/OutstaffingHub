import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { connectionDefinitions, globalIdField } from 'graphql-relay';
import {
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { IMatching } from './MatchingModel';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './MatchingLoader';

import * as UserLoader from '../User/UserLoader';
import * as CultureLoader from '../Culture/CultureLoader';

import userType from '../User/UserType';
import { CultureType, DimensionType } from './types';

const MatchingStatus = {
  MATCHED_WITH_AGENCIES: {
    value: 'MATCHED_WITH_COMPANIES',
    description: 'When the project is matched with agencies',
  },
  FINALLY_MATCHED: {
    value: 'FINALLY_MATCHED',
    description: 'When the client choose an agency',
  },
};

export const MatchingStatusEnumType = new GraphQLEnumType({
  name: 'MatchingStatusEnumType',
  values: MatchingStatus,
});

export const matchesType = new GraphQLObjectType({
  name: 'MatchesType',
  description: 'Company match type',
  fields: () => ({
    companyId: {
      type: GraphQLString,
      description: 'Id of the company',
    },
    totalMatch: {
      type: GraphQLInt,
      description: 'total match percentage',
    },
    status: {
      type: GraphQLString,
      description: 'company match status',
    },
    details: {
      type: GraphQLString,
      description: 'company match details',
    },
    dimensions: {
      type: GraphQLList(DimensionType),
      description: 'Dimensions from company criteria, after run the matching',
    },
  }),
});

const CompanyMatchedType = new GraphQLObjectType({
  name: 'CompanyMatchedType',
  description: 'All companies matched with a specification',
  fields: () => ({
    company: {
      type: userType,
    },
    match: {
      type: matchesType,
    },
    culture: {
      type: CultureType,
    },
  }),
});

const MatchingType = new GraphQLObjectType<IMatching>({
  name: 'Matching',
  description: 'Matching Type',
  fields: () => ({
    id: globalIdField('Matching'),
    ...objectIdResolver,

    matchedCompanies: {
      type: GraphQLList(CompanyMatchedType),
      description: 'Companies matched with a project',
      resolve: (entity, _args, context) => {
        const ids = entity?.matchedCompanies?.map(company =>
          company?.companyId.toString(),
        );

        return ids.map(async id => {
          const cultures = await CultureLoader.loadCultureCalculationForMatches(
            context,
            id,
          );

          return {
            company: UserLoader.load(context, id),
            match: entity.matchedCompanies.find(el => el.companyId === id),
            culture: {
              client: cultures.loggedCalculation,
              agency: cultures.agencyCalculation,
            },
          };
        });
      },
    },

    draftMatchedCompanies: {
      type: GraphQLList(CompanyMatchedType),
      description: 'Companies matched with a project in draft',
      resolve: (entity, _args, context) => {
        const ids = entity?.draftMatchedCompanies?.map(company =>
          company?.companyId.toString(),
        );

        return ids.map(async id => {
          const cultures = await CultureLoader.loadCultureCalculationForMatches(
            context,
            id,
          );

          return {
            company: UserLoader.load(context, id),
            match: entity.draftMatchedCompanies.find(el => el.companyId === id),
            culture: {
              client: cultures.loggedCalculation,
              agency: cultures.agencyCalculation,
            },
          };
        });
      },
    },

    status: {
      type: GraphQLString,
      description: 'Specification status',
      resolve: entity => entity.status,
    },

    specification: {
      type: GraphQLString,
      resolve: entity => entity.specification,
    },

    chosenCompany: {
      type: userType,
      description: 'Agency choosed by client that matched with the project',
      resolve: (entity, _args, context) =>
        entity?.chosenCompany
          ? UserLoader.load(context, entity.chosenCompany.toString())
          : null,
    },

    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(MatchingType, load);

export const MatchingConnection = connectionDefinitions({
  name: 'Matching',
  nodeType: MatchingType,
});

export default MatchingType;
