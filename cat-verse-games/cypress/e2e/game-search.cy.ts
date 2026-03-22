describe("Busca de Jogos", () => {
  it("deve encontrar o Fall Guys ao filtrar por Space e 32GB RAM", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Começar Agora").click();

    cy.contains("32GB").click();

    cy.contains("Explorar jogos").click();

    cy.get("h2").should("contain", "Jogos Encontrados ");
    cy.contains("Fall Guys").should("be.visible");
  });
});
