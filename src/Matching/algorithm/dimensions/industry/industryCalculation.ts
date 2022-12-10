import { ICompanyCriteriaIndustry } from '../../../../CompanyMatchingCriteria/types/Industry';
import { ISpecificationIndustry } from '../../../../Specification/types';
import { matchCertification } from './matchCertification';
import { matchFocusedIndustry } from './matchFocusedIndustry';

export function calculateIndustryMatch(
  specIndustry: ISpecificationIndustry,
  companyIndustry: ICompanyCriteriaIndustry,
) {
  if (!specIndustry) {
    return 0;
  }

  if (!companyIndustry) {
    return 0;
  }

  const focusedIndustriesMatch = matchFocusedIndustry(
    specIndustry.focusedIndustry,
    companyIndustry.focusedIndustries,
  );

  const industryCertificationMatch = matchCertification(
    specIndustry.certifications,
    companyIndustry.certifications,
  );

  const totalIndustryPoints =
    focusedIndustriesMatch + industryCertificationMatch;

  if (totalIndustryPoints < 0) return 0;

  return totalIndustryPoints;
}
