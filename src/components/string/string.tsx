import React, { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringComponentStyle from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

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
    //--Не запускать лоадер если пустая строка и стираем предыдущий разворот строки--//
    if (inputValue === "") {
      setOutputValue("");
      return;
    }
    //--Включаем лоадер--//
    setIsRun(true);
    //--Обнуление числа шагов--//
    setStep(0);
    //--Разбиваем строку на символы--//
    let strCharArr = inputValue.split("");
    //--Устанавливаем начало для перебора массива--//
    let startIndex = 0;
    //--Устанавливаем конец для перебора массива--//
    let endIndex = strCharArr.length - 1;
    //--Показываем на экране введенную строку до и после изменений--//
    setOutputValue(inputValue);
    //--Ждем время в мсек чтобы начать алгоритм сортировки--//
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    //--Пока стартовый индекс меньше конечного индекса разворачиваем строку--//
    while (startIndex <= endIndex) {
      //--Для нечетного количества символов к перекрестному символу алгоритм перстановки не применяется--//
      if (startIndex === endIndex) {
        setStep((step) => step + 1);
        break;
      }
      //--Дожидаемся алгоритма перестановки--//
      await swap(strCharArr, startIndex, endIndex);
      //--Добавляем шаг для изменения цвета бордера переставляемых и перестановленных символов--//
      setStep((step) => step + 1);
      //--Сдвигаемся к середине--//
      startIndex++;
      endIndex--;
    }
    //--Убираем за собой мусор--//
    setInputValue("");
    //--Убираем лоадер с кнопки--//
    setIsRun(false);
  };

  //--Логика перстановки элементов для ожидания используются Promise--//
  function swap(
    strCharArr: string[],
    startIndex: number,
    endIndex: number
  ): Promise<void> {
    return new Promise((resolve) => {
      //--Перед началом сортировки ждем время в мсек--//
      setTimeout(() => {
        //--Складываем в буфер символ, который слева--//
        const temp = strCharArr[startIndex];
        //--Вместо элемента слева подставляем элемент справа--//
        strCharArr[startIndex] = strCharArr[endIndex];
        //--Вместо элемента справа подставляем левый элемент из буфера--//
        strCharArr[endIndex] = temp;
        //--Показываем строку после изменений--//
        setOutputValue(strCharArr.join(""));
        resolve();
      }, DELAY_IN_MS);
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
      <form className={form} onSubmit={(evt) => evt.preventDefault()}>
        <Input
          placeholder="Введите текст"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={11}
          extraClass={`${input}`}
          isLimitText={true}
          disabled={isRun}
        ></Input>
        <Button
          text="Развернуть"
          onClick={handleReverseClick}
          isLoader={isRun}
          extraClass={`${button} ml-6`}
        ></Button>
      </form>
      <div className={container}>
        {outputValue.split("").map((letter, index) => (
          <Circle
            key={index}
            letter={letter}
            state={stateCircle(step, index, outputValue.split(""))}
            extraClass="mr-4"
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
