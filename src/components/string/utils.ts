import { DELAY_IN_MS } from "../../constants/delays";

export const reverseString = async (
  inputValue: string,
  onInputValueChange: (value: string) => void,
  onOutputValueChange: (value: string) => void,
  onStepChange: (value: number) => void,
  onIsRunChange: (value: boolean) => void
  ): Promise<void> => {
  // Здесь будет ваша логика разворота строки (handleReverseClick) с использованием коллбеков onOutputValueChange, onStepChange и onIsRunChange
  //--Не запускать лоадер если пустая строка и стираем предыдущий разворот строки--//
  if (inputValue === "") {
    onInputValueChange("");
    return;
  }
  //--Включаем лоадер--//
  onIsRunChange(true);
  //--Обнуление числа шагов--//
  onStepChange(0);
  //--Разбиваем строку на символы--//
  let strCharArr = inputValue.split("");
  //--Устанавливаем начало для перебора массива--//
  let startIndex = 0;
  //--Устанавливаем конец для перебора массива--//
  let endIndex = strCharArr.length - 1;
  //--Показываем на экране введенную строку до и после изменений--//
  onOutputValueChange(inputValue);
  //--Ждем время в мсек чтобы начать алгоритм сортировки--//
  await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

  let step = 1;
  //--Пока стартовый индекс меньше конечного индекса разворачиваем строку--//
  while (startIndex <= endIndex) {
    //--Для нечетного количества символов к перекрестному символу алгоритм перстановки не применяется--//
    if (startIndex === endIndex) {
      onStepChange(step++);
      break;
    }
    //--Дожидаемся алгоритма перестановки--//
    await swap(strCharArr, startIndex, endIndex, onOutputValueChange);

    //--Добавляем шаг для изменения цвета бордера переставляемых и перестановленных символов--//
    onStepChange(step++);
    //--Сдвигаемся к середине--//
    startIndex++;
    endIndex--;
  }
  //--Убираем за собой мусор--//
  onInputValueChange("");
  //--Убираем лоадер с кнопки--//
  onIsRunChange(false);
  };

//--Логика перстановки элементов для ожидания используются Promise--//
function swap(
  strCharArr: string[],
  startIndex: number,
  endIndex: number,
  onOutputValueChange: (value: string) => void,
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
      onOutputValueChange(strCharArr.join(""));
      resolve();
    }, DELAY_IN_MS);
  });
}
