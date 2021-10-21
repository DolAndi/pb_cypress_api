/// <reference types="cypress" />

var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.buscarUsuarioAdmin().then( res => {
            cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
    })
    it('Deve cadastrar um novo carrinho com sucesso', () => {
        cy.criarCarrinho(bearer)
    })
})
