import { CompanyGeneralItem, Technologies } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specFrontEnd {Technologies} specification list of front end techs
 * @param companyFrontEnds {CompanyGeneralItem[]} company list of front end techs
 * @returns {number} total points of frontend techs matching the
 * @description calculate total points of frontend techs matching
 */
// prettier-ignore
export function matchFrontEnd(specFrontEnd: Technologies,companyFrontEnds: CompanyGeneralItem[]): number {
  if (
    !specFrontEnd ||
    specFrontEnd.technologies.length === 0 ||
    specFrontEnd.technologies[0] === ''
  ) {
    return 0;
  }

  if (
    !companyFrontEnds ||
    companyFrontEnds.length === 0 ||
    companyFrontEnds[0].industry === ''
  ) {
    return 0;
  }

  const frontEndPoints = companyFrontEnds.map(companyFrontEnd => {
    let total = 0;
    const { technologies } = specFrontEnd;
    const {
      industry,
      startedIn,
      completedProjects,
      specializedPeople,
    } = companyFrontEnd;
    const companyMatchClientFrontEnd = technologies.includes(industry);
    const currentYear = new Date().getFullYear();

    if (companyMatchClientFrontEnd) {
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

  return sumArray(frontEndPoints);
}
