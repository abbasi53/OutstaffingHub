/* eslint-disable default-case */
export function calculateRatio(lowNumber: number, highNumber: number): number {
  const ratio = (lowNumber / highNumber) * 100;

  return Number(ratio.toFixed(2));
}

// function that calculate average of array
export function calculateAverage(array: number[]) {
  const sum = array.reduce((a, b) => a + b, 0);
  const avg = sum / array.length;

  return Number(avg);
}

// function that sum array values rounding u
export function sumArray(array: number[]) {
  const sum = array.reduce((a, b) => a + b, 0);

  return Math.ceil(sum);
}

// function that checK if string is in array
export function isStringInArray(array: string[], string: string) {
  return array.includes(string);
}

export function cleanNumbersFromString(string: string) {
  return string.replace(/[^0-9]/g, '');
}

export function convertClientBudget(budget: string): number {
  const cleanBudget = cleanNumbersFromString(budget);

  if (budget.includes('less than $5K')) {
    return 5000;
  }

  if (cleanBudget === '510') {
    return 10000;
  }

  if (cleanBudget === '1020') {
    return 20000;
  }

  if (cleanBudget === '2050') {
    return 50000;
  }

  if (cleanBudget === '50100') {
    return 100000;
  }

  if (cleanBudget === '100200') {
    return 200000;
  }

  if (cleanBudget === '5001') {
    return 500000;
  }

  if (cleanBudget === '1') {
    return 1000000;
  }

  if (budget.includes('+')) {
    return 10000001;
  }

  if (budget.split(' ')[0] === 'Not') {
    return 0;
  }

  return -1;
}

export function sortDescendArrayByProperty(array: any[], property: string) {
  return array.sort((a, b) => {
    if (a[property] < b[property]) {
      return 1;
    }

    if (a[property] > b[property]) {
      return -1;
    }

    return 0;
  });
}

export function createAccuratePercentage(value: number, total: number) {
  const percentage = (value / total) * 100;

  if (percentage === 100) {
    return 99;
  }

  // calculate to not have percentages less than 50%
  const accuratePercentage = (percentage / 99) * (99 - 50) + 50;

  return Math.round(accuratePercentage);
}

export function createPercentage(value: number, total: number) {
  const percentage = (value / total) * 100;

  return Math.round(percentage);
}

export function getCompanyClientSize(companySize: number) {
  if (companySize === 1) {
    return 1;
  }

  if (companySize === 2) {
    return 1.5;
  }

  if (companySize === 3) {
    return 2;
  }

  if (companySize === 4) {
    return 2.5;
  }

  if (companySize === 5) {
    return 3;
  }

  if (companySize === 6) {
    return 3.5;
  }

  if (companySize === 7) {
    return 4;
  }

  if (companySize === 8) {
    return 4.5;
  }

  if (companySize === 9) {
    return 5;
  }

  if (companySize === 10) {
    return 5.5;
  }

  return 0;
}
