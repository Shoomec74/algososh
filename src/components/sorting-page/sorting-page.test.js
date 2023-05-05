import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "../../utils/arraySorting";

let testArr = [{}];
let sortingAsc = [{}];
let sortingDsc = [{}];

const wait_zero = 0;
describe("Testing the selection sorting algorithm", () => {
  beforeEach(() => {
    testArr = [
      { item: "9", state: ElementStates.Default },
      { item: "2", state: ElementStates.Default },
      { item: "6", state: ElementStates.Default },
      { item: "8", state: ElementStates.Default },
      { item: "5", state: ElementStates.Default },
    ];

    sortingAsc = [
      { item: "2", state: ElementStates.Modified },
      { item: "5", state: ElementStates.Modified },
      { item: "6", state: ElementStates.Modified },
      { item: "8", state: ElementStates.Modified },
      { item: "9", state: ElementStates.Modified },
    ];

    sortingDsc = [
      { item: "9", state: ElementStates.Modified },
      { item: "8", state: ElementStates.Modified },
      { item: "6", state: ElementStates.Modified },
      { item: "5", state: ElementStates.Modified },
      { item: "2", state: ElementStates.Modified },
    ];
  });

  it("Test of sorting an empty array in ascending order", async () => {
    const mockState = jest.fn();
    const arr = [];
    await selectionSort(true, arr, mockState, wait_zero);
    expect(mockState).toBeCalledTimes(0);
  });
  it("Test of sorting an empty array in descending order", async () => {
    const mockState = jest.fn();
    const arr = [];
    await selectionSort(false, arr, mockState, wait_zero);
    expect(mockState).toBeCalledTimes(0);
  });
  it("Test of sorting an array of one element in ascending order", async () => {
    const mockState = jest.fn();
    const arr = [{ item: "0", state: ElementStates.Default }];
    const sortedArr = [{ item: "0", state: ElementStates.Modified }];
    await selectionSort(true, arr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortedArr);
  });
  it("Test of sorting an array of one element in descending order", async () => {
    const mockState = jest.fn();
    const arr = [{ item: "0", state: ElementStates.Default }];
    const sortedArr = [{ item: "0", state: ElementStates.Modified }];
    await selectionSort(false, arr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortedArr);
  });
  it("Test of sorting an array of several elements in ascending order", async () => {
    const mockState = jest.fn();
    await selectionSort(true, testArr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortingAsc);
  });
  it("Test of sorting an array of several elements in descending order", async () => {
    const mockState = jest.fn();
    await selectionSort(false, testArr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortingDsc);
  });
});

describe("Testing the bubble sorting algorithm", () => {
  it("Test of sorting an empty array in ascending order", async () => {
    const mockState = jest.fn();
    const arr = [];
    await bubbleSort(true, arr, mockState, wait_zero);
    expect(mockState).toBeCalledTimes(1);
  });
  it("Test of sorting an empty array in descending order", async () => {
    const mockState = jest.fn();
    const arr = [];
    await bubbleSort(false, arr, mockState, wait_zero);
    expect(mockState).toBeCalledTimes(1);
  });
  it("Test of sorting an array of one element in ascending order", async () => {
    const mockState = jest.fn();
    const arr = [{ item: "0", state: ElementStates.Default }];
    const sortedArr = [{ item: "0", state: ElementStates.Modified }];
    await bubbleSort(true, arr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortedArr);
  });
  it("Test of sorting an array of one element in descending order", async () => {
    const mockState = jest.fn();
    const arr = [{ item: "0", state: ElementStates.Default }];
    const sortedArr = [{ item: "0", state: ElementStates.Modified }];
    await bubbleSort(false, arr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortedArr);
  });
  it("Test of sorting an array of several elements in ascending order", async () => {
    const mockState = jest.fn();
    await bubbleSort(true, testArr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortingAsc);
  });
  it("Test of sorting an array of several elements in descending order", async () => {
    const mockState = jest.fn();
    await bubbleSort(false, testArr, mockState, wait_zero);
    expect(mockState).toHaveBeenLastCalledWith(sortingDsc);
  });
});
