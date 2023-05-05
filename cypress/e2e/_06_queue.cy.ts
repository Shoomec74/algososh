import { dataCyInput, dataCySubmit, mainCircle } from "../constants/constants";

describe("Correct operation of Stack", () => {
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

  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("If input empty button disabled", () => {
    cy.get(dataCyInput).should("have.value", "");
    cy.get(dataCySubmit).should("be.disabled");
  });

  it("The items are generated correctly", () => {
    addElem("a");

    cy.get(mainCircle).contains("a").parent().as("circle");
    cy.get("@circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
    cy.get("@circle").siblings("div").contains("head");
    cy.get("@circle").siblings("div").contains("tail");

    cy.wait(500);

    addElem("b");
    cy.get(mainCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(item[0]).should("have.text", "a");
      cy.get(item[0]).siblings("div").contains("head");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(item[1]).should("have.text", "b");
      cy.get(item[1]).siblings("div").contains("tail");
    });
  });

  it("Correct removal from the stack", () => {
    addElem("a");
    addElem("b");

    cy.contains("Удалить").click();

    cy.wait(500);

    cy.get(mainCircle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(item[1]).should("have.text", "b");
      cy.get(item[1]).siblings("div").contains("head");
      cy.get(item[1]).siblings("div").contains("tail");
    });
  });

  it("Correct stack clearing", () => {
    addElem("a");
    addElem("b");

    cy.contains("Очистить").click();

    cy.wait(500);

    cy.get(mainCircle).contains("a").should("not.exist");
    cy.get(mainCircle).contains("b").should("not.exist");
  });
});
