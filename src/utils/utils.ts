import { ElementStates } from '../types/element-states'
import { TNewArr } from '../components/sorting-page/type/sorting-page';

export const swap = <T>(strArr: T[], i: number, j: number): void => {
  [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
};

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

//--Функция для создания рандомного массива целых чисел--//
export function createRandomIntArray(
  minLength: number,
  maxLength: number,
  minValue: number,
  maxValue: number
): Array<TNewArr> {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomEl =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    randomArray.push({ item: randomEl, state: ElementStates.Default });
  }
  return randomArray;
}
