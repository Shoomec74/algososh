describe("Проверка роутинга и доступности страниц с визуализацией алгоритмов", () => {
  const algorithmRoutes = [
    { path: "/recursion", uniqueElement: ".recursion" },
    { path: "/fibonacci", uniqueElement: ".fibonacci" },
    { path: "/sorting", uniqueElement: ".sorting" },
    { path: "/stack", uniqueElement: ".stack" },
    { path: "/queue", uniqueElement: ".queue" },
    { path: "/list", uniqueElement: ".list" },
  ];

  algorithmRoutes.forEach(({ path, uniqueElement }) => {
    it(`Страница с адресом '${path}' доступна и содержит уникальный элемент '${uniqueElement}'`, () => {
      cy.visit(`http://localhost:3000${path}`);
      cy.get(uniqueElement).should("be.visible");
    });
  });
});
