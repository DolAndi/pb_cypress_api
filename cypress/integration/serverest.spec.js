/// <reference types="cypress" />

describe("Teste na api rest", () => {
  it("Deve trazer um usuário adm para login", () => {
    cy.buscarUserAdm().then(usuario => {
      cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin")
    })
    cy.get("usuarioParaLogin").then("user", () => {
      cy.logar(user).then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property("authorization")
      })
    })
  });
});
