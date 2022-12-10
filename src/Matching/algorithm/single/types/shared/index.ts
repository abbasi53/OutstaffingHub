import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export interface CriteriaGeneralItem {
  industry: string;
  startedIn: string;
  specializedPeople: number;
  completedProjects: number;
}

export const CriteriaGeneralItemType = new GraphQLObjectType({
  name: 'CriteriaGeneralItem',
  description: 'CriteriaGeneralItem Type',
  fields: () => ({
    industry: {
      type: GraphQLString,
      resolve: source => source.industry,
    },
    startedIn: {
      type: GraphQLString,
      resolve: source => source.startedIn,
    },
    specializedPeople: {
      type: GraphQLInt,
      resolve: source => source.specializedPeople,
    },
    completedProjects: {
      type: GraphQLInt,
      resolve: source => source.completedProjects,
    },
  }),
});

export type TypeTechnologies = {
  technologies: string[];
  prioritizeInMatching: boolean;
};

export const TechnologiesType = new GraphQLObjectType({
  name: 'Technologies',
  description: 'Technologies Type',
  fields: () => ({
    technologies: {
      type: GraphQLList(GraphQLString),
      resolve: source => source.technologies,
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      resolve: source => source.prioritizeInMatching,
    },
  }),
});

export type TypeDatabases = {
  databases: string[];
  prioritizeInMatching: boolean;
};

export const DatabasesType = new GraphQLObjectType({
  name: 'Databases',
  description: 'Databases Type',
  fields: () => ({
    databases: {
      type: GraphQLList(GraphQLString),
      resolve: source => source.databases,
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      resolve: source => source.prioritizeInMatching,
    },
  }),
});

export type TypeTools = {
  tools: string[];
  prioritizeInMatching: boolean;
};

export const ToolsType = new GraphQLObjectType({
  name: 'SingleMatchTools',
  description: 'Tools Type',
  fields: () => ({
    tools: {
      type: GraphQLList(GraphQLString),
      resolve: source => source.tools,
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      resolve: source => source.prioritizeInMatching,
    },
  }),
});
