import { ICompanyCriteriaOrganization } from '../../../../CompanyMatchingCriteria/types/Organization';
import { ISpecificationOrganization } from '../../../../Specification/types';
import { matchClientSize } from '../../dimensions/organization/matchClientSize';
import { matchEmployees } from '../../dimensions/organization/matchEmployees';
import { matchFoundedYear } from '../../dimensions/organization/matchFoundedYear';
import { matchLocation } from '../../dimensions/organization/matchLocation';
import { matchTechnicalTeam } from '../../dimensions/organization/matchTechnicalTeam';

export function GetOrganizationSingleData(
  specOrganization: ISpecificationOrganization,
  companyOrganization: ICompanyCriteriaOrganization,
) {
  if (!specOrganization) {
    return 0;
  }

  if (!companyOrganization) {
    return 0;
  }
  const { foundedYear, employees, locationPreference } = specOrganization;
  const {
    foundedYear: companyFoundedYear,
    rateClient,
    hqLocated,
    employees: companyEmployees,
    productOwners,
    managers,
  } = companyOrganization;

  const foundedYearData = {
    specification: specOrganization.foundedYear,
    criteria: companyOrganization.foundedYear,
    result: matchFoundedYear(Number(foundedYear), Number(companyFoundedYear)),
  };

  const clientSizeData = {
    specification: employees,
    criteria: rateClient,
    result: matchClientSize(employees, rateClient),
  };

  const locationPreferenceData = {
    specification: locationPreference,
    criteria: hqLocated,
    result: matchLocation(locationPreference, hqLocated),
  };

  const employeesMatch = {
    specification: employees,
    criteria: companyEmployees,
    result: matchEmployees(employees, companyEmployees),
  };

  const technicalTeamMatch = {
    specification: 'no need to calculate',
    criteria: productOwners + managers,
    result: matchTechnicalTeam(productOwners, managers),
  };

  return {
    foundedYear: foundedYearData,
    clientSize: clientSizeData,
    location: locationPreferenceData,
    employees: employeesMatch,
    technicalTeam: technicalTeamMatch,
  };
}
