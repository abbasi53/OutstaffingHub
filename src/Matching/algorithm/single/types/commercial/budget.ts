import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

type CompanyBudget = {
  duration: string;
  budget: string;
  teamSize: number;
  exampleUrl: string;
};
export type BudgetData = {
  specification: string;
  criteria: CompanyBudget[];
  result: number;
};

const CompanyBudgetType = new GraphQLObjectType({
  name: 'CompanyBudgetType',
  fields: {
    duration: {
      type: GraphQLString,
    },
    budget: {
      type: GraphQLString,
    },
    teamSize: {
      type: GraphQLInt,
    },
    exampleUrl: {
      type: GraphQLString,
    },
  },
});

export const BudgetDataType = new GraphQLObjectType<BudgetData>({
  name: 'SingleMatchBudgetData',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanyBudgetType),
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
