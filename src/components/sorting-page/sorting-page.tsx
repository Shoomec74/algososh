import { FC, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { createRandomIntArray } from "../../utils/utils";
import sortingPageStyles from "./sorting-page.module.css";
import { TNewArr, TInProgress } from "./type/sorting-page";
import { bubbleSort, selectionSort } from "../../utils/arraySorting";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: FC = () => {
  const { form, content, button, radioButtonBox, sortingBox } =
    sortingPageStyles;
  const [newArr, setNewArr] = useState<TNewArr[]>([]);
  const [inProgress, setInProgress] = useState<TInProgress>({
    ascending: false,
    descending: false,
  });
  const [checked, setChecked] = useState<string>("selection");

  const handleNewArr = () => {
    setNewArr(createRandomIntArray(3, 17, 0, 100));
  };

  const handleAscending = async () => {
    setInProgress({ ascending: true, descending: false });
    if (checked === "selection")
      await selectionSort(true, newArr, setNewArr, 250);
    if (checked === "bubble") await bubbleSort(true, newArr, setNewArr, 250);
    setInProgress({ ascending: false, descending: false });
  };

  const handleDescending = async () => {
    setInProgress({ ascending: false, descending: true });
    if (checked === "selection")
      await selectionSort(false, newArr, setNewArr, 250);
    if (checked === "bubble") await bubbleSort(false, newArr, setNewArr, 250);
    setInProgress({ ascending: false, descending: false });
  };

  useEffect(() => {
    setNewArr(createRandomIntArray(3, 17, 0, 100));
  }, []);

  return (
    <SolutionLayout title="Сортировка массива" extraClass="sorting">
      <form className={form} onSubmit={(evt) => evt.preventDefault()}>
        <div className={radioButtonBox}>
          <RadioInput
            label="Выбор"
            value="selection"
            name="sorting"
            checked={checked === "selection"}
            onChange={() => setChecked("selection")}
            disabled={inProgress.ascending || inProgress.descending}
          />
          <RadioInput
            label="Пузырек"
            value="bubble"
            name="sorting"
            checked={checked === "bubble"}
            onChange={() => setChecked("bubble")}
            disabled={inProgress.ascending || inProgress.descending}
          />
        </div>
        <div className={sortingBox}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={button}
            disabled={inProgress.ascending || inProgress.descending}
            isLoader={inProgress.ascending}
            onClick={() => handleAscending()}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass={button}
            disabled={inProgress.ascending || inProgress.descending}
            isLoader={inProgress.descending}
            onClick={() => handleDescending()}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            extraClass={button}
            onClick={handleNewArr}
            disabled={inProgress.ascending || inProgress.descending}
          />
        </div>
      </form>
      <div className={content}>
        {newArr.map((item, index) => {
          return <Column index={item.item} key={index} state={item.state} />;
        })}
      </div>
    </SolutionLayout>
  );
};
