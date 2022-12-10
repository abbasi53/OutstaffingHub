import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { CriteriaGeneralItem, CriteriaGeneralItemType } from '../shared';

export type CollaborationData = {
  specification: string;
  criteria: CriteriaGeneralItem[];
  result: number;
};

export const CollaborationType = new GraphQLObjectType<CollaborationData>({
  name: 'SingleMatchCollaboration',
  fields: () => ({
    specification: {
      type: GraphQLString,
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
