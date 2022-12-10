import { CompanyGeneralItem } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specCms {Technologies} specification list of cms techs
 * @param companyCms {CompanyGeneralItem[]} company list of cms techs
 * @returns {number} total points of cms techs matching
 * @description calculate total points of cms techs matching
 */

// prettier-ignore
export function matchCms(specCms: string, companyCms: CompanyGeneralItem[]): number {
  if (!specCms || specCms === '') {
    return 0;
  }

  if (!companyCms || companyCms.length === 0 || companyCms[0].industry === '') {
    return 0;
  }

  const cmsPoints = companyCms.map(cms => {
    let total = 0;
    const { industry, startedIn, completedProjects, specializedPeople } = cms;
    const companyMatchClientCms = specCms === industry;
    const currentYear = new Date().getFullYear();

    if (companyMatchClientCms) {
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

  return sumArray(cmsPoints);
}
