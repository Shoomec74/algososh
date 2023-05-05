import { dataCyInput, dataCySubmit, mainCircle } from "../constants/constants";

const addElem = (item) => {
  cy.get("input").type(item);
  cy.contains("Добавить").click();
  cy.get(mainCircle)
    .contains(item)
    .parent()
    .invoke("attr", "class")
    .then((classList) => expect(classList).contains("circle_changing"));
  cy.wait(500);
};

describe("Correct operation of Stack", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("If input empty button disabled", () => {
    cy.get(dataCyInput).should("have.value", "");
    cy.get(dataCySubmit).should("be.disabled");
  });

  it("The items are generated correctly", () => {
    addElem("a");
    cy.get(mainCircle)
      .contains("a")
      .parent()
      .as("circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
    cy.get("@circle").siblings("div").contains("top");

    cy.wait(500);

    addElem("b");
    cy.get(mainCircle).then((item) => {
      cy.wrap(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.wrap(item[0]).should("have.text", "a");
      cy.wrap(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.wrap(item[1]).should("have.text", "b").siblings("div").contains("top");
    });
  });

  it("Correct removal from the stack", () => {
    addElem("a");
    addElem("b");
    cy.contains("Удалить").click();
    cy.wait(500);

    cy.get(mainCircle).then((item) => {
      cy.wrap(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.wrap(item[0]).should("have.text", "a").siblings("div").contains("top");
    });
  });

  it("Correct stack clearing", () => {
    addElem("a");
    addElem("b");
    cy.contains("Очистить").click();
    cy.wait(500);

    cy.get(mainCircle).should("not.exist");
  });
});
