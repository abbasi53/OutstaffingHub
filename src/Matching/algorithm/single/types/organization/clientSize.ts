import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';

interface RateClient {
  oneTwenty: number;
  twentyOneHundred: number;
  oneHundredFiveHundred: number;
  fiveHundredAndMore: number;
}

export type ClientSizeData = {
  specification: number;
  criteria: RateClient;
  result: number;
};

const RateClientMatchType = new GraphQLObjectType({
  name: 'RateClientMatch',
  fields: {
    oneTwenty: { type: GraphQLInt },
    twentyOneHundred: { type: GraphQLInt },
    oneHundredFiveHundred: { type: GraphQLInt },
    fiveHundredAndMore: { type: GraphQLInt },
  },
});

export const ClientSizeType = new GraphQLObjectType<ClientSizeData>({
  name: 'SingleMatchClientSize',
  fields: () => ({
    specification: {
      type: GraphQLInt,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: RateClientMatchType,
      description: 'Criteria',
      resolve: entity => entity.criteria,
    },
    result: {
      type: GraphQLFloat,
      description: 'Result',
      resolve: entity => entity.result,
    },
  }),
});
