describe("Alternância de Tema (Light/Dark Mode)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get("html").should("not.have.class", "dark");
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("deve alternar para o modo dark ao clicar no botão de lua e voltar para light ao clicar no sol", () => {
    cy.get('button[title="Dark"]').click();
    cy.get("html").should("have.class", "dark");
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.window().its("localStorage.theme").should("eq", "dark");

    cy.get('button[title="Light"]').click();

    cy.get("html").should("not.have.class", "dark");
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.window().its("localStorage.theme").should("eq", "light");
  });

  it("deve validar se o modo Dark está ativo após clicar no botão de Lua", () => {
    cy.get('button[title="Dark"]').click();

    cy.get("html").should("have.class", "dark");

    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.window().its("localStorage.theme").should("eq", "dark");
  });
});
