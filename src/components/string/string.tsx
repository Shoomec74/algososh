import React, { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringComponentStyle from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {
  const { container, form, input, button } = stringComponentStyle;
  //--Строка на вход--//
  const [inputValue, setInputValue] = useState<string>("");
  //--Строка на выход--//
  const [outputValue, setOutputValue] = useState<string>("");
  //--Число шагов для опредения выделения компонента всего 3, есть css переменные--//
  const [step, setStep] = useState<number>(0);
  //--Флаг что пошла анимация для отображения лоадера на кнопке и деактивация инпута--//
  const [isRun, setIsRun] = useState<boolean>(false);

  //--Обработчик инпута--//
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  //--Логика клика по кнопке--//
  const handleReverseClick = async () => {
    reverseString(inputValue, setInputValue, setOutputValue, setStep, setIsRun)
  };

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
    <SolutionLayout title="Строка" extraClass="recursion">
      <form className={form} onSubmit={(evt) => evt.preventDefault()} data-cy='form'>
        <Input
          placeholder="Введите текст"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={11}
          extraClass={`${input}`}
          isLimitText={true}
          disabled={isRun}
          data-cy='input'
        ></Input>
        <Button
          text="Развернуть"
          onClick={handleReverseClick}
          isLoader={isRun}
          disabled={inputValue === ""}
          extraClass={`${button} ml-6`}
          data-cy='submit'
        ></Button>
      </form>
      <div className={container}>
        {outputValue.split("").map((letter, index) => (
          <Circle
            key={index}
            letter={letter}
            state={stateCircle(step, index, outputValue.split(""))}
            extraClass= {`mr-4 circle-${index}`}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
