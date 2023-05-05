import { bubbleSort, selectionSort } from "./arraySorting";
import { TNewArr } from "../components/sorting-page/type/sorting-page";
import { delay } from "./utils";
import { act } from "react-dom/test-utils";
import { ElementStates } from "../types/element-states";

jest.mock("./utils", () => ({
  ...jest.requireActual("./utils"),
  delay: jest.fn(),
}));

const createTestArray = (array: number[]): TNewArr[] => {
  return array.map((item) => ({
    item,
    state: ElementStates.Default,
  }));
};

const setArrayMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("bubbleSort", () => {
  it("correctly sorts an array in ascending order", async () => {
    const array = createTestArray([5, 3, 1, 4, 2]);
    await act(async () => {
      await bubbleSort(true, array, setArrayMock, 0);
    });
    expect(array.map((item) => item.item)).toEqual([1, 2, 3, 4, 5]);
  });

  it("correctly sorts an array in descending order", async () => {
    const array = createTestArray([2, 4, 1, 5, 3]);
    await act(async () => {
      await bubbleSort(false, array, setArrayMock, 0);
    });
    expect(array.map((item) => item.item)).toEqual([5, 4, 3, 2, 1]);
  });
});

describe("selectionSort", () => {
  it("correctly sorts an array in ascending order", async () => {
    const array = createTestArray([5, 3, 1, 4, 2]);
    await act(async () => {
      await selectionSort(true, array, setArrayMock, 0);
    });
    expect(array.map((item) => item.item)).toEqual([1, 2, 3, 4, 5]);
  });

  it("correctly sorts an array in descending order", async () => {
    const array = createTestArray([2, 4, 1, 5, 3]);
    await act(async () => {
      await selectionSort(false, array, setArrayMock, 0);
    });
    expect(array.map((item) => item.item)).toEqual([5, 4, 3, 2, 1]);
  });
});
