import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export type FoundedYearData = {
  specification: string;
  criteria: string;
  result: number;
};

export const FoundedYearType = new GraphQLObjectType<FoundedYearData>({
  name: 'SingleMatchFoundedYear',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLString,
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
