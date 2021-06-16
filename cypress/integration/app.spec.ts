describe("App", () => {
  beforeEach(() => {
    cy.visitWithAccount("/");
  });

  it("Loads account and contract name", () => {
    cy.contains("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", { matchCase: false });
    cy.contains("USD Coin", { matchCase: false });
  })
});
