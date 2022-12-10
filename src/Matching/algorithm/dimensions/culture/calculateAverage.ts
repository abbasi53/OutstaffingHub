import { DocumentDefinition } from 'mongoose';
import { ICulture } from '../../../../Culture/CultureModel';

export function calculateCultureAverage(culture: DocumentDefinition<ICulture>) {
  if (!culture) return null;

  const cultureObj = Object.values(culture);

  if (cultureObj) {
    const sumA = cultureObj.reduce((acc, curr) => acc + curr.A, 0);
    const sumB = cultureObj.reduce((acc, curr) => acc + curr.B, 0);
    const sumC = cultureObj.reduce((acc, curr) => acc + curr.C, 0);
    const sumD = cultureObj.reduce((acc, curr) => acc + curr.D, 0);

    const averageA = parseFloat(`${sumA / 6}`).toFixed(2);
    const averageB = parseFloat(`${sumB / 6}`).toFixed(2);
    const averageC = parseFloat(`${sumC / 6}`).toFixed(2);
    const averageD = parseFloat(`${sumD / 6}`).toFixed(2);

    return {
      A: Number(averageA),
      B: Number(averageB),
      C: Number(averageC),
      D: Number(averageD),
    };
  }

  return null;
}
