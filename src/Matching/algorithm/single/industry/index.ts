import { ICompanyCriteriaIndustry } from '../../../../CompanyMatchingCriteria/types/Industry';
import { ISpecificationIndustry } from '../../../../Specification/types/industry';
import { matchCertification } from '../../dimensions/industry/matchCertification';
import { matchFocusedIndustry } from '../../dimensions/industry/matchFocusedIndustry';

export function GetIndustrySingleData(
  specIndustry: ISpecificationIndustry,
  companyIndustry: ICompanyCriteriaIndustry,
) {
  if (!specIndustry) {
    return 0;
  }

  if (!companyIndustry) {
    return 0;
  }

  const { certifications, focusedIndustry } = specIndustry;
  const {
    certifications: companyCertifications,
    focusedIndustries,
  } = companyIndustry;

  const certificationData = {
    specification: certifications,
    criteria: companyCertifications,
    result: matchCertification(certifications, companyCertifications),
  };

  const focusedIndustryData = {
    specification: focusedIndustry,
    criteria: focusedIndustries,
    result: matchFocusedIndustry(focusedIndustry, focusedIndustries),
  };

  return {
    certifications: certificationData,
    focusedIndustry: focusedIndustryData,
  };
}
