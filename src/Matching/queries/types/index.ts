/* eslint-disable @typescript-eslint/ban-ts-comment */
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface, registerTypeLoader } from '../../../node/typeRegister';
import * as UserLoader from '../../../User/UserLoader';
import UserType from '../../../User/UserType';
import { load } from '../../MatchingLoader';

interface MatchedCompany {
  totalMatch: number;
  companyId: string;
  status: string;
  details: string;
  specification: string;
  dimensions: {
    dimension: {
      organization: {
        percentage: number;
      };
    };
  };
}

const DimensionType = new GraphQLObjectType({
  name: 'Dimension',
  fields: {
    dimension: { type: GraphQLString },
    comment: { type: GraphQLString },
    percentage: { type: GraphQLInt },
  },
});

const MatchedCompanyType = new GraphQLObjectType<MatchedCompany>({
  name: 'MatchedCompany',
  description: 'Object of a possible company match',
  // @ts-ignore
  fields: () => ({
    ...objectIdResolver,
    id: globalIdField('MatchedCompany'),
    totalMatch: {
      type: GraphQLInt,
      description: 'Total match',
      resolve: entity => entity.totalMatch,
    },

    company: {
      type: UserType,
      description: 'Company id',
      resolve: (entity, _args, context) =>
        entity.companyId
          ? UserLoader.load(context, entity.companyId.toString())
          : null,
    },
    details: {
      type: GraphQLString,
      description: 'Company match details',
      resolve: entity => entity.details,
    },
    status: {
      type: GraphQLString,
      description: 'Status',
      resolve: entity => entity.status,
    },
    dimensions: {
      type: GraphQLList(DimensionType),
      description: 'Dimensions',
      resolve: entity => entity.dimensions,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(MatchedCompanyType, load);

export const MatchedCompanyConnection = connectionDefinitions({
  name: 'MatchedCompany',
  nodeType: MatchedCompanyType,
});

export default MatchedCompanyType;
