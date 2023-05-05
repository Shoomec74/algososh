import { reverseString } from "./utils";

describe("StringComponent", () => {
  it("correctly reverses a string with an even number of characters", async () => {
    const inputValue = "abcdef";
    const expectedOutputValue = "fedcba";
    let outputValue = "";

    await reverseString(
      inputValue,
      () => {},
      (value) => {
        outputValue = value;
      },
      () => {},
      () => {}
    );

    expect(outputValue).toBe(expectedOutputValue);
  });

  it("correctly reverses a string with an odd number of characters", async () => {
    const inputValue = "abcde";
    const expectedOutputValue = "edcba";
    let outputValue = "";

    await reverseString(
      inputValue,
      () => {},
      (value) => {
        outputValue = value;
      },
      () => {},
      () => {}
    );

    expect(outputValue).toBe(expectedOutputValue);
  });

  it("correctly reverses a string with one character", async () => {
    const inputValue = "a";
    const expectedOutputValue = "a";
    let outputValue = "";

    await reverseString(
      inputValue,
      () => {},
      (value) => {
        outputValue = value;
      },
      () => {},
      () => {}
    );

    expect(outputValue).toBe(expectedOutputValue);
  });

  it("correctly reverses an empty string", async () => {
    const inputValue = "";
    const expectedOutputValue = "";
    let outputValue = "";

    await reverseString(
      inputValue,
      () => {},
      (value) => {
        outputValue = value;
      },
      () => {},
      () => {}
    );

    expect(outputValue).toBe(expectedOutputValue);
  });
});
