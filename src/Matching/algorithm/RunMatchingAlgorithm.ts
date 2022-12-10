import { fromGlobalId } from 'graphql-relay';
import SpecificationModel from '../../Specification/SpecificationModel';
import CompanyMatchingCriteriaModel from '../../CompanyMatchingCriteria/CompanyMatchingCriteriaModel';
import { runMatchAlgorithm } from '.';
import {
  createAccuratePercentage,
  createPercentage,
  sortDescendArrayByProperty,
} from './utils/calcUtils';

export async function RunMatchingAlgorithm(specificationId: string) {
  const { id } = fromGlobalId(specificationId);
  const specification = await SpecificationModel.findOne({ _id: id });
  const companiesMatchingCriterias = await CompanyMatchingCriteriaModel.find({
    isActive: true,
  }).lean();

  if (specification) {
    try {
      const matchings = await Promise.all(
        companiesMatchingCriterias.map(async criteria => {
          const {
            organization,
            industry,
            projectType,
            technology,
            commercial,
            culture,
          } = await runMatchAlgorithm(specification, criteria);

          return {
            totalOrg: organization,
            totalInd: industry,
            totalProj: projectType,
            totalTech: technology,
            totalCom: commercial,
            totalCulture: culture,
            specificationId: specification._id,
            companyId: criteria.owner,
          };
        }),
      );

      const sortMaxOrganizationPoints = sortDescendArrayByProperty(
        matchings,
        'totalOrg',
      );
      const getMaxOrganizationPoint = sortMaxOrganizationPoints[0].totalOrg;

      const sortMaxIndustryPoints = sortDescendArrayByProperty(
        matchings,
        'totalInd',
      );
      const getMaxIndustryPoint = sortMaxIndustryPoints[0].totalInd;

      const sortMaxProjectTypePoints = sortDescendArrayByProperty(
        matchings,
        'totalProj',
      );
      const getMaxProjectTypePoint = sortMaxProjectTypePoints[0].totalProj;

      const sortMaxTechnologyPoints = sortDescendArrayByProperty(
        matchings,
        'totalTech',
      );
      const getMaxTechnologyPoint = sortMaxTechnologyPoints[0].totalTech;

      const sortMaxCommercialPoints = sortDescendArrayByProperty(
        matchings,
        'totalCom',
      );
      const getMaxCommercialPoint = sortMaxCommercialPoints[0].totalCom;

      const totalMatches = matchings.map(matching => {
        const {
          totalOrg,
          totalInd,
          totalProj,
          totalTech,
          totalCom,
          totalCulture,
        } = matching;

        const organizationPercentage = createAccuratePercentage(
          totalOrg,
          getMaxOrganizationPoint,
        );

        const industryPercentage = createAccuratePercentage(
          totalInd,
          getMaxIndustryPoint,
        );

        const projectTypePercentage = createAccuratePercentage(
          totalProj,
          getMaxProjectTypePoint,
        );

        const technologyPercentage = createAccuratePercentage(
          totalTech,
          getMaxTechnologyPoint,
        );

        const commercialPercentage = createAccuratePercentage(
          totalCom,
          getMaxCommercialPoint,
        );

        const totalSum =
          organizationPercentage +
          industryPercentage +
          projectTypePercentage +
          technologyPercentage +
          commercialPercentage +
          totalCulture;

        const totalMatch = createPercentage(totalSum, 600);

        return {
          totalMatch: Number(totalMatch),
          companyId: matching.companyId,
          details: null,
          status: null,
          dimensions: [
            {
              dimension: 'organization',
              percentage: organizationPercentage,
              comment: null,
            },
            {
              dimension: 'industry',
              percentage: industryPercentage,
              comment: null,
            },
            {
              dimension: 'project type',
              percentage: projectTypePercentage,
              comment: null,
            },
            {
              dimension: 'technology',
              percentage: technologyPercentage,
              comment: null,
            },
            {
              dimension: 'commercial',
              percentage: commercialPercentage,
              comment: null,
            },
            {
              dimension: 'culture',
              percentage: totalCulture,
              comment: null,
            },
          ],
        };
      });

      const sortedMatches = sortDescendArrayByProperty(
        totalMatches,
        'totalMatch',
      );

      return sortedMatches;
    } catch (err) {
      return {
        error: err,
      };
    }
  }

  return {
    error: 'Specification not found',
  };
}
