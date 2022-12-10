import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { CriteriaGeneralItem, CriteriaGeneralItemType } from '../shared/index';

export type CmsData = {
  specification: string;
  criteria: CriteriaGeneralItem[];
  result: number;
};

export const CmsType = new GraphQLObjectType<CmsData>({
  name: 'SingleMatchCms',
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
      type: GraphQLFloat,
      description: 'Result',
      resolve: entity => entity.result,
    },
  }),
});
