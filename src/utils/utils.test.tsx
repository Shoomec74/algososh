import { ElementStates } from "../types/element-states";
import { TNewArr } from "../components/sorting-page/type/sorting-page";
import { createRandomIntArray, delay, swap } from "./utils";

describe("swap", () => {
  it("swaps two elements in an array", () => {
    const array = [1, 2, 3, 4, 5];
    swap(array, 1, 3);
    expect(array).toEqual([1, 4, 3, 2, 5]);
  });
});

describe("delay", () => {
  it("waits for the specified amount of time", async () => {
    const startTime = Date.now();
    await delay(200);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(200);
  });
});

describe("createRandomIntArray", () => {
  it("creates an array of the correct length", () => {
    const minLength = 5;
    const maxLength = 10;
    const array = createRandomIntArray(minLength, maxLength, 0, 100);
    expect(array.length).toBeGreaterThanOrEqual(minLength);
    expect(array.length).toBeLessThanOrEqual(maxLength);
  });

  it("creates an array with elements within the specified range", () => {
    const minValue = 10;
    const maxValue = 20;
    const array = createRandomIntArray(5, 10, minValue, maxValue);
    array.forEach((item: TNewArr) => {
      expect(item.item).toBeGreaterThanOrEqual(minValue);
      expect(item.item).toBeLessThanOrEqual(maxValue);
    });
  });

  it("creates an array with elements of the correct type and default state", () => {
    const array = createRandomIntArray(5, 10, 0, 100);
    array.forEach((item: TNewArr) => {
      expect(typeof item.item).toBe("number");
      expect(item.state).toBe(ElementStates.Default);
    });
  });
});
