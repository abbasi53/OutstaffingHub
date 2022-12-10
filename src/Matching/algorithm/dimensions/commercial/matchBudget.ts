import {
  calculateRatio,
  cleanNumbersFromString,
  convertClientBudget,
} from '../../utils/calcUtils';

type CompanyMediumProject = {
  duration: string;
  budget: string;
  teamSize: number;
  exampleUrl: string;
};

/**
 *
 * @param specBudget {string} specification budget
 * @param companyBudget {CompanyMediumProject[]} company budget
 * @returns {number} budget matching points
 * @description calculate budget matching points
 */
export function matchBudget(
  specBudget: string,
  companyBudget: CompanyMediumProject[],
): number {
  if (!specBudget || specBudget === '') {
    return 0;
  }

  if (!companyBudget[0]?.budget || companyBudget[0]?.budget === '') {
    return 0;
  }

  const { budget } = companyBudget[0];

  const clientBudget = convertClientBudget(specBudget);
  const vendorBudget = Number(cleanNumbersFromString(budget));

  if (vendorBudget >= clientBudget) {
    return calculateRatio(clientBudget, Number(vendorBudget)) / 20;
  }

  return calculateRatio(Number(vendorBudget), clientBudget) / 20;
}
