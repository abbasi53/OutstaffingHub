import { Tools } from '../../types';

/**
 *
 * @param specDesignTools {String[]} specification design tools
 * @param companyDesignTools {String[]} company design tools
 * @returns {number} total of points for design tools match
 * @description calculate design tools match
 */
// prettier-ignore
export function matchDesignTools(specDesignTools: Tools,companyDesignTools: string[]): number {
  if (
    !specDesignTools ||
    specDesignTools.tools.length === 0 ||
    specDesignTools.tools[0] === ''
  ) {
    return 0;
  }

  if (
    !companyDesignTools ||
    companyDesignTools.length === 0 ||
    companyDesignTools[0] === ''
  ) {
    return 0;
  }

  const clientTotalDesignToolsRequired = specDesignTools.tools.length;

  const totalOfDesignToolsMatched = companyDesignTools.reduce(
    (acc, designTool) => {
      const specDesignToolMatch = specDesignTools.tools.find(
        specificationDesignTool => {
          return specificationDesignTool === designTool;
        },
      );

      if (specDesignToolMatch) {
        return acc + 1;
      }

      return acc;
    },
    0,
  );

  const companyHasMatchedDesignTools = totalOfDesignToolsMatched !== 0;
  const companyDoNotHaveMatches = totalOfDesignToolsMatched === 0;

  if (clientTotalDesignToolsRequired === totalOfDesignToolsMatched) {
    return 5;
  }

  if (
    totalOfDesignToolsMatched < clientTotalDesignToolsRequired &&
    companyHasMatchedDesignTools
  ) {
    return 2;
  }

  if (companyDoNotHaveMatches) {
    return -5;
  }

  return 0;
}
