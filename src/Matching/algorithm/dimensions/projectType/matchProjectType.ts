import { CompanyGeneralItem } from '../../types';
import { sumArray } from '../../utils/calcUtils';

type SpecSoftwareType = {
  type: string;
  prioritizeInMatching: boolean;
};

/**
 *
 * @param specProjectType {SpecSoftwareType[]} specification required software type
 * @param companyProjectTypes {CompanyGeneralItem[]} company software types
 * @returns {number} total of points from project type
 */
export function matchSoftwareType(
  specProjectType: SpecSoftwareType,
  companyProjectTypes: CompanyGeneralItem[],
): number {
  if (!specProjectType) {
    return 0;
  }

  if (!companyProjectTypes) {
    return 0;
  }

  const projectTypes = companyProjectTypes.map(companyProjectType => {
    let total = 0;
    const {
      industry,
      startedIn,
      specializedPeople,
      completedProjects,
    } = companyProjectType;
    const companyMatchClientProjectType = industry === specProjectType.type;

    const currentYear = new Date().getFullYear();

    if (companyMatchClientProjectType) {
      if (currentYear - Number(startedIn) <= 5) {
        total += 2;
      }

      if (
        currentYear - Number(startedIn) > 5 &&
        currentYear - Number(startedIn) <= 10
      ) {
        total += 3;
      }

      if (currentYear - Number(startedIn) > 10) {
        total += 5;
      }

      if (specializedPeople <= 10) {
        total += 2;
      }

      if (specializedPeople > 10 && specializedPeople <= 30) {
        total += 3;
      }

      if (specializedPeople > 30) {
        total += 5;
      }

      if (completedProjects <= 10) {
        total += 2;
      }

      if (completedProjects > 10 && completedProjects <= 30) {
        total += 3;
      }

      if (completedProjects > 30) {
        total += 5;
      }
    }

    return total;
  });

  return sumArray(projectTypes);
}
