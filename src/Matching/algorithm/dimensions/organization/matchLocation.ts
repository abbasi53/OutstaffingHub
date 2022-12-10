import { TLocationPreference } from '../../../../Specification/types/organization';

/**
 * @description calculate the match of the location preference
 * @param specLocation {TLocationPreference} location preference from specification
 * @param companyLocation {string} company hq location
 * @returns {number} total points of the location preference match
 */

export function matchLocation(
  specLocation: TLocationPreference,
  companyLocation: string,
): number {
  const locationMatch = specLocation.countries.includes(companyLocation);

  if (locationMatch) {
    return 5;
  }

  return 0;
}

//  (Ven_Org_Df['Country'] == off_loc),
//  (Ven_Org_Df['Country'] != off_loc)
