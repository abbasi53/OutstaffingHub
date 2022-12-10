import { GraphQLObjectType, GraphQLInt } from 'graphql';

const cultureFieldsType = new GraphQLObjectType({
  name: 'CultureFieldsType',
  description: 'Culture from agency and client',
  fields: () => ({
    hierarchy: {
      type: GraphQLInt,
    },
    adhocracy: {
      type: GraphQLInt,
    },
    clan: {
      type: GraphQLInt,
    },
    market: {
      type: GraphQLInt,
    },
  }),
});

export const CultureType = new GraphQLObjectType({
  name: 'CultureType',
  description: 'Culture calculation',
  fields: () => ({
    agency: {
      type: cultureFieldsType,
    },
    client: {
      type: cultureFieldsType,
    },
  }),
});
