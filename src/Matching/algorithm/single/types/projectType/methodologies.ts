import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

type SpecificationMethodology = {
  frameworks: string[];
  prioritizeInMatching: boolean;
};

type CompanyMethodology = {
  methodology: string;
  totalProjects: number;
};

export type MethodologiesData = {
  specification: SpecificationMethodology;
  criteria: CompanyMethodology[];
  result: number;
};

const CompanyMethodologyType = new GraphQLObjectType({
  name: 'CompanyMethodology',
  description: 'Company methodology data',
  fields: () => ({
    methodology: {
      type: GraphQLString,
      description: 'Methodology',
    },

    totalProjects: {
      type: GraphQLInt,
      description: 'Total projects',
    },
  }),
});

const SpecificationMethodologyType = new GraphQLObjectType({
  name: 'SpecificationMethodology',
  description: 'Specification methodology data',
  fields: () => ({
    frameworks: {
      type: new GraphQLList(GraphQLString),
      description: 'Frameworks',
    },

    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching',
    },
  }),
});

export const MethodologiesType = new GraphQLObjectType<MethodologiesData>({
  name: 'SingleMatchMethodologies',
  fields: () => ({
    specification: {
      type: SpecificationMethodologyType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CompanyMethodologyType),
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
