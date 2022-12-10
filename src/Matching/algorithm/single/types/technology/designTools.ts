import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { ToolsType, TypeTools } from '../shared/index';

export type DesignToolsData = {
  specification: TypeTools;
  criteria: string[];
  result: number;
};

export const DesignToolsType = new GraphQLObjectType<DesignToolsData>({
  name: 'SingleMatchDesignTools',
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
