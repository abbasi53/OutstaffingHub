import { CompanyGeneralItem } from '../../types/index';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 @description calculate focused industry match
 check if client required focused industries are in company focused industries
 @param {string[]} specIndustry - client focused industries
 @param {CompanyGeneralItem[]} companyFocusedIndustries - company focused industries
 @returns {number} total of points of matched focused industries
 */

export function matchFocusedIndustry(
  specIndustry: string,
  companyIndustries: CompanyGeneralItem[],
): number {
  if (!specIndustry) {
    return 0;
  }

  if (!companyIndustries) {
    return 0;
  }

  const industries = companyIndustries.map(companyIndustry => {
    let total = 0;
    const {
      startedIn,
      specializedPeople,
      industry,
      completedProjects,
    } = companyIndustry;

    const currentYear = new Date().getFullYear();

    if (industry === specIndustry) {
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

  return sumArray(industries);
}
