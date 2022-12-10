import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { ToolsType, TypeTools } from '../shared/index';

export type PmToolsData = {
  specification: TypeTools;
  criteria: string[];
  result: number;
};

export const PmToolsType = new GraphQLObjectType<PmToolsData>({
  name: 'SingleMatchPmTools',
  fields: () => ({
    specification: {
      type: ToolsType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(GraphQLString),
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
