/**
 *
 * @param companyDeliveredProjects {number} company total delivered projects
 * @returns {number} total of points from delivered projects match
 * @description calculate delivered projects match
 */
export function matchProjectsDelivered(
  companyDeliveredProjects: number,
): number {
  if (!companyDeliveredProjects) {
    return 0;
  }

  const totalDeliveredProjects = companyDeliveredProjects;

  if (totalDeliveredProjects >= 100) {
    return 5;
  }

  if (totalDeliveredProjects >= 30 && totalDeliveredProjects < 100) {
    return 3;
  }

  if (totalDeliveredProjects >= 1 && totalDeliveredProjects < 30) {
    return 1;
  }

  return 0;
}
