import { ICompanyCriteriaTechnology } from '../../../../CompanyMatchingCriteria/types/Technology';
import { ISpecificationTechnology } from '../../../../Specification/types';
import { matchBackend } from './matchBackend';
import { matchCms } from './matchCms';
import { matchDesignTools } from './matchDesignTools';
import { matchFrontEnd } from './matchFrontEnd';
import { matchInfrastructure } from './matchInfrastructure';
import { matchNoSql } from './matchNoSql';
import { matchPmTools } from './matchPmTools';
import { matchSecurityMeasures } from './matchSecurityMeasures';
import { matchSql } from './matchSql';
import { matchTestingProcess } from './matchTestingProcess';

export function calculateTechnologyMatch(
  specTechnology: ISpecificationTechnology,
  companyTechnology: ICompanyCriteriaTechnology,
) {
  if (!specTechnology) {
    return 0;
  }

  if (!companyTechnology) {
    return 0;
  }

  const totalFrontEndPoints = matchFrontEnd(
    specTechnology.frontendTechnologies,
    companyTechnology.topFrontFrameworks,
  );

  const totalBackendPoints = matchBackend(
    specTechnology.backendTechnologies,
    companyTechnology.topBackFrameworks,
  );

  const totalSqlPoints = matchSql(
    specTechnology.sqlDatabases,
    companyTechnology.topSqlDatabases,
  );

  const totalNoSqlPoints = matchNoSql(
    specTechnology.noSqlDatabases,
    companyTechnology.topNoSqlDatabases,
  );

  const totalCmsPoints = matchCms(specTechnology.cms, companyTechnology.topCms);

  const totalTestingPoints = matchTestingProcess(
    specTechnology.testingFramework,
    companyTechnology.topTestingFrameworks,
  );

  const totalInfrastructurePoints = matchInfrastructure(
    specTechnology.infrastructure,
    companyTechnology.topInfrastructures,
  );

  const totalDesignToolsPoints = matchDesignTools(
    specTechnology.designTools,
    companyTechnology.designTools,
  );

  const totalPmToolsPoints = matchPmTools(
    specTechnology.projectManagementTools,
    companyTechnology.projectManagementsTools,
  );

  const totalSecurityPoints = matchSecurityMeasures(
    specTechnology.securityRequirements,
    companyTechnology.securityMeasures,
  );

  const totalTechnologyPoints =
    totalFrontEndPoints +
    totalBackendPoints +
    totalSqlPoints +
    totalNoSqlPoints +
    totalCmsPoints +
    totalTestingPoints +
    totalInfrastructurePoints +
    totalDesignToolsPoints +
    totalPmToolsPoints +
    totalSecurityPoints;

  if (totalTechnologyPoints < 0) return 0;

  return totalTechnologyPoints;
}
