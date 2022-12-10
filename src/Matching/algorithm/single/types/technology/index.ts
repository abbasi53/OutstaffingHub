import { GraphQLObjectType } from 'graphql';
import { TestingData, TestingType } from './testing';
import { CmsData, CmsType } from './cms';
import { BackendData, BackendTechnologiesType } from './backend';
import { DesignToolsData, DesignToolsType } from './designTools';
import { FrontendTechnologiesType, FrontendData } from './frontend';
import { InfrastructureData, InfrastructureType } from './infrastructures';
import { NoSqlData, NoSqlDatabasesType } from './noSql';
import { SqlData, SqlDatabasesType } from './sql';
import { PmToolsData, PmToolsType } from './pmTools';
import {
  SecurityRequirementsData,
  SecurityRequirementsType,
} from './securityRequirements';

export type TechnologyData = {
  backend: BackendData;
  cms: CmsData;
  designTools: DesignToolsData;
  frontend: FrontendData;
  infrastructure: InfrastructureData;
  noSqlDatabases: NoSqlData;
  projectManagementTools: PmToolsData;
  securityRequirements: SecurityRequirementsData;
  sqlDatabases: SqlData;
  testing: TestingData;
};

export const TechnologyDataType = new GraphQLObjectType<TechnologyData>({
  name: 'TechnologyData',
  fields: {
    backend: {
      type: BackendTechnologiesType,
      description: 'Backend Technologies',
      resolve: entity => entity.backend,
    },
    cms: {
      type: CmsType,
      description: 'Cms',
      resolve: entity => entity.cms,
    },
    designTools: {
      type: DesignToolsType,
      description: 'Design Tools',
      resolve: entity => entity.designTools,
    },
    frontend: {
      type: FrontendTechnologiesType,
      description: 'Frontend Technologies',
      resolve: entity => entity.frontend,
    },
    infrastructure: {
      type: InfrastructureType,
      description: 'Infrastructure',
      resolve: entity => entity.infrastructure,
    },
    noSqlDatabases: {
      type: NoSqlDatabasesType,
      description: 'NoSql Databases',
      resolve: entity => entity.noSqlDatabases,
    },
    sqlDatabases: {
      type: SqlDatabasesType,
      description: 'Sql Databases',
      resolve: entity => entity.sqlDatabases,
    },
    projectManagementTools: {
      type: PmToolsType,
      description: 'Project Management Tools',
      resolve: entity => entity.projectManagementTools,
    },
    securityRequirements: {
      type: SecurityRequirementsType,
      description: 'Security Requirements',
      resolve: entity => entity.securityRequirements,
    },
    testing: {
      type: TestingType,
      description: 'Testing',
      resolve: entity => entity.testing,
    },
  },
});
