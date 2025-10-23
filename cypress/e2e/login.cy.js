describe("Login", () => {
  beforeEach(() => {
    // Arrange
    cy.visit("/");
    cy.screenshot("apos-visitar-pagina");
  });

  it("Login com dados válidos deve permitir entrada no sistema", () => {
    // Act
    cy.fazerLoginComCredenciaisValidas();

    // Asert
    cy.contains("h4", "Realizar Transferência").should("be.visible"); // procure um h4 com o nome Realizar Transferência quando encontrar ele deve está visivel.
  });

  it("Login com dados inválidos deve apresentar mensagem de erro", () => {
    // Act
    cy.fazerLoginComCredenciaisInvalidas();

    // Asert
    cy.verificarMensagemNoToast("Erro no login. Tente novamente.");
  });
});
