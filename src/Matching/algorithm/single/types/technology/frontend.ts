import { GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import {
  CriteriaGeneralItem,
  CriteriaGeneralItemType,
  TechnologiesType,
  TypeTechnologies,
} from '../shared/index';

export type FrontendData = {
  specification: TypeTechnologies;
  criteria: CriteriaGeneralItem;
  result: number;
};

export const FrontendTechnologiesType = new GraphQLObjectType<FrontendData>({
  name: 'SingleMatchFrontendTechnologies',
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
