import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { CriteriaGeneralItem, CriteriaGeneralItemType } from '../shared';

type SpecificationSoftwareType = {
  type: string;
  prioritizeInMatching: boolean;
};

export type SoftwareTypeData = {
  specification: SpecificationSoftwareType[];
  criteria: CriteriaGeneralItem[];
  result: number;
};

const SpecificationSoftwareTypeType = new GraphQLObjectType<
  SpecificationSoftwareType
>({
  name: 'SpecificationSoftwareType',
  fields: () => ({
    type: {
      type: GraphQLString,
      description: 'Software type',
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching',
    },
  }),
});

export const SoftwareTypeType = new GraphQLObjectType<SoftwareTypeData>({
  name: 'SingleMatchSoftwareType',
  fields: () => ({
    specification: {
      type: SpecificationSoftwareTypeType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(CriteriaGeneralItemType),
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
