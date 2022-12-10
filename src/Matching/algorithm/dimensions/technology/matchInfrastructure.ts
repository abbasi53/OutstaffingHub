import { CompanyGeneralItem } from '../../types';

/**
 *
 * @param specInfras {String[]} specification infrastructures
 * @param companyInfras {GeneralItem[]} company infrastructures
 * @returns {number} total of points for infrastructure match
 * @description calculate infrastructure match
 */
export function matchInfrastructure(
  specInfras: string[],
  companyInfras: CompanyGeneralItem[],
): number {
  if (!specInfras || specInfras.length === 0 || specInfras[0] === '') {
    return 0;
  }

  if (
    !companyInfras ||
    companyInfras.length === 0 ||
    companyInfras[0].industry === ''
  ) {
    return 0;
  }

  const clientTotalInfraRequired = specInfras.length;

  // find total of infrastructure matched between client and company
  const totalOfMatchedInfrastructure = companyInfras.reduce(
    (acc, infrastructure) => {
      const { industry } = infrastructure;
      const infrastructureMatch = specInfras.find(
        specificationInfrastructure => {
          return specificationInfrastructure === industry;
        },
      );

      if (infrastructureMatch) {
        return acc + 1;
      }

      return acc;
    },
    0,
  );

  const companyHasMatchedInfrastructure = totalOfMatchedInfrastructure !== 0;
  const companyDoNotHaveMatches = totalOfMatchedInfrastructure === 0;

  if (clientTotalInfraRequired === totalOfMatchedInfrastructure) {
    return 5;
  }

  if (
    totalOfMatchedInfrastructure < clientTotalInfraRequired &&
    companyHasMatchedInfrastructure
  ) {
    return 2;
  }

  if (companyDoNotHaveMatches) {
    return -5;
  }

  return 0;
}
