/**
 * @description to calculate the match for founded year based on difference between founded year
 * @param {number} foundedYear founded year of the company
 * @param {number} specFoundedYear founded year of the specification
 * @return {number} points of the founded year
 * */

export function matchFoundedYear(
  specFoundedYear: number,
  companyFoundedYear: number,
): number {
  if (!specFoundedYear) {
    return 0;
  }

  if (!companyFoundedYear) {
    return 0;
  }

  const yearDifference = specFoundedYear - companyFoundedYear;

  if (
    (specFoundedYear <= companyFoundedYear && yearDifference >= -5) ||
    (specFoundedYear >= companyFoundedYear && yearDifference <= 5)
  ) {
    return 5;
  }

  if (
    (specFoundedYear <= companyFoundedYear && yearDifference >= -10) ||
    (specFoundedYear >= companyFoundedYear && yearDifference <= 10)
  ) {
    return 3;
  }

  return 1;
}

// (((yof<=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']>=-5)) |
// ((yof>=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']<=5))),

// (((yof<=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']>=-10)) |
// ((yof>=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']<=10))),

// (((yof<=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']>=-20)) |
// ((yof>=Ven_Org_Df['Year founded']) & (yof-Ven_Org_Df['Year founded']<=20))),
