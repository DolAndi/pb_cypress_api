/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
///        cy.buscarUsuarioAdmin().then( res => {
///             cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
///         })
///        cy.get('@usuarioParaLogin').then( user => {
///            cy.logar(user).then( res => {
///                 expect(res.status).to.equal(200)
///                 expect(res.body).to.have.property('authorization')
///                 bearer = res.body.authorization
///             })
///         })

        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })

        })

    })

///    it('Deve cadastrar um novo carrinho com sucesso', () => {
///       cy.criarCarrinho(bearer)
/// })

    it('Deve dar erro ao logar com email vazio', () => {

            cy.fixture('loginCredentials').then((user) => {
                cy.logar(user).then( res => {
                    expect(res.status).to.equal(400)
                    expect(res.body).to.have.property('email')
                    bearer = res.body.authorization
                })
    
            })
    
        })

    it('Deve cadastrar um produto válido com sucesso', () => {

        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.equal(201)
            expect(res.body).to.have.all.keys('message', '_id')
        })
    })
})
