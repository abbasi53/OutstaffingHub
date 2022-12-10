import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

type SpecificationCertification = {
  certifications: string[];
  prioritizeInMatching: boolean;
};

export type CertificationsData = {
  specification: SpecificationCertification;
  criteria: string[];
  result: number;
};

const SpecificationCertificationType = new GraphQLObjectType({
  name: 'SpecificationCertification',
  description: 'Certifications data',
  fields: () => ({
    certifications: {
      type: GraphQLList(GraphQLString),
      description: 'Certifications',
    },
    prioritizeInMatching: {
      type: GraphQLBoolean,
      description: 'Prioritize in matching',
    },
  }),
});

export const CertificationsType = new GraphQLObjectType<CertificationsData>({
  name: 'SingleMatchCertifications',
  fields: () => ({
    specification: {
      type: SpecificationCertificationType,
      description: 'Specification',
      resolve: entity => entity.specification,
    },
    criteria: {
      type: GraphQLList(GraphQLString),
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
