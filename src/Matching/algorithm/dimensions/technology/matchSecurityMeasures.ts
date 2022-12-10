import { sumArray } from '../../utils/calcUtils';

type SpecSecurityRequirement = {
  securityRequirement: string;
  prioritizeInMatching: boolean;
};

type CompanyMeasure = {
  measure: string;
  totalProjects: number;
};

/**
 *
 * @param specMeasure {SpecSecurityRequirement} specification list of security measures
 * @param companySecurityMeasures {CompanyMeasure[]} company list of security measures
 * @returns {number} total points of security measures matching
 * @description calculate total points of security measures matching
 */
export function matchSecurityMeasures(
  specMeasure: SpecSecurityRequirement,
  companySecurityMeasures: CompanyMeasure[],
): number {
  if (!specMeasure || specMeasure.securityRequirement === '') {
    return 0;
  }

  // prettier-ignore
  if (!companySecurityMeasures || companySecurityMeasures.length === 0 || companySecurityMeasures[0].measure === '') {
    return 0;
  }

  const { securityRequirement } = specMeasure;

  const companyMatchSecurityPoints = companySecurityMeasures.map(
    securityMeasure => {
      const { measure, totalProjects } = securityMeasure;

      if (measure === securityRequirement) {
        if (totalProjects <= 10) {
          return 2;
        }

        if (totalProjects > 10 && totalProjects <= 30) {
          return 3;
        }

        if (totalProjects > 30) {
          return 5;
        }
      }

      return 0;
    },
  );

  return sumArray(companyMatchSecurityPoints);
}
