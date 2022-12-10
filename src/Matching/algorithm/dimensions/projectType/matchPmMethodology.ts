type SpecificationMethodology = {
  frameworks: string[];
  prioritizeInMatching: boolean;
};

type CompanyMethodology = {
  methodology: string;
  totalProjects: number;
};

/**
 *
 * @param specMethodology {SpecificationMethodology} specification methodology data
 * @param companyMethodology {CompanyMethodology} company methodology data
 * @returns {number} total of points for methodology match
 * @description calculate methodology match
 */
export function matchPmMethodology(
  specMethodology: SpecificationMethodology,
  companyMethodology: CompanyMethodology[],
): number {
  if (!specMethodology || specMethodology.frameworks.length === 0) {
    return 0;
  }

  if (!companyMethodology || companyMethodology.length === 0) {
    return 0;
  }

  const totalSpecificationMethodologies = specMethodology.frameworks.length;

  let totalPoints = 0;

  // loop through each methodology in the specification and sum 1 if it matches
  const totalMethodologiesMatch = companyMethodology.reduce(
    (acc, methodology) => {
      const specMethodologyMatch = specMethodology.frameworks.find(
        specificationMethodology => {
          return specificationMethodology === methodology.methodology;
        },
      );

      if (specMethodologyMatch) {
        return acc + 1;
      }

      return acc;
    },
    0,
  );

  const companyHasMatchedMethodologies = totalMethodologiesMatch !== 0;
  const companyDoNotHaveMatches = totalMethodologiesMatch === 0;
  const isMethodologyPrioritized = specMethodology.prioritizeInMatching;

  if (totalSpecificationMethodologies === totalMethodologiesMatch) {
    totalPoints += 5;
  }

  if (
    totalMethodologiesMatch < totalSpecificationMethodologies &&
    companyHasMatchedMethodologies
  ) {
    totalPoints += 2;
  }

  if (companyDoNotHaveMatches) {
    totalPoints += -5;
  }

  if (companyDoNotHaveMatches && isMethodologyPrioritized) {
    totalPoints += -5;
  }

  return totalPoints;
}
