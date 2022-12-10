type CompanyPaymentTerms = {
  partial: number;
  fullInAdvance: number;
  fullAfterDelivery: number;
  freeTrial: number;
};

const PaymentTerms = {
  partial: 'Partial',
  fullInAdvance: 'Full In Advance',
  fullAfterDelivery: 'Full After Delivery',
  freeTrial: 'Free Trial',
};

/**
 *
 * @param specPaymentTerm {string} specification payment term
 * @param companyPaymentTerms {CompanyPaymentTerms[]} company payment terms
 * @returns {number} payment term matching points
 * @description calculate payment term matching points
 */
export function matchPaymentTerms(
  specPaymentTerm: string,
  companyPaymentTerms: CompanyPaymentTerms[],
): number {
  if (!specPaymentTerm || specPaymentTerm === '') {
    return 0;
  }

  if (!companyPaymentTerms[0]) {
    return 0;
  }

  const {
    partial,
    fullInAdvance,
    fullAfterDelivery,
    freeTrial,
  } = companyPaymentTerms[0];

  if (specPaymentTerm === PaymentTerms.partial) {
    if (partial <= 10) {
      return 2;
    }

    if (partial > 10 && partial <= 30) {
      return 3;
    }

    if (partial > 30) {
      return 5;
    }
  }

  if (specPaymentTerm === PaymentTerms.fullInAdvance) {
    if (fullInAdvance <= 10) {
      return 2;
    }

    if (fullInAdvance > 10 && fullInAdvance <= 30) {
      return 3;
    }

    if (fullInAdvance > 30) {
      return 5;
    }
  }

  if (specPaymentTerm === PaymentTerms.fullAfterDelivery) {
    if (fullAfterDelivery <= 10) {
      return 2;
    }

    if (fullAfterDelivery > 10 && fullAfterDelivery <= 30) {
      return 3;
    }

    if (fullAfterDelivery > 30) {
      return 5;
    }
  }

  if (specPaymentTerm === PaymentTerms.freeTrial) {
    if (freeTrial <= 10) {
      return 2;
    }

    if (freeTrial > 10 && freeTrial <= 30) {
      return 3;
    }

    if (freeTrial > 30) {
      return 5;
    }
  }

  return 0;
}
