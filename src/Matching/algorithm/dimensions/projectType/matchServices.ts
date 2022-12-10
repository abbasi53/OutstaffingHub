import { sumArray } from '../../utils/calcUtils';

interface CompanyService {
  service: string;
  totalProjects: number;
}

/**
 *
 * @param specServices {string[]} specification list of services
 * @param companyServices {CompanyService[]} company list of services
 * @returns {number} points of the services match
 * @description calculate services match
 */
export function matchServices(
  specServices: string[],
  companyServices: CompanyService[],
): number {
  if (!specServices || specServices.length === 0) {
    return 0;
  }

  if (!companyServices || companyServices.length === 0) {
    return 0;
  }

  const numberOfCompanyServices = companyServices.length;

  const services = specServices.map(service => {
    let total = 0;

    for (let i = 0; i < numberOfCompanyServices; i += 1) {
      const { service: compService, totalProjects } = companyServices[i];
      const companyHasServiceRequested = compService === service;

      if (companyHasServiceRequested) {
        if (totalProjects <= 10) {
          total += 2;
        }

        if (totalProjects > 10 && totalProjects <= 50) {
          total += 3;
        }

        if (totalProjects > 50 && totalProjects <= 100) {
          total += 4;
        }

        if (totalProjects > 100) {
          total += 5;
        }
      }
    }

    return total;
  });

  return sumArray(services);
}
