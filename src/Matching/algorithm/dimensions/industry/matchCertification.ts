type ClientCertification = {
  certifications: string[];
  prioritizeInMatching: boolean;
};

/**
 *
  @description calculate industry certification match.
    check if client required certifications are in company certifications
  @param {ClientCertification} specCertifications - client certifications
  @param {string[]} companyCertifications - company certifications
  @returns {number} total points for certifications match
 */

export function matchCertification(
  specCertifications: ClientCertification,
  companyCertifications: string[],
): number {
  if (!specCertifications) {
    return 0;
  }

  if (!companyCertifications) {
    return 0;
  }

  const { certifications } = specCertifications;

  const companyHasCertificationRequired = certifications.some(certification =>
    companyCertifications.includes(certification),
  );

  return companyHasCertificationRequired ? 5 : 0;
}
