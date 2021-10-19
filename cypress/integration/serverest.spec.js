/// <reference types="cypress" />
//TAREFA: UM CENARIO POSITIVO E UM NEGATIVO PARA OS VERBOS E ROTAS:
//POST: /login => O CASO NEGATIVO
//POST: /usuarios
//POST: /produtos

var bearer

describe("Testes na API ServeRest", () => {
    it("Deve trazer um usuário administrador para login", () => {
        cy.buscarUsuarioAdmin().then( usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin")
            //{email: "fulano@qa.com", password: "teste"}
        })
        cy.get("@usuarioParaLogin").then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
        
    })
    it("Deve cadastrar um novo carrinho", () => {
        cy.cadastroCarrinho(bearer)
    })
})





