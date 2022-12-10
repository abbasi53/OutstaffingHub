import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { CriteriaGeneralItem, CriteriaGeneralItemType } from '../shared/index';

export type InfrastructureData = {
  specification: string[];
  criteria: CriteriaGeneralItem[];
  result: number;
};

export const InfrastructureType = new GraphQLObjectType<InfrastructureData>({
  name: 'SingleMatchInfrastructure',
  fields: () => ({
    specification: {
      type: GraphQLList(GraphQLString),
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
