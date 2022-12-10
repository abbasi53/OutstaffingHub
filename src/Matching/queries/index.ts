/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { GraphQLContext, QueryArgs } from '../../../../types';
import UserType from '../../User/UserType';
import * as MatchingLoader from '../MatchingLoader';
import MatchingType, { MatchingConnection } from '../MatchingType';
import MatchedCompanyType from './types';
import { MatchDataType } from './types/singleMatchData';

export const MatchingQueries = {
  matching: {
    type: GraphQLNonNull(MatchingConnection.connectionType),
    args: {
      ...connectionArgs,
    },
    resolve: async (_: any, args: QueryArgs, context: GraphQLContext) => {
      return MatchingLoader.loadAll(context, args);
    },
  },
  getCompaniesForMatching: {
    type: GraphQLList(MatchedCompanyType),
    args: {
      specificationId: {
        type: GraphQLString,
      },
    },
    resolve: (_root: any, args: QueryArgs, context: GraphQLContext) => {
      return MatchingLoader.getCompaniesForMatching(
        context,
        args.specificationId,
      );
    },
  },
  getMatchesAdminPreview: {
    type: GraphQLList(UserType),
    args: {
      slugs: {
        type: GraphQLList(GraphQLString),
      },
    },
    resolve: (_root: any, args: QueryArgs, context: GraphQLContext) => {
      return MatchingLoader.getMatchesAdminPreview(context, args.slugs);
    },
  },
  getSingleMatchData: {
    type: MatchDataType,
    args: {
      specificationId: {
        type: GraphQLString,
        specificationId: 'specificationId',
      },
      companyId: {
        type: GraphQLString,
        description: 'Company id',
      },
    },
    resolve: (_root: any, args: QueryArgs, _context: GraphQLContext) => {
      return MatchingLoader.getSingleMatchData(
        args.specificationId,
        args.companyId,
      );
    },
  },
  getMatchedCompaniesBySpecification: {
    type: MatchingType,
    args: {
      specificationId: { type: GraphQLString },
    },
    resolve: (_root: any, args: QueryArgs, _context: GraphQLContext) => {
      return MatchingLoader.getMatchedCompaniesBySpecification(
        args.specificationId,
      );
    },
  },
};
