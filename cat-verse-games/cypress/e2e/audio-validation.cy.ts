describe("Validação de Áudio (Sem Tag HTML)", () => {
  let playStub: Cypress.Agent<sinon.SinonStub>;
  let pauseStub: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    playStub = cy.stub().resolves().as("audioPlay");
    pauseStub = cy.stub().as("audioPause");

    cy.visit("http://localhost:5173", {
      onBeforeLoad(win) {
        win.Audio = function () {
          return {
            play: playStub,
            pause: pauseStub,
            addEventListener: cy.stub(),
            removeEventListener: cy.stub(),
            load: cy.stub(),
            volume: 1,
            muted: false,
            paused: true,
          };
        } as any;
      },
    });
  });

  it("deve disparar as funções de áudio ao clicar no botão", () => {
    cy.get('button[title*="Música"]').click({ force: true });

    cy.get("@audioPlay").should("have.been.called");

    cy.get('button[title*="Música"]').click({ force: true });

    cy.get("@audioPause").should("have.been.called");
  });
});
