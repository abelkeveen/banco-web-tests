describe("Login", () => {
  beforeEach(() => {
    // Arrange
    cy.visit("http:///localhost:4000");
  });

  it("Login com dados válidos deve permitir entrada no sistema", () => {
    // Act
    cy.get("#username").click().type("julio.lima");
    cy.get("#senha").click().type("123456");
    cy.contains("button", "Entrar").click(); //cy.get("#login-section > .btn").click();

    // Asert
    cy.contains("h4", "Realizar Transferência").should("be.visible"); // procure um h4 com o nome Realizar Transferência quando encontrar ele deve está visivel.
  });

  it("Login com dados inválidos deve apresentar mensagem de erro", () => {
    // Act
    cy.get("#username").click().type("julio.lima");
    cy.get("#senha").click().type("111222");
    cy.contains("button", "Entrar").click();

    // Asert
    cy.get(".toast").should("have.text", "Erro no login. Tente novamente.");
  });
});
