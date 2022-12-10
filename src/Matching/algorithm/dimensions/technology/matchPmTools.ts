import { Tools } from '../../types';

/**
 *
 * @param specPmTools {Tools} specification PM tools
 * @param companyPmTools {string[]} company PM tools
 * @returns {number} total of points for PM tools match
 * @description calculate PM tools match
 */
// prettier-ignore
export function matchPmTools( specPmTools: Tools,companyPmTools: string[]): number {
  if (
    !specPmTools ||
    specPmTools.tools.length === 0 ||
    specPmTools.tools[0] === ''
  ) {
    return 0;
  }

  if (
    !companyPmTools ||
    companyPmTools.length === 0 ||
    companyPmTools[0] === ''
  ) {
    return 0;
  }

  const clientTotalPmToolsRequired = specPmTools.tools.length;

  const totalOfPmToolsMatched = companyPmTools.reduce((acc, pmTool) => {
    const specPmToolMatch = specPmTools.tools.find(specificationPmTool => {
      return specificationPmTool === pmTool;
    });

    if (specPmToolMatch) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const companyHasMatchedPmTools = totalOfPmToolsMatched !== 0;
  const companyDoNotHaveMatches = totalOfPmToolsMatched === 0;

  if (clientTotalPmToolsRequired === totalOfPmToolsMatched) {
    return 5;
  }

  if (
    totalOfPmToolsMatched < clientTotalPmToolsRequired &&
    companyHasMatchedPmTools
  ) {
    return 2;
  }

  if (companyDoNotHaveMatches) {
    return -5;
  }

  return 0;
}
