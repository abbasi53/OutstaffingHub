import { GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import {
  CriteriaGeneralItem,
  CriteriaGeneralItemType,
  DatabasesType,
  TypeDatabases,
} from '../shared/index';

export type NoSqlData = {
  specification: TypeDatabases;
  criteria: CriteriaGeneralItem[];
  result: number;
};

export const NoSqlDatabasesType = new GraphQLObjectType<NoSqlData>({
  name: 'SingleMatchNoSqlDatabases',
  fields: () => ({
    specification: {
      type: DatabasesType,
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
