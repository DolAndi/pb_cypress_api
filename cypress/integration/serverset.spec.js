/// <reference types="cypress" />

var bearer

describe("Testes na API ServeRest", () => {
    it("Deve informar erro ao tentar trazer um usuário inesistente", () => {
        cy.RealizarLogin_INVALIDO().then( () => {
            //TD
        }).then( res => {
            expect(res.statusCode).to.equal(400);
        })
    })
    
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

    it("Deve cadastrar um novo item com falha de token", () => {
        cy.criarProduto(bearer).then( res => {
        expect(res.statusCode).to.equal(401)
        })
    })

    it("Deve ")
})
