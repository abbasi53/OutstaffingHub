import { CompanyGeneralItem, Technologies } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specBackend {Technologies} specification list of backend techs
 * @param companyBackendTechs {CompanyGeneralItem[]} company list of backend techs
 * @returns {number} total points of backend techs matching
 * @description calculate total points of backend techs matching
 */
export function matchBackend(
  specBackend: Technologies,
  companyBackendTechs: CompanyGeneralItem[],
): number {
  if (
    !specBackend ||
    specBackend.technologies.length === 0 ||
    specBackend.technologies[0] === ''
  ) {
    return 0;
  }

  if (
    !companyBackendTechs ||
    companyBackendTechs.length === 0 ||
    companyBackendTechs[0].industry === ''
  ) {
    return 0;
  }

  const backendPoints = companyBackendTechs.map(companyBackend => {
    let total = 0;
    const { technologies } = specBackend;
    const {
      industry,
      startedIn,
      completedProjects,
      specializedPeople,
    } = companyBackend;

    const companyMatchClientBackend = technologies.includes(industry);
    const currentYear = new Date().getFullYear();

    if (companyMatchClientBackend) {
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

  return sumArray(backendPoints);
}
