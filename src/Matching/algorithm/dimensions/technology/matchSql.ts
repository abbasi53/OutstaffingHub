import { CompanyGeneralItem, Databases } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specSql {Databases} specification list of sql databases
 * @param companySqlDbs {CompanyGeneralItem[]} company list of sql databases
 * @returns {number} total points of sql databases matching
 * @description calculate total points of sql databases matching
 */
export function matchSql(
  specSql: Databases,
  companySqlDbs: CompanyGeneralItem[],
): number {
  if (
    !specSql ||
    specSql.databases.length === 0 ||
    specSql.databases[0] === ''
  ) {
    return 0;
  }

  if (
    !companySqlDbs ||
    companySqlDbs.length === 0 ||
    companySqlDbs[0].industry === ''
  ) {
    return 0;
  }

  const sqlPoints = companySqlDbs.map(companySqlDb => {
    let total = 0;
    const { databases } = specSql;
    const {
      industry,
      startedIn,
      completedProjects,
      specializedPeople,
    } = companySqlDb;
    const companyMatchClientSql = databases.includes(industry);
    const currentYear = new Date().getFullYear();

    if (companyMatchClientSql) {
      if (currentYear - Number(startedIn) <= 5) {
        total += 2;
      }

      if (
        currentYear - Number(startedIn) > 5 &&
        currentYear - Number(startedIn) <= 10
      ) {
        total += 3;
      }

      if (currentYear - Number(startedIn) > 10) {
        total += 5;
      }

      if (specializedPeople <= 10) {
        total += 2;
      }

      if (specializedPeople > 10 && specializedPeople <= 30) {
        total += 3;
      }

      if (specializedPeople > 30) {
        total += 5;
      }

      if (completedProjects <= 10) {
        total += 2;
      }

      if (completedProjects > 10 && completedProjects <= 30) {
        total += 3;
      }

      if (completedProjects > 30) {
        total += 5;
      }
    }

    return total;
  });

  return sumArray(sqlPoints);
}
