import { ICompanyCriteriaCommercial } from '../../../../CompanyMatchingCriteria/types/Commercial';
import { ISpecificationCommercial } from '../../../../Specification/types';
import { matchBillingProcess } from './matchBillingProcess';
import { matchBudget } from './matchBudget';
import { matchPaymentTerms } from './matchPaymentTerms';

export function calculateCommercialMatch(
  specCommercial: ISpecificationCommercial,
  companyCommercial: ICompanyCriteriaCommercial,
) {
  if (!specCommercial) {
    return 0;
  }

  if (!companyCommercial) {
    return 0;
  }

  const totalBudgetPoints = matchBudget(
    specCommercial.budget,
    companyCommercial.mediumProject,
  );

  const paymentTermsPoints = matchPaymentTerms(
    specCommercial.paymentTerms,
    companyCommercial.paymentTerms,
  );

  const billingPoints = matchBillingProcess(companyCommercial.billingProcess);

  const totalCommercialPoints =
    totalBudgetPoints + paymentTermsPoints + billingPoints;

  if (totalCommercialPoints < 0) return 0;

  return totalCommercialPoints;
}
