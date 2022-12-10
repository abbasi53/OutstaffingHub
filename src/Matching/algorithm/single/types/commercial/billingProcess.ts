import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

type Billing = {
  timeMaterials: number;
  fixedPrice: number;
};

export type BillingData = {
  specification: string;
  criteria: Billing[];
  result: number;
};

const CompanyBillingType = new GraphQLObjectType({
  name: 'CompanyBillingType',
  fields: {
    timeMaterials: {
      type: GraphQLInt,
      resolve: source => source.timeMaterials,
    },
    fixedPrice: {
      type: GraphQLInt,
      resolve: source => source.fixedPrice,
    },
  },
});

export const BillingDataType = new GraphQLObjectType<BillingData>({
  name: 'SingleMatchBillingData',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanyBillingType),
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
