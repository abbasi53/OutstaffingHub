import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

export type DomainsData = {
  specification: string[];
  criteria: string[];
  result: number;
};

export const DomainsType = new GraphQLObjectType<DomainsData>({
  name: 'SingleMatchDomains',
  fields: () => ({
    specification: {
      type: GraphQLList(GraphQLString),
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(GraphQLString),
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
