/**
 * @description calculate the matching score of the technical team based on technical team size
 * from company and specification
 * @param companyPOs {number} number of product owners from company
 * @param companyManagers  {number} number of managers from company
 * @returns {number} points: total of the technical team
 */
export function matchTechnicalTeam(
  companyPOs: number,
  companyManagers: number,
): number {
  const totalCompanyTechnicalTeam = companyPOs + companyManagers;

  if (totalCompanyTechnicalTeam === 0) return 0;

  if (totalCompanyTechnicalTeam >= 15) return 5;

  if (totalCompanyTechnicalTeam >= 5 && totalCompanyTechnicalTeam < 15) {
    return 3;
  }

  if (totalCompanyTechnicalTeam >= 1 && totalCompanyTechnicalTeam < 5) {
    return 1;
  }

  return 0;
}
