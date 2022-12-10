import { GraphQLObjectType, GraphQLFloat } from 'graphql';

export type EmployeesData = {
  specification: number;
  criteria: number;
  result: number;
};

export const EmployeesType = new GraphQLObjectType<EmployeesData>({
  name: 'SingleMatchEmployees',
  fields: () => ({
    specification: {
      type: GraphQLFloat,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLFloat,
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
