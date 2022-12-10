import { Types } from 'mongoose';
import CultureModel from '../../../../Culture/CultureModel';
import { calculateCultureAverage } from '../../dimensions/culture/calculateAverage';
import { calculateCultureDifference } from '../../dimensions/culture/calculateDifference';

export async function GetCultureSingleData(
  clientId: Types.ObjectId,
  companyId: Types.ObjectId,
) {
  if (!clientId) return {};

  if (!companyId) return {};

  const clientCulture = await CultureModel.findOne(
    { user: clientId },
    'organizationIsVery leadership managementStyle glueThatHolds organizationEmphasizes organizationDefines -_id',
  ).lean();

  const companyCulture = await CultureModel.findOne(
    {
      user: companyId,
    },
    'organizationIsVery leadership managementStyle glueThatHolds organizationEmphasizes organizationDefines -_id',
  ).lean();

  if (!clientCulture || !companyCulture) return 0;

  let companyCultureAverage;
  let clientCultureAverage;

  if (clientCulture) {
    clientCultureAverage = calculateCultureAverage(clientCulture);
  }

  if (companyCulture) {
    companyCultureAverage = calculateCultureAverage(companyCulture);
  }

  if (!clientCultureAverage || !companyCultureAverage) return 0;

  const cultureDifference = calculateCultureDifference(
    clientCultureAverage,
    companyCultureAverage,
  );

  if (!cultureDifference) return 0;

  const diffA = (10 - cultureDifference.A) * 10;
  const diffB = (10 - cultureDifference.B) * 10;
  const diffC = (10 - cultureDifference.C) * 10;
  const diffD = (10 - cultureDifference.D) * 10;

  const totalCultureDifference = diffA + diffB + diffC + diffD;

  const totalCultureMatch = Math.round(
    Number((totalCultureDifference / 400) * 100),
  );

  return {
    specification: {
      culture: clientCulture,
      average: clientCultureAverage,
    },
    criteria: {
      culture: companyCulture,
      average: companyCultureAverage,
    },
    result: totalCultureMatch,
  };
}
