import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingPageStyles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const {} = sortingPageStyles;

  //--Функция для создания рандомного массива целых чисел--//
  function createRandomIntArray(
    minLength: number,
    maxLength: number,
    minValue: number,
    maxValue: number
  ): Array<number> {
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const randomEl =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      randomArray.push(randomEl);
    }
    return randomArray;
  }

  useEffect(()=> {
    console.log(createRandomIntArray(3, 17, 10, 100));
  },[])

  return (
  <SolutionLayout title="Сортировка массива">

  </SolutionLayout>
  );
};
