/// <reference types="cypress" />

var bearer

describe("Testes na API ServeRest", () => {
    it("Deve trazer um usuário adm para login", () => {
        cy.BuscarUSER_ADM().then( usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin");
        })
        cy.get("@usuarioParaLogin").then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
    })

    it("Deve cadastrar um novo carrinho con sucesso", () => {
        cy.criarCarrinho(bearer)
    })
})
