type CultureAverages = {
  A: number;
  B: number;
  C: number;
  D: number;
};

export function calculateCultureDifference(
  clientAverages: CultureAverages,
  companyAverages: CultureAverages,
) {
  if (!clientAverages || !companyAverages) return null;

  const cultureDifference = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  if (clientAverages && companyAverages) {
    if (clientAverages.A > companyAverages.A) {
      cultureDifference.A = clientAverages.A - companyAverages.A;
    } else {
      cultureDifference.A = companyAverages.A - clientAverages.A;
    }

    if (clientAverages.B > companyAverages.B) {
      cultureDifference.B = clientAverages.B - companyAverages.B;
    } else {
      cultureDifference.B = companyAverages.B - clientAverages.B;
    }

    if (clientAverages.C > companyAverages.C) {
      cultureDifference.C = clientAverages.C - companyAverages.C;
    } else {
      cultureDifference.C = companyAverages.C - clientAverages.C;
    }

    if (clientAverages.D > companyAverages.D) {
      cultureDifference.D = clientAverages.D - companyAverages.D;
    } else {
      cultureDifference.D = companyAverages.D - clientAverages.D;
    }
  }

  return {
    A: Number(cultureDifference.A.toFixed(2)),
    B: Number(cultureDifference.B.toFixed(2)),
    C: Number(cultureDifference.C.toFixed(2)),
    D: Number(cultureDifference.D.toFixed(2)),
  };
}
