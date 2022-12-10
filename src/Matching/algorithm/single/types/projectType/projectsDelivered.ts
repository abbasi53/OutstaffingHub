import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export type ProjectsDeliveredData = {
  specification: string;
  criteria: number;
  result: number;
};

export const ProjectsDeliveredType = new GraphQLObjectType<
  ProjectsDeliveredData
>({
  name: 'SingleMatchProjectsDelivered',
  fields: () => ({
    specification: {
      type: GraphQLString,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLInt,
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
