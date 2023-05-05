import {
  dataCyAddByIndex,
  dataCyAddHead,
  dataCyAddTail,
  dataCyInput,
  mainCircle,
  smallCircle,
} from "../constants/constants";

describe("Correct operation of Stack", () => {
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("If input empty button disabled", () => {
    cy.get(dataCyInput).should("have.value", "");
    cy.get(dataCyAddHead).should("be.disabled");
    cy.get(dataCyAddTail).should("be.disabled");
    cy.get(dataCyAddByIndex).should("be.disabled");
  });

  it("The default items are generated correctly", () => {
    cy.get(mainCircle)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  });

  it("Add element in head", () => {
    cy.get(dataCyInput).first().type("head");
    cy.contains("Добавить в head").click();
    cy.get(smallCircle)
      .contains("head")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("head")
      .parent("div")
      .siblings("p")
      .contains("0");
    cy.get(mainCircle)
      .contains("head")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_modified"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("head")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
    cy.get(mainCircle).should("have.length", 5);
  });

  it("Add element in tail", () => {
    cy.get(dataCyInput).first().type("tail");
    cy.contains("Добавить в tail").click();
    cy.get(smallCircle)
      .contains("tail")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("tail")
      .parent("div")
      .siblings("p")
      .contains("4");
    cy.get(mainCircle)
      .contains("tail")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_modified"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("tail")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
    cy.get(mainCircle).should("have.length", 5);
  });

  it("Add element to index", () => {
    cy.get("input").first().type("ind");
    cy.get("input").last().type("1");
    cy.contains("Добавить по индексу").click();
    cy.get(smallCircle)
      .contains("ind")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.get(mainCircle)
      .first()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .eq(1)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("ind")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .contains("ind")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_modified"));
    cy.get(mainCircle).should("have.length", 5);
  });

  it("Remove element in head", () => {
    cy.contains("Удалить из head").click();
    cy.get(smallCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.get(smallCircle)
      .get("[class*=text_type_circle]")
      .invoke("text")
      .then((item) => {
        cy.get(mainCircle).first().should("not.have.text", item);
      });

    cy.wait(500);

    cy.get(mainCircle).first().siblings("p").contains("0");
    cy.get(mainCircle).should("have.length", 3);
  });

  it("Remove element in tail", () => {
    cy.contains("Удалить из tail").click();
    cy.get(smallCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.get(smallCircle)
      .get("[class*=text_type_circle]")
      .invoke("text")
      .then((item) => {
        cy.get(mainCircle).last().should("not.have.text", item);
      });

    cy.wait(500);

    cy.get(mainCircle).last().siblings("p").contains("2");
    cy.get(mainCircle).should("have.length", 3);
  });

  it("Correct deletion by index", () => {
    cy.get("input").last().type("1");
    cy.contains("Удалить по индексу").click();
    cy.get(mainCircle)
      .first()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle)
      .eq(1)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.wait(500);

    cy.get(smallCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.get(smallCircle)
      .get("[class*=text_type_circle]")
      .invoke("text")
      .then((item) => {
        cy.get(mainCircle).last().should("not.have.text", item);
      });
    cy.get(mainCircle)
      .eq(2)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(500);

    cy.get(mainCircle).should("have.length", 3);
  });
});
