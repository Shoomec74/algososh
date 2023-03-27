import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringComponentStyle from "./string.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const { container } = stringComponentStyle;

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [step, setStep] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleReverseClick = async () => {
    setStep(0);
    let strArr = inputValue.split("");
    let start = 0;
    let end = strArr.length - 1;

    setOutputValue(inputValue);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    while (start < end) {
      if(start + 1 === end - 1){
        setStep(step => step + 1);
      }
      console.log(`Старт - ${start}, конец - ${end}`)
      await swap(strArr, start, end);
      setOutputValue(strArr.join(""));
      start++;
      end--;
      setStep(step => step + 1);
    }
  };

  function swap(arr: string[], i: number, j: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setOutputValue(arr.join(""));
        resolve();
      }, 1000);
    });
  }

  const stateCircle = (
    index: number,
    step: number,
    arr: Array<string | number>
  ) => {
    if (step < index || step > arr.length - 1 - index) {
      return ElementStates.Modified;
    }
    if (index === step || step === arr.length - 1 - index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Строка">
      <Input
        placeholder="Введите текст"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={11}
      ></Input>
      <Button text="Развернуть" onClick={handleReverseClick}></Button>
      <span>Максимум 11 символов</span>
      <div className={container}>
        {outputValue.split("").map((letter, index) => (
          <Circle
            key={index}
            letter={letter}
            state={stateCircle(step, index, outputValue.split(""))}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
