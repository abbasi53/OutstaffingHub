/**
 *
 * @param specDomains {string[]} client domains
 * @param companyDomains {string[]} company domains
 * @returns {number} total of points from domains match
 * @description calculate domains match
 */

export function matchProjectDomains(
  specDomains: string[],
  companyDomains: string[],
): number {
  if (!specDomains || specDomains.length === 0) {
    return 0;
  }

  if (!companyDomains || companyDomains.length === 0) {
    return 0;
  }

  const totalSpecDomains = specDomains.length;

  const totalProjectDomainsMatch = specDomains.reduce((acc, specDomain) => {
    const companyDomainMatch = companyDomains.find(companyDomain => {
      return companyDomain === specDomain;
    });

    if (companyDomainMatch) {
      return acc + 1;
    }

    return acc;
  }, 0);
  const companyHasMatchedDomains = totalProjectDomainsMatch !== 0;

  if (totalProjectDomainsMatch === totalSpecDomains) {
    return 5;
  }

  if (companyHasMatchedDomains && totalProjectDomainsMatch < totalSpecDomains) {
    return 2;
  }

  if (totalProjectDomainsMatch === 0) {
    return -25;
  }

  return 0;
}
