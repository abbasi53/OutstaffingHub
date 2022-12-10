import { ICompanyCriteriaProjectType } from '../../../../CompanyMatchingCriteria/types/ProjectType';
import { ISpecificationProjectType } from '../../../../Specification/types';
import { matchCollaboration } from '../../dimensions/projectType/matchCollaboration';
import { matchPmMethodology } from '../../dimensions/projectType/matchPmMethodology';
import { matchProjectDomains } from '../../dimensions/projectType/matchProjectDomains';
import { matchProjectsDelivered } from '../../dimensions/projectType/matchProjectsDelivered';
import { matchSoftwareType } from '../../dimensions/projectType/matchProjectType';
import { matchServices } from '../../dimensions/projectType/matchServices';

export function GetProjectTypeSingleData(
  specProjectType: ISpecificationProjectType,
  companyProjectType: ICompanyCriteriaProjectType,
) {
  if (!specProjectType) {
    return 0;
  }

  if (!companyProjectType) {
    return 0;
  }

  const {
    collaboration,
    projectManagementFrameworks: methodologies,
    projectDomains,
    softwareType,
    projectServices,
  } = specProjectType;
  const {
    collaborations: companyCollaborations,
    methodologies: companyMethodologies,
    projectDomains: companyDomains,
    projectsDelivered: companyProjectsDelivered,
    softwareTypes: companySoftwareType,
    topServices: companyProjectServices,
  } = companyProjectType;

  const collaborationData = {
    specification: collaboration,
    criteria: companyCollaborations,
    result: matchCollaboration(collaboration, companyCollaborations),
  };

  const methodologyData = {
    specification: methodologies,
    criteria: companyMethodologies,
    result: matchPmMethodology(methodologies, companyMethodologies),
  };

  const domainsData = {
    specification: projectDomains,
    criteria: companyDomains,
    result: matchProjectDomains(projectDomains, companyDomains),
  };

  const projectsDeliveredData = {
    specification: 'do not needs to calculate',
    criteria: companyProjectsDelivered,
    result: matchProjectsDelivered(companyProjectsDelivered),
  };

  const projectTypeData = {
    specification: softwareType,
    criteria: companySoftwareType,
    result: matchSoftwareType(softwareType, companySoftwareType),
  };

  const servicesData = {
    specification: projectServices,
    criteria: companyProjectServices,
    result: matchServices(projectServices, companyProjectServices),
  };

  return {
    collaboration: collaborationData,
    methodologies: methodologyData,
    domains: domainsData,
    projectsDelivered: projectsDeliveredData,
    softwareType: projectTypeData,
    services: servicesData,
  };
}
