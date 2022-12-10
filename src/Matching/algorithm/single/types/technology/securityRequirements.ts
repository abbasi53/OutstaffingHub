import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

type SpecificationSecurity = {
  securityRequirement: string;
  prioritizeInMatching: boolean;
};

type CompanySecurity = {
  measure: string;
  totalProjects: number;
};

export type SecurityRequirementsData = {
  specification: SpecificationSecurity;
  criteria: CompanySecurity[];
  result: number;
};

const SpecificationSecurityType = new GraphQLObjectType<SpecificationSecurity>({
  name: 'SingleMatchSpecificationSecurity',
  fields: () => ({
    securityRequirement: {
      type: GraphQLString,
      description: 'Security requirement',
      resolve: entity => entity.securityRequirement,
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching',
      resolve: entity => entity.prioritizeInMatching,
    },
  }),
});

const CompanySecurityType = new GraphQLObjectType<CompanySecurity>({
  name: 'SingleMatchCompanySecurity',
  fields: () => ({
    measure: {
      type: GraphQLString,
      description: 'Measure',
      resolve: entity => entity.measure,
    },
    totalProjects: {
      type: GraphQLInt,
      description: 'Total projects',
      resolve: entity => entity.totalProjects,
    },
  }),
});

export const SecurityRequirementsType = new GraphQLObjectType<
  SecurityRequirementsData
>({
  name: 'SingleMatchSecurityRequirementsDatabases',
  fields: () => ({
    specification: {
      type: SpecificationSecurityType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanySecurityType),
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
