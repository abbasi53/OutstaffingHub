import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

type CompanyService = {
  service: string;
  totalProjects: number;
};

export type ServicesData = {
  specification: string[];
  criteria: CompanyService[];
  result: number;
};

const CompanyServiceType = new GraphQLObjectType<CompanyService>({
  name: 'CompanyService',
  fields: () => ({
    service: {
      type: GraphQLString,
      description: 'Service',
    },

    totalProjects: {
      type: GraphQLInt,
      description: 'Total projects',
    },
  }),
});

export const ServicesType = new GraphQLObjectType<ServicesData>({
  name: 'SingleMatchServices',
  fields: () => ({
    specification: {
      type: GraphQLList(GraphQLString),
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanyServiceType),
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
