import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'graphql';
import { ICulture } from '../../../../../Culture/CultureModel';
import { cultureItemType } from '../../../../../Culture/CultureType';

export type CultureData = {
  specification: ICulture;
  criteria: ICulture;
  result: number;
};

const CultureSectionType = new GraphQLObjectType({
  name: 'CultureSectionType',
  description: 'Culture Section type',
  fields: () => ({
    A: {
      type: GraphQLInt,
      resolve: source => source.A,
    },

    B: {
      type: GraphQLInt,
      resolve: source => source.B,
    },
    C: {
      type: GraphQLInt,
      resolve: source => source.C,
    },

    D: {
      type: GraphQLInt,
      resolve: source => source.D,
    },
  }),
});

const CultureSingleType = new GraphQLObjectType<ICulture>({
  name: 'CultureSingleType',
  description: 'Culture Single Data type',
  fields: () => ({
    organizationIsVery: {
      type: CultureSectionType,
      description: 'organizationIsVery',
      resolve: entity => entity.organizationIsVery,
    },
    leadership: {
      type: CultureSectionType,
      description: 'leadership',
      resolve: entity => entity.leadership,
    },
    managementStyle: {
      type: CultureSectionType,
      description: 'managementStyle',
      resolve: entity => entity.managementStyle,
    },
    glueThatHolds: {
      type: CultureSectionType,
      description: 'glueThatHolds',
      resolve: entity => entity.glueThatHolds,
    },
    organizationEmphasizes: {
      type: CultureSectionType,
      description: 'organizationEmphasizes',
      resolve: entity => entity.organizationEmphasizes,
    },
    organizationDefines: {
      type: cultureItemType,
      description: 'organizationDefines',
      resolve: entity => entity.organizationDefines,
    },
  }),
});

const CultureAverage = new GraphQLObjectType({
  name: 'CultureAverage',
  description: 'Culture Average Data type',
  fields: () => ({
    A: {
      type: GraphQLFloat,
      resolve: source => source.A,
    },
    B: {
      type: GraphQLFloat,
      resolve: source => source.B,
    },
    C: {
      type: GraphQLFloat,
      resolve: source => source.C,
    },
    D: {
      type: GraphQLFloat,
      resolve: source => source.D,
    },
  }),
});

const CultureSingleMatchDataType = new GraphQLObjectType({
  name: 'CultureSingleMatchDataType',
  description: 'Culture Single Match Data type',
  fields: () => ({
    culture: {
      type: CultureSingleType,
      description: 'Culture',
      resolve: source => source.culture,
    },
    average: {
      type: CultureAverage,
      description: 'Total Culture Average for each',
      resolve: source => source.average,
    },
  }),
});

export const CultureDataType = new GraphQLObjectType({
  name: 'CultureDataType',
  description: 'Culture Single Data type',
  fields: () => ({
    specification: {
      type: CultureSingleMatchDataType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: CultureSingleMatchDataType,
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
