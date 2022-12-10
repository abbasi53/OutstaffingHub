import { GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import {
  CriteriaGeneralItem,
  CriteriaGeneralItemType,
  TechnologiesType,
  TypeTechnologies,
} from '../shared/index';

export type BackendData = {
  specification: TypeTechnologies;
  criteria: CriteriaGeneralItem;
  result: number;
};

export const BackendTechnologiesType = new GraphQLObjectType<BackendData>({
  name: 'SingleMatchBackendTechnologies',
  fields: () => ({
    specification: {
      type: TechnologiesType,
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
