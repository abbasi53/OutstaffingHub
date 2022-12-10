import { CompanyGeneralItem } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specCollaboration {string} specification required collaboration types
 * @param companyCollaborations  {CompanyGeneralItem[]} company collaboration types
 * @returns {number} total of points from project type match
 * @description calculate collaboration match
 */
export function matchCollaboration(
  specCollaboration: string,
  companyCollaborations: CompanyGeneralItem[],
): number {
  if (!specCollaboration) {
    return 0;
  }

  if (!companyCollaborations) {
    return 0;
  }

  const collaboration = companyCollaborations.map(companyCollaboration => {
    let total = 0;
    const {
      industry,
      startedIn,
      specializedPeople,
      completedProjects,
    } = companyCollaboration;
    const companyMatchClientCollaboration = industry === specCollaboration;

    const currentYear = new Date().getFullYear();

    if (companyMatchClientCollaboration) {
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

  return sumArray(collaboration);
}
