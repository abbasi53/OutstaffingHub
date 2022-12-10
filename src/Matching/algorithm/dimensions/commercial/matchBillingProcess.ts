type CompanyBilling = {
  timeMaterially: number;
  fixedPrice: number;
};

/**
 * @param companyBilling {CompanyBilling} company billing
 * @returns {number} total points of billing matching
 * @description calculate total points of billing matching
 */
export function matchBillingProcess(companyBilling: CompanyBilling[]): number {
  if (!companyBilling[0]) {
    return 0;
  }

  let timePoints = 0;
  let fixedPoints = 0;

  const { timeMaterially, fixedPrice } = companyBilling[0];

  if (timeMaterially <= 10) {
    timePoints += 2;
  }

  if (timeMaterially > 10 && timeMaterially <= 30) {
    timePoints += 3;
  }

  if (timeMaterially > 30) {
    timePoints += 5;
  }

  if (fixedPrice <= 10) {
    fixedPoints += 2;
  }

  if (fixedPrice > 10 && fixedPrice <= 30) {
    fixedPoints += 3;
  }

  if (fixedPrice > 30) {
    fixedPoints += 10;
  }

  return timePoints + fixedPoints;
}
