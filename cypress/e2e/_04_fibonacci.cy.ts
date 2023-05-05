import {
  dataCyForm,
  dataCyInput,
  dataCySubmit,
  mainCircle,
} from "../constants/constants";

describe("Correct operation of Fibonacci", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  const assertEmptyInputAndButtonDisabled = () => {
    cy.get(dataCyForm).within(() => {
      cy.get(dataCyInput).should("have.value", "");
      cy.get(dataCySubmit).should("be.disabled");
    });
  };

  it("If the input is empty, then the add button is unavailable", function () {
    assertEmptyInputAndButtonDisabled();
  });

  it("The numbers are generated correctly", function () {
    cy.clock();
    cy.get(dataCyForm).within(() => {
      cy.get(dataCyInput).type("5");
      cy.contains("Рассчитать").click();
      cy.get(dataCySubmit).should("be.disabled");
    });

    const expectedNumbers = ["1", "11", "112", "1123", "11235", "112358"];

    expectedNumbers.forEach((number, index) => {
      cy.tick(500);

      cy.get(mainCircle)
        .children()
        .should("have.length", index + 1)
        .should("have.text", number);
    });

    assertEmptyInputAndButtonDisabled();
  });
});
