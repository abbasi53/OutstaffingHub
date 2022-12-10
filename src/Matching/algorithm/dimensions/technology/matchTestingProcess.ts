import { CompanyGeneralItem } from '../../types';
import { sumArray } from '../../utils/calcUtils';

type SpecificationTestingFramework = {
  framework: string;
  prioritizeInMatching: boolean;
};

/**
 * @param specTesting {SpecificationTestingFrameworks} specification list of testing frameworks
 * @param companyTestingFrameworks {CompanyGeneralItem[]} company list of testing frameworks
 * @returns {number}  total points of testing frameworks matching
 * @description calculate total points of testing frameworks matching
 */
export function matchTestingProcess(
  specTesting: SpecificationTestingFramework,
  companyTestingFrameworks: CompanyGeneralItem[],
): number {
  if (!specTesting || specTesting.framework === '') {
    return 0;
  }

  // prettier-ignore
  if (!companyTestingFrameworks || companyTestingFrameworks.length === 0 || companyTestingFrameworks[0].industry === '') {
    return 0;
  }

  const testingPoints = companyTestingFrameworks.map(testingFramework => {
    let total = 0;
    const { framework } = specTesting;
    const {
      industry,
      specializedPeople,
      completedProjects,
      startedIn,
    } = testingFramework;
    const companyMatchClientTesting = industry === framework;
    const currentYear = new Date().getFullYear();

    if (companyMatchClientTesting) {
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

  return sumArray(testingPoints);
}
