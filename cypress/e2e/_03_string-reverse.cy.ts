import {
  changingStyle,
  dataCyForm,
  dataCyInput,
  dataCySubmit,
  defaultStyle,
  mainCircle,
  modifiedStyle,
} from "../constants/constants";

describe("Корректная работа строки", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна.", function () {
    cy.get(dataCyForm).within(() => {
      cy.get(dataCyInput).should("have.value", "");
      cy.get(dataCySubmit).should("be.disabled");
    });
  });

  it("Cтрока разворачивается корректно", function () {
    cy.clock();
    cy.get(dataCyForm).within(() => {
      cy.get(dataCyInput).type("hello");
      cy.get(dataCySubmit).click();
      cy.get(dataCySubmit).should("be.disabled");
    });

    const expectedValues = [
      ["h", "e", "l", "l", "o"],
      ["o", "e", "l", "l", "h"],
      ["o", "l", "l", "e", "h"],
      ["o", "l", "l", "e", "h"],
    ];

    const expectedStyles = [
      [changingStyle, defaultStyle, defaultStyle, defaultStyle, changingStyle],
      [
        modifiedStyle,
        changingStyle,
        defaultStyle,
        changingStyle,
        modifiedStyle,
      ],
      [
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
      ],
      [
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
        modifiedStyle,
      ],
    ];

    expectedValues.forEach((values, tickIndex) => {
      cy.tick(1000);

      cy.get(mainCircle).then((elem) => {
        values.forEach((value, index) => {
          const expectedStyle = expectedStyles[tickIndex][index];
          cy.get(elem[index])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(expectedStyle));
          cy.get(elem[index]).children().should("have.text", value);
        });
      });
    });

    cy.get(mainCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(modifiedStyle));

    cy.get(dataCyForm).within(() => {
      cy.get(dataCyInput).should("have.value", "");
      cy.get(dataCySubmit).should("be.disabled");
    });
  });
});
