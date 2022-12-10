import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { CriteriaGeneralItem, CriteriaGeneralItemType } from '../shared/index';

type SpecificationTesting = {
  framework: string;
  prioritizeInMatching: boolean;
};

export type TestingData = {
  specification: SpecificationTesting;
  criteria: CriteriaGeneralItem[];
  result: number;
};

const SpecificationTestingType = new GraphQLObjectType<SpecificationTesting>({
  name: 'SingleMatchSpecificationTesting',
  fields: () => ({
    framework: {
      type: GraphQLString,
      description: 'Framework',
      resolve: entity => entity.framework,
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching',
      resolve: entity => entity.prioritizeInMatching,
    },
  }),
});

export const TestingType = new GraphQLObjectType<TestingData>({
  name: 'SingleMatchTesting',
  fields: () => ({
    specification: {
      type: SpecificationTestingType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CriteriaGeneralItemType),
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
