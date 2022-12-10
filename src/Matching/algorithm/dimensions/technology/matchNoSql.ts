import { CompanyGeneralItem, Databases } from '../../types';
import { sumArray } from '../../utils/calcUtils';

/**
 *
 * @param specNoSql {Databases} specification list of noSql databases
 * @param companyNoSqlDbs {CompanyGeneralItem[]} company list of noSql databases
 * @returns {number} total points of noSql databases matching
 * @description calculate total points of noSql databases matching
 */
export function matchNoSql(
  specNoSql: Databases,
  companyNoSqlDbs: CompanyGeneralItem[],
): number {
  // prettier-ignore
  if (!specNoSql || specNoSql.databases.length === 0 || specNoSql.databases[0] === '') {
    return 0;
  }

  // prettier-ignore
  if (!companyNoSqlDbs || companyNoSqlDbs.length === 0 || companyNoSqlDbs[0].industry === '') {
    return 0;
  }

  const noSqlPoints = companyNoSqlDbs.map(companySqlDb => {
    let total = 0;
    const { databases } = specNoSql;
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

  return sumArray(noSqlPoints);
}
