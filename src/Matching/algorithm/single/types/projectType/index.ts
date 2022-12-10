import { GraphQLObjectType } from 'graphql';
import { CollaborationData, CollaborationType } from './collaboration';
import { DomainsData, DomainsType } from './domains';
import { MethodologiesData, MethodologiesType } from './methodologies';
import {
  ProjectsDeliveredData,
  ProjectsDeliveredType,
} from './projectsDelivered';
import { ServicesData, ServicesType } from './services';
import { SoftwareTypeData, SoftwareTypeType } from './softwareType';

export type ProjectTypeData = {
  collaboration: CollaborationData;
  methodologies: MethodologiesData;
  domains: DomainsData;
  projectsDelivered: ProjectsDeliveredData;
  softwareType: SoftwareTypeData;
  services: ServicesData;
};

export const ProjectTypeDataType = new GraphQLObjectType<ProjectTypeData>({
  name: 'ProjectTypeData',
  fields: {
    collaboration: {
      type: CollaborationType,
      description: 'Collaboration',
      resolve: entity => entity.collaboration,
    },
    methodologies: {
      type: MethodologiesType,
      description: 'Methodologies',
      resolve: entity => entity.methodologies,
    },
    domains: {
      type: DomainsType,
      description: 'Domains',
      resolve: entity => entity.domains,
    },
    projectsDelivered: {
      type: ProjectsDeliveredType,
      description: 'Projects delivered',
      resolve: entity => entity.projectsDelivered,
    },
    softwareType: {
      type: SoftwareTypeType,
      description: 'Software type',
      resolve: entity => entity.softwareType,
    },
    services: {
      type: ServicesType,
      description: 'Services',
      resolve: entity => entity.services,
    },
  },
});
