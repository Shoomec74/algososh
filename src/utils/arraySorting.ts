import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../types/element-states";
import { TNewArr } from "../components/sorting-page/type/sorting-page";
import { delay, swap } from "./utils";

//задержка вывода
const delaySort = async (
  arr: TNewArr[],
  setArr: Dispatch<SetStateAction<TNewArr[]>>,
  wait: number
) => {
  setArr([...arr]);
  await delay(wait);
};

//--сортировка пузырьком--//
export const bubbleSort = async (
  isAscending: boolean,
  arr: TNewArr[],
  setArr: Dispatch<SetStateAction<TNewArr[]>>,
  wait: number
) => {
  let swapped = true;
  for (let i = 0; i < arr.length - 1; i++) {
    let lastUnsortedIndex = arr.length - 1;
    for (let z = 0; z < arr.length - 1 - i; z++) {
      arr[z].state = ElementStates.Changing;
      arr[z + 1].state = ElementStates.Changing;
      await delaySort(arr, setArr, wait);
      if (
        isAscending
          ? arr[z].item > arr[z + 1].item
          : arr[z].item < arr[z + 1].item
      ) {
        swap(arr, z, z + 1);
        await delaySort(arr, setArr, wait);
        swapped = true;
        lastUnsortedIndex = z + 1;
      }
      arr[z].state = ElementStates.Default;
      arr[z + 1].state = ElementStates.Default;
    }
    for (let j = lastUnsortedIndex; j < arr.length; j++) {
      arr[j].state = ElementStates.Modified;
    }
    await delaySort(arr, setArr, wait);
    if (!swapped) {
      return;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  if (arr.length) arr[0].state = ElementStates.Modified;
  await delaySort(arr, setArr, wait);
};

//--сортировка выбором--//
export const selectionSort = async (
  isAscending: boolean,
  arr: TNewArr[],
  setArr: Dispatch<SetStateAction<TNewArr[]>>,
  wait: number
) => {
  for (let i = 0; i < arr.length; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;
    for (let z = i + 1; z < arr.length; z++) {
      arr[z].state = ElementStates.Changing;
      await delaySort(arr, setArr, wait);
      if (
        isAscending
          ? arr[maxInd].item > arr[z].item
          : arr[maxInd].item < arr[z].item
      )
        maxInd = z;
      arr[z].state = ElementStates.Default;
      await delaySort(arr, setArr, wait);
    }
    swap(arr, i, maxInd);
    arr[maxInd].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    await delaySort(arr, setArr, wait);
  }
};
