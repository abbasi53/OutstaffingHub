import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export const DimensionType = new GraphQLObjectType({
  name: 'DimensionType',
  description: 'Dimension Type',
  fields: () => ({
    dimension: {
      type: GraphQLString,
      description: 'Name of the Dimension. e.g: Organization',
    },
    percentage: {
      type: GraphQLInt,
      description: 'Total Percentage of the Dimension',
    },
    comment: {
      type: GraphQLString,
      description: 'Comment of the Dimension',
    },
  }),
});
