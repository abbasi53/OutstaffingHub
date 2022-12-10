import { ICompanyCriteriaCommercial } from '../../../../CompanyMatchingCriteria/types/Commercial';
import { ISpecificationCommercial } from '../../../../Specification/types';
import { matchBillingProcess } from '../../dimensions/commercial/matchBillingProcess';
import { matchBudget } from '../../dimensions/commercial/matchBudget';
import { matchPaymentTerms } from '../../dimensions/commercial/matchPaymentTerms';

export function GetCommercialSingleData(
  specCommercial: ISpecificationCommercial,
  companyCommercial: ICompanyCriteriaCommercial,
) {
  if (!specCommercial) return 0;

  if (!companyCommercial) return 0;

  const { budget, paymentTerms } = specCommercial;
  const {
    mediumProject: companyBudget,
    paymentTerms: companyPaymentTerms,
    billingProcess,
  } = companyCommercial;

  const budgetData = {
    specification: budget,
    criteria: companyBudget,
    result: matchBudget(budget, companyBudget).toFixed(2),
  };

  const paymentData = {
    specification: paymentTerms,
    criteria: companyPaymentTerms,
    result: matchPaymentTerms(paymentTerms, companyPaymentTerms),
  };

  const billingData = {
    specification: 'do not needed for calculate',
    criteria: billingProcess,
    result: matchBillingProcess(billingProcess),
  };

  return {
    budget: budgetData,
    paymentTerms: paymentData,
    billingProcess: billingData,
  };
}
