import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacciPageStyle from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { container, form, input, button } = fibonacciPageStyle;
  const [inputValue, setInputValue] = useState<number>(0);
  const [isRun, setIsRun] = useState<boolean>(false);
  const [outputValue, setOutputValue] = useState<number[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setInputValue(0);
    }
    const value: number = parseInt(event.target.value);
    if(1 <= value && value <= 19){
      setInputValue(value)
    }
  };

  function fibonacci(n:number) {
    const arr = [1, 1];
    if (n > 1) {
      for (let i = 0; i < n - 2; i++) {
        arr.push(arr[i] + arr[i + 1]);
      }
    }
    return arr[n-1];
  }

  const fibIterative = (value: number): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      let resArr: number[] = [];
      let i = 0;
      const interval = setInterval(() => {
        if(i <= value){
          const res = fibonacci(i + 1);
          resArr.push( res)
          setOutputValue(resArr);
          i++;
        }

        if (i > value) {
          clearInterval(interval);
          resolve(resArr);
          setInputValue(0);
        }

      }, 500);
    });
  };

  const handleReverseClick = async () => {
    setOutputValue([]);
    setIsRun(true);
    await fibIterative(inputValue);
    setIsRun(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOutputValue(outputValue => [...outputValue])
    }, 500);
    return () => clearInterval(interval)
  }, [outputValue])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={form}>
        <Input
          placeholder="Введите число"
          value={inputValue >= 1 ? inputValue : ""}
          onChange={handleInputChange}
          max={19}
          type={"number"}
          extraClass={`${input}`}
          isLimitText={true}
          disabled={isRun}
          onKeyDown={(evt) => ["e", "E", "+", "-", ","].includes(evt.key) && evt.preventDefault()}
        ></Input>
        <Button
          text="Рассчитать"
          onClick={handleReverseClick}
          isLoader={isRun}
          extraClass={`${button} ml-6`}
        ></Button>
      </form>
      <div className={container}>
        {outputValue.length > 0 &&
          outputValue.map((letter, index) => (
            <Circle key={index} letter={letter.toString()} index={index}></Circle>
          ))}
      </div>
    </SolutionLayout>
  );
};
