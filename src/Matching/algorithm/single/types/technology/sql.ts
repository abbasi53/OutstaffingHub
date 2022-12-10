import { GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import {
  CriteriaGeneralItem,
  CriteriaGeneralItemType,
  DatabasesType,
  TypeDatabases,
} from '../shared/index';

export type SqlData = {
  specification: TypeDatabases;
  criteria: CriteriaGeneralItem[];
  result: number;
};

export const SqlDatabasesType = new GraphQLObjectType<SqlData>({
  name: 'SingleMatchSqlDatabases',
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
