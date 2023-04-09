import React, { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { queue } from "./type/queue";
import { delay } from "../../utils/utils";
import queuePageStyles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";

type TInProgress = {
  push: boolean;
  pop: boolean;
};

export const QueuePage: React.FC = () => {
  const { form, content } = queuePageStyles;
  const [inputValue, setInputValue] = useState<string>("");
  const [arr, setArr] = useState(queue.getQueue());
  const [head, setHead] = useState(queue.getHead());
  const [tail, setTail] = useState(queue.getTail());
  const [curr, setCurr] = useState(-1);
  const [inProgress, setInProgress] = useState<TInProgress>({
    push: false,
    pop: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueue = async (value: string) => {
    setInProgress((prev) => {
      return {
        ...prev,
        push: true,
      };
    });
    queue.enqueue(value);
    setInputValue("");
    setArr([...queue.getQueue()]);
    setTail(queue.getTail());
    setCurr(tail % queue.getSize());
    await delay(500);
    setCurr(-1);
    setInProgress((prev) => {
      return {
        ...prev,
        push: false,
      };
    });
  };

  const dequeue = async () => {
    setInProgress((prev) => {
      return {
        ...prev,
        pop: true,
      };
    });
    if (queue.getLength() > 0) {
      queue.dequeue();
      setArr([...queue.getQueue()]);
      setCurr(queue.getHead() % queue.getSize());
      await delay(500);
      setHead(queue.getHead());
      setCurr(-1);
    }
    setInProgress((prev) => {
      return {
        ...prev,
        pop: false,
      };
    });
  };

  const clear = () => {
    setInProgress((prev) => {
      return {
        ...prev,
        clearInt: true,
      };
    });
    queue.clear();
    setArr([...queue.getQueue()]);
    setHead(queue.getHead());
    setTail(queue.getTail());
    setInProgress((prev) => {
      return {
        ...prev,
        clearInt: false,
      };
    });
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={form} onSubmit={(evt) => evt.preventDefault()}>
        <Input
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          disabled={!inputValue || tail === 7}
          onClick={() => enqueue(inputValue)}
          isLoader={inProgress.push}
        />
        <Button
          text="Удалить"
          disabled={(!inputValue && !queue.getLength()) || head === 7}
          onClick={() => dequeue()}
          isLoader={inProgress.pop}
        />
        <Button
          extraClass="ml-40"
          text="Очистить"
          onClick={() => clear()}
          disabled={head === 0 && tail === 0}
        />
      </form>
      <div className={content}>
        {arr.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item}
              state={
                index === curr ? ElementStates.Changing : ElementStates.Default
              }
              head={index === head && queue.isEmpty() === false ? "head" : ""}
              tail={
                index === tail - 1 && queue.isEmpty() === false ? "tail" : ""
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
