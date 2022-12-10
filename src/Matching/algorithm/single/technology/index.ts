import { ICompanyCriteriaTechnology } from '../../../../CompanyMatchingCriteria/types/Technology';
import { ISpecificationTechnology } from '../../../../Specification/types';
import { matchBackend } from '../../dimensions/technology/matchBackend';
import { matchCms } from '../../dimensions/technology/matchCms';
import { matchDesignTools } from '../../dimensions/technology/matchDesignTools';
import { matchFrontEnd } from '../../dimensions/technology/matchFrontEnd';
import { matchInfrastructure } from '../../dimensions/technology/matchInfrastructure';
import { matchSql } from '../../dimensions/technology/matchSql';
import { matchPmTools } from '../../dimensions/technology/matchPmTools';
import { matchNoSql } from '../../dimensions/technology/matchNoSql';
import { matchSecurityMeasures } from '../../dimensions/technology/matchSecurityMeasures';
import { matchTestingProcess } from '../../dimensions/technology/matchTestingProcess';

export function GetTechnologySingleData(
  specification: ISpecificationTechnology,
  criteria: ICompanyCriteriaTechnology,
) {
  if (!specification) {
    return 0;
  }

  if (!criteria) {
    return 0;
  }

  const {
    backendTechnologies,
    cms,
    designTools,
    frontendTechnologies,
    infrastructure,
    noSqlDatabases,
    projectManagementTools,
    securityRequirements,
    sqlDatabases,
    testingFramework,
  } = specification;
  const {
    topBackFrameworks,
    topCms,
    topInfrastructures,
    topFrontFrameworks,
    topNoSqlDatabases,
    topSqlDatabases,
    topTestingFrameworks,
    securityMeasures,
    designTools: companyDesignTools,
    projectManagementsTools: companyPmTools,
  } = criteria;

  const backendTechnologiesData = {
    specification: backendTechnologies,
    criteria: topBackFrameworks,
    result: matchBackend(backendTechnologies, topBackFrameworks),
  };

  const cmsData = {
    specification: cms,
    criteria: topCms,
    result: matchCms(cms, topCms),
  };

  const designToolsData = {
    specification: designTools,
    criteria: companyDesignTools,
    result: matchDesignTools(designTools, companyDesignTools),
  };

  const frontendTechnologiesData = {
    specification: frontendTechnologies,
    criteria: topFrontFrameworks,
    result: matchFrontEnd(frontendTechnologies, topFrontFrameworks),
  };

  const infrastructureData = {
    specification: infrastructure,
    criteria: topInfrastructures,
    result: matchInfrastructure(infrastructure, topInfrastructures),
  };

  const noSqlDatabasesData = {
    specification: noSqlDatabases,
    criteria: topNoSqlDatabases,
    result: matchNoSql(noSqlDatabases, topNoSqlDatabases),
  };

  const sqlDatabasesData = {
    specification: sqlDatabases,
    criteria: topSqlDatabases,
    result: matchSql(sqlDatabases, topSqlDatabases),
  };

  const projectManagementToolsData = {
    specification: projectManagementTools,
    criteria: companyPmTools,
    result: matchPmTools(projectManagementTools, companyPmTools),
  };

  const securityRequirementsData = {
    specification: securityRequirements,
    criteria: securityMeasures,
    result: matchSecurityMeasures(securityRequirements, securityMeasures),
  };

  const testingFrameworkData = {
    specification: testingFramework,
    criteria: topTestingFrameworks,
    result: matchTestingProcess(testingFramework, topTestingFrameworks),
  };

  return {
    backend: backendTechnologiesData,
    cms: cmsData,
    designTools: designToolsData,
    frontend: frontendTechnologiesData,
    infrastructure: infrastructureData,
    noSqlDatabases: noSqlDatabasesData,
    projectManagementTools: projectManagementToolsData,
    securityRequirements: securityRequirementsData,
    sqlDatabases: sqlDatabasesData,
    testing: testingFrameworkData,
  };
}
