import { ICompanyCriteriaProjectType } from '../../../../CompanyMatchingCriteria/types/ProjectType';
import { ISpecificationProjectType } from '../../../../Specification/types';
import { matchCollaboration } from './matchCollaboration';
import { matchPmMethodology } from './matchPmMethodology';
import { matchProjectDomains } from './matchProjectDomains';
import { matchProjectsDelivered } from './matchProjectsDelivered';
import { matchSoftwareType } from './matchProjectType';
import { matchServices } from './matchServices';

/**
 *
 * @param specProjectType {ISpecificationProjectType} specification project type data
 * @param companyProjectType {ICompanyCriteriaProjectType} company project type data
 * @returns {number} total of points from project type dimension matching criteria
 * @description calculate project type dimension matching criteria
 */
export function calculateProjectTypeMatch(
  specProjectType: ISpecificationProjectType,
  companyProjectType: ICompanyCriteriaProjectType,
): number {
  if (!specProjectType) {
    return 0;
  }

  if (!companyProjectType) {
    return 0;
  }

  const serviceMatch = matchServices(
    specProjectType.projectServices,
    companyProjectType.topServices,
  );

  const totalSwTypeMatch = matchSoftwareType(
    specProjectType.softwareType,
    companyProjectType.softwareTypes,
  );

  const totalCollaborationMatch = matchCollaboration(
    specProjectType.collaboration,
    companyProjectType.collaborations,
  );

  const totalProjectDomainsMatch = matchProjectDomains(
    specProjectType.projectDomains,
    companyProjectType.projectDomains,
  );

  const totalProjectDeliveredMatch = matchProjectsDelivered(
    companyProjectType.projectsDelivered,
  );

  const totalMethodologiesMatch = matchPmMethodology(
    specProjectType.projectManagementFrameworks,
    companyProjectType.methodologies,
  );

  const totalProjectTypePoints =
    serviceMatch +
    totalSwTypeMatch +
    totalCollaborationMatch +
    totalProjectDomainsMatch +
    totalProjectDeliveredMatch +
    totalMethodologiesMatch;

  if (totalProjectTypePoints < 0) return 0;

  return totalProjectTypePoints;
}
