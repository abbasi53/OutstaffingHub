import { getCompanyClientSize } from '../../utils/calcUtils';

type CompanyPreferredClientSize = {
  oneTwenty: number;
  twentyOneHundred: number;
  oneHundredFiveHundred: number;
  fiveHundredAndMore: number;
};

/**
 * @param {number} specClientSize: specification employees total
 * @param {number} companyPreferredClientSize: company rateClient object
 * @returns {number} points of the client size match
 * @description calculate client size match
 */
export function matchClientSize(
  specClientSize: number,
  companyPreferredClientSize: CompanyPreferredClientSize,
): number {
  if (!specClientSize || !companyPreferredClientSize) return 0;

  if (specClientSize <= 20) {
    return getCompanyClientSize(companyPreferredClientSize.oneTwenty);
  }

  if (specClientSize > 20 && specClientSize <= 100) {
    return getCompanyClientSize(companyPreferredClientSize.twentyOneHundred);
  }

  if (specClientSize > 100 && specClientSize <= 500) {
    return getCompanyClientSize(
      companyPreferredClientSize.oneHundredFiveHundred,
    );
  }

  return getCompanyClientSize(companyPreferredClientSize.fiveHundredAndMore);
}

// cln_cs=Cli_Org_Df["Company Size"][client_no]
// Ven_Org_Df['Pref_Size_Match']=np.zeros(len(Ven_Org_Df.index),dtype=float)

// if cln_cs <= 20:
//     for i in Ven_Org_Df.index:
//         Pref_Ven=Ven_Org_Df["Size_1-20_Match"][i]
//         Ven_Org_Df["Pref_Size_Match"][i]=Ven_Org_Df["Pref_Size_Match"][i]+Pref_Ven

// if ((cln_cs > 20) & (cln_cs <= 100)):
//     for i in Ven_Org_Df.index:
//         Pref_Ven=Ven_Org_Df["Size_20-100_Match"][i]
//         Ven_Org_Df["Pref_Size_Match"][i]=Ven_Org_Df["Pref_Size_Match"][i]+Pref_Ven

// if ((cln_cs > 100) & (cln_cs <= 500)):
//     for i in Ven_Org_Df.index:
//         Pref_Ven=Ven_Org_Df["Size_100-500_Match"][i]
//         Ven_Org_Df["Pref_Size_Match"][i]=Ven_Org_Df["Pref_Size_Match"][i]+Pref_Ven

// if cln_cs > 500:
//     for i in Ven_Org_Df.index:
//         Pref_Ven=Ven_Org_Df["Size_500_Match"][i]
//         // Ven_Org_Df["Pref_Size_Match"][i]=Ven_Org_Df["Pref_Size_Match"][i]+Pref_Ven
