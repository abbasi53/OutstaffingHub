import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const DimensionInputType = new GraphQLInputObjectType({
  name: 'DimensionInputType',
  fields: () => ({
    dimension: {
      type: GraphQLString,
    },
    comment: {
      type: GraphQLString,
    },
    percentage: {
      type: GraphQLInt,
    },
  }),
});

export const CompanyMatchingInputType = new GraphQLInputObjectType({
  name: 'CompanyMatchingInputType',
  fields: () => ({
    companyId: {
      type: GraphQLString,
    },
    totalMatch: {
      type: GraphQLInt,
    },
    status: {
      type: GraphQLString,
    },
    details: {
      type: GraphQLString,
    },
    dimensions: {
      type: GraphQLList(DimensionInputType),
    },
  }),
});
