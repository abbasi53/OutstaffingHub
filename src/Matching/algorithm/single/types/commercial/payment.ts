import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

type CompanyPayment = {
  partial: number;
  fullInAdvance: number;
  fullAfterDelivery: number;
  freeTrial: number;
};
export type PaymentTermsData = {
  specification: string;
  criteria: CompanyPayment[];
  result: number;
};

const CompanyPaymentTermsType = new GraphQLObjectType({
  name: 'CompanyPaymentTerms',
  fields: {
    partial: {
      type: GraphQLInt,
      description: 'Partial payment',
    },
    fullInAdvance: {
      type: GraphQLInt,
      description: 'Full payment in advance',
    },
    fullAfterDelivery: {
      type: GraphQLInt,
      description: 'Full payment after delivery',
    },
    freeTrial: {
      type: GraphQLInt,
      description: 'Free trial',
    },
  },
});

export const PaymentDataType = new GraphQLObjectType<PaymentTermsData>({
  name: 'SingleMatchPaymentData',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanyPaymentTermsType),
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
