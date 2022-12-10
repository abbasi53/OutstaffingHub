import { fromGlobalId } from 'graphql-relay';
import CompanyMatchingCriteriaModel from '../../../CompanyMatchingCriteria/CompanyMatchingCriteriaModel';
import SpecificationModel from '../../../Specification/SpecificationModel';
import { GetCommercialSingleData } from './commercial';
import { GetCultureSingleData } from './culture';
import { GetIndustrySingleData } from './industry';
import { GetOrganizationSingleData } from './organization';
import { GetProjectTypeSingleData } from './projectType';
import { GetTechnologySingleData } from './technology';

export async function RunSingleMatch(
  specificationId: string,
  criteriaOwnerId: string,
) {
  const { id } = fromGlobalId(specificationId);
  const { id: owner } = fromGlobalId(criteriaOwnerId);

  const specification = await SpecificationModel.findOne({ _id: id });
  const companyCriteria = await CompanyMatchingCriteriaModel.findOne({
    owner,
  });

  if (specification && companyCriteria) {
    const {
      organization,
      industry,
      projectType,
      technology,
      commercial,
      owner: clientId,
    } = specification;
    const {
      organization: companyOrganization,
      industry: companyIndustry,
      projectType: companyProjectType,
      technology: companyTechnology,
      commercial: companyCommercial,
      owner: companyId,
    } = companyCriteria;

    const organizationData = GetOrganizationSingleData(
      organization,
      companyOrganization,
    );

    const industryData = GetIndustrySingleData(industry, companyIndustry);

    const projectTypeData = GetProjectTypeSingleData(
      projectType,
      companyProjectType,
    );

    const technologyData = GetTechnologySingleData(
      technology,
      companyTechnology,
    );

    const commercialData = GetCommercialSingleData(
      commercial,
      companyCommercial,
    );

    const cultureData = await GetCultureSingleData(clientId, companyId);

    return {
      organization: { ...organizationData },
      industry: { ...industryData },
      projectType: { ...projectTypeData },
      technology: { ...technologyData },
      commercial: { ...commercialData },
      culture: { ...cultureData },
    };
  }

  return null;
}
