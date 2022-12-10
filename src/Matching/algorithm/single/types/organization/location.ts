import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

type Location = {
  locationPreference: string;
  prioritizeInMatchingLocation: boolean;
  countries: string[];
};

export type LocationData = {
  specification: Location;
  criteria: string;
  result: number;
};

const LocationPreferenceType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    preference: {
      type: GraphQLString,
      description: 'Location preference',
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching location',
    },

    countries: {
      type: GraphQLList(GraphQLString),
      description: 'Countries',
    },
  },
});

export const LocationType = new GraphQLObjectType<LocationData>({
  name: 'SingleMatchLocation',
  fields: () => ({
    specification: {
      type: LocationPreferenceType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLString,
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
