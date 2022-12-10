import { calculateRatio } from '../../utils/calcUtils';

/**
 * @description calculate the matching score of the employees based on the number of employees
 * from company and specification
 * @param specEmployees {number} number of employees from specification
 * @param companyEmployees  {number} number of employees from company
 * @returns {number} points: ratio of the employees
 */
export function matchEmployees(
  specEmployees: number,
  companyEmployees: number,
): number {
  if (!specEmployees) {
    return 0;
  }

  if (!companyEmployees) {
    return 0;
  }

  if (companyEmployees >= specEmployees) {
    const ratio = calculateRatio(specEmployees, companyEmployees);

    return Number((ratio / 20).toFixed(1));
  }

  const ratio = calculateRatio(companyEmployees, specEmployees);

  return Number((ratio / 20).toFixed(1));
}
