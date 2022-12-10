import { DocumentDefinition } from 'mongoose';
import { ICompanyMatchingCriteria } from '../../CompanyMatchingCriteria/CompanyMatchingCriteriaModel';
import { ISpecification } from '../../Specification/SpecificationModel';
import { calculateCommercialMatch } from './dimensions/commercial/commercialCalculation';
import { calculateCulture } from './dimensions/culture/calculateCulture';
import { calculateIndustryMatch } from './dimensions/industry/industryCalculation';
import { calculateOrganizationMatch } from './dimensions/organization/organizationCalculation';
import { calculateProjectTypeMatch } from './dimensions/projectType/projectTypeCalculation';
import { calculateTechnologyMatch } from './dimensions/technology/technologyCalculation';

export async function runMatchAlgorithm(
  specification: ISpecification,
  companyCriteria: DocumentDefinition<ICompanyMatchingCriteria>,
) {
  /*
  TODO: implement major checks from algorithm for all dimension
  */
  // prettier-ignore
  const {organization,industry,projectType,technology,commercial, owner: clientId} = specification;
  // prettier-ignore
  const { organization: companyOrganization, industry: companyIndustry, projectType: companyProjectType, technology: companyTechnology, commercial: companyCommercial , owner: companyId} = companyCriteria;

  const totalOrganization = calculateOrganizationMatch(
    organization,
    companyOrganization,
  );

  const totalIndustry = calculateIndustryMatch(industry, companyIndustry);
  const totalProjectType = calculateProjectTypeMatch(
    projectType,
    companyProjectType,
  );
  const totalTechnology = calculateTechnologyMatch(
    technology,
    companyTechnology,
  );
  const totalCommercial = calculateCommercialMatch(
    commercial,
    companyCommercial,
  );

  const totalCulture = await calculateCulture(clientId, companyId);

  return {
    organization: totalOrganization,
    industry: totalIndustry,
    projectType: totalProjectType,
    technology: totalTechnology,
    commercial: totalCommercial,
    culture: totalCulture,
  };
}
