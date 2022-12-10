import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export type TechnicalTeamData = {
  specification: string;
  criteria: number;
  result: number;
};

export const TechnicalTeamType = new GraphQLObjectType<TechnicalTeamData>({
  name: 'TechnicalTeamType',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLInt,
      description: 'Criteria',
      resolve: entity => entity.criteria,
    },
    result: {
      type: GraphQLInt,
      description: 'Result',
      resolve: entity => entity.result,
    },
  }),
});
