import { ICompanyCriteriaOrganization } from '../../../../CompanyMatchingCriteria/types/Organization';
import { ISpecificationOrganization } from '../../../../Specification/types';
import { matchClientSize } from './matchClientSize';
import { matchEmployees } from './matchEmployees';
import { matchFoundedYear } from './matchFoundedYear';
import { matchLocation } from './matchLocation';
import { matchTechnicalTeam } from './matchTechnicalTeam';

export function calculateOrganizationMatch(
  specOrganization: ISpecificationOrganization,
  companyOrganization: ICompanyCriteriaOrganization,
) {
  if (!specOrganization) {
    return 0;
  }

  if (!companyOrganization) {
    return 0;
  }

  const foundedYearMatch = matchFoundedYear(
    Number(specOrganization.foundedYear),
    Number(companyOrganization.foundedYear),
  );

  const locationMatch = matchLocation(
    specOrganization.locationPreference,
    companyOrganization.hqLocated,
  );

  const employeeMatch = matchEmployees(
    specOrganization.employees,
    companyOrganization.employees,
  );

  const clientSizeMatch = matchClientSize(
    specOrganization.employees,
    companyOrganization.rateClient,
  );

  const technicalTeamMatch = matchTechnicalTeam(
    companyOrganization.productOwners,
    companyOrganization.managers,
  );

  const totalOrganizationPoints =
    foundedYearMatch +
    locationMatch +
    employeeMatch +
    clientSizeMatch +
    technicalTeamMatch;

  // if points are negative return 0
  if (totalOrganizationPoints < 0) return 0;

  return totalOrganizationPoints;
}
