/* eslint-disable @typescript-eslint/ban-ts-comment */
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../../../node/typeRegister';
import {
  CommercialData,
  CommercialDataType,
  CultureData,
  CultureDataType,
  IndustryData,
  IndustryDataType,
  OrganizationData,
  OrganizationDataType,
  ProjectTypeData,
  ProjectTypeDataType,
  TechnologyData,
  TechnologyDataType,
} from '../../algorithm/single/types';

import { load } from '../../MatchingLoader';

interface MatchData {
  organization: OrganizationData;
  industry: IndustryData;
  projectType: ProjectTypeData;
  technology: TechnologyData;
  commercial: CommercialData;
  culture: CultureData;
}

export const MatchDataType = new GraphQLObjectType<MatchData>({
  name: 'MatchData',
  description:
    'Object containing the match data from specification and criteria',
  // @ts-ignore
  fields: () => ({
    ...objectIdResolver,
    id: globalIdField('MatchedCompany'),
    organization: {
      type: OrganizationDataType,
      description: 'Organization data',
      resolve: entity => entity.organization,
    },
    industry: {
      type: IndustryDataType,
      description: 'Industry data',
      resolve: entity => entity.industry,
    },
    projectType: {
      type: ProjectTypeDataType,
      description: 'Project type data',
      resolve: entity => entity.projectType,
    },
    technology: {
      type: TechnologyDataType,
      description: 'Technology data',
      resolve: entity => entity.technology,
    },
    commercial: {
      type: CommercialDataType,
      description: 'Commercial data',
      resolve: entity => entity.commercial,
    },
    culture: {
      type: CultureDataType,
      description: 'Culture data',
      resolve: entity => entity.culture,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(MatchDataType, load);

export const MatchDataConnection = connectionDefinitions({
  name: 'MatchData',
  nodeType: MatchDataType,
});

export default MatchDataType;
